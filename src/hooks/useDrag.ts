import { useRef, useEffect } from 'react';
import { animate, utils } from 'animejs';
import { isColliding } from '../lib/gameUtils';

interface UseDragProps {
    onDrop: (targetElement: HTMLElement | null) => void;
    onDragMove?: (x: number, y: number, draggedElement: HTMLElement) => void;
    enabled?: boolean;
}

export function useDrag({ onDrop, onDragMove, enabled = true }: UseDragProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const initialPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const element = itemRef.current;
        if (!element || !enabled) return;

        const handlePointerDown = (e: PointerEvent) => {
            if (!enabled) return;
            isDragging.current = true;
            
            // Get initial position relative to the viewport or offset parent
            // Since we use anime.js translateX/Y, the initial transform is 0,0
            // But we need to calculate movement deltas.
            initialPos.current = {
                x: e.clientX - currentPos.current.x,
                y: e.clientY - currentPos.current.y
            };
            
            element.setPointerCapture(e.pointerId);
            element.style.cursor = 'grabbing';
            element.style.zIndex = '50'; // Bring to front
            
            // Minor scale up on drag start
            animate(element, {
                scale: 1.1,
                duration: 200,
                ease: 'outQuad'
            });
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            
            // Calculate new position
            const newX = e.clientX - initialPos.current.x;
            const newY = e.clientY - initialPos.current.y;
            
            currentPos.current = { x: newX, y: newY };

            // Direct DOM manipulation via anime.js for performance (no React state)
            utils.set(element, {
                translateX: newX,
                translateY: newY,
            });

            if (onDragMove) {
                onDragMove(newX, newY, element);
            }
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (!isDragging.current) return;
            isDragging.current = false;
            
            element.releasePointerCapture(e.pointerId);
            element.style.cursor = 'grab';
            element.style.zIndex = '10';

            // Scale back to normal
            animate(element, {
                scale: 1,
                duration: 200,
                ease: 'outQuad'
            });

            // Find all bins on screen
            const binElements = document.querySelectorAll('.trash-bin-target');
            let droppedBin: HTMLElement | null = null;
            
            binElements.forEach((bin) => {
                if (isColliding(element, bin as HTMLElement)) {
                    droppedBin = bin as HTMLElement;
                }
            });

            onDrop(droppedBin);
        };

        element.addEventListener('pointerdown', handlePointerDown);
        element.addEventListener('pointermove', handlePointerMove);
        element.addEventListener('pointerup', handlePointerUp);
        element.addEventListener('pointercancel', handlePointerUp);

        return () => {
            element.removeEventListener('pointerdown', handlePointerDown);
            element.removeEventListener('pointermove', handlePointerMove);
            element.removeEventListener('pointerup', handlePointerUp);
            element.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [enabled, onDrop, onDragMove]);

    const resetPosition = (animateProp = true) => {
        const element = itemRef.current;
        if (!element) return;

        currentPos.current = { x: 0, y: 0 };
        
        if (animateProp) {
            animate(element, {
                translateX: 0,
                translateY: 0,
                duration: 400,
                ease: 'outElastic(1, .5)' // Bouncy return
            });
        } else {
            utils.set(element, { translateX: 0, translateY: 0 });
        }
    };

    const dropIntoBin = (binElement: HTMLElement, onComplete?: () => void) => {
        const element = itemRef.current;
        if (!element) return;

        // Calculate center of bin relative to the current position
        const binRect = binElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        const deltaX = (binRect.left + binRect.width / 2) - (elementRect.left + elementRect.width / 2);
        const deltaY = (binRect.top + binRect.height / 2) - (elementRect.top + elementRect.height / 2);

        animate(element, {
            translateX: currentPos.current.x + deltaX,
            translateY: currentPos.current.y + deltaY,
            scale: 0,
            opacity: 0,
            duration: 300,
            ease: 'inQuad',
            onComplete: () => {
                resetPosition(false); // Reset silently after drop animation
                utils.set(element, { scale: 1, opacity: 1 }); // reset for next item
                if (onComplete) onComplete();
            }
        });
    };

    return { itemRef, resetPosition, dropIntoBin };
}

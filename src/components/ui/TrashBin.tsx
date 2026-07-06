import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { WasteCategory, trashBins } from '../../data/wasteTypes';

interface TrashBinProps {
    category: WasteCategory;
    state: 'default' | 'unavailable' | 'open';
    shakeError?: boolean;
    shakeSuccess?: boolean;
    onAnimationEnd?: () => void;
}

export default function TrashBin({ category, state, shakeError, shakeSuccess, onAnimationEnd }: TrashBinProps) {
    const binRef = useRef<HTMLDivElement>(null);
    const binData = trashBins.find((b) => b.category === category);

    useEffect(() => {
        if (!binRef.current) return;

        if (shakeError) {
            animate(binRef.current, {
                translateX: [
                    { value: -10, duration: 50 },
                    { value: 10, duration: 50 },
                    { value: -10, duration: 50 },
                    { value: 10, duration: 50 },
                    { value: 0, duration: 50 }
                ],
                ease: 'inOutSine',
                onComplete: () => {
                    if (onAnimationEnd) onAnimationEnd();
                }
            });
        }

        if (shakeSuccess) {
            animate(binRef.current, {
                translateY: [
                    { value: -10, duration: 100 },
                    { value: 0, duration: 100 },
                    { value: -5, duration: 100 },
                    { value: 0, duration: 100 }
                ],
                ease: 'inOutSine',
                onComplete: () => {
                    if (onAnimationEnd) onAnimationEnd();
                }
            });
        }
    }, [shakeError, shakeSuccess, onAnimationEnd]);

    if (!binData) return null;

    let imgSrc = binData.defaultImage;
    if (state === 'open') imgSrc = binData.openImage;
    if (state === 'unavailable') imgSrc = binData.offImage;

    return (
        <div 
            ref={binRef}
            className="trash-bin-target flex flex-col items-center justify-end w-28 sm:w-36 transition-transform"
            data-category={category}
        >
            <img 
                src={imgSrc} 
                alt={`Tong Sampah ${category}`} 
                className="w-full h-auto drop-shadow-md pointer-events-none"
                draggable={false}
            />
        </div>
    );
}

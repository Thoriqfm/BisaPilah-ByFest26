import { useState, useCallback, useEffect } from 'react';
import { wasteItems, WasteItem, WasteCategory } from '../data/wasteTypes';
import { shuffleArray } from '../lib/gameUtils';

interface UseGameLogicReturn {
    score: number;
    mistakes: number;
    currentItem: WasteItem | null;
    totalItems: number;
    binStates: Record<WasteCategory, 'default' | 'unavailable' | 'open'>;
    handleDrop: (itemCategory: WasteCategory, targetCategory: WasteCategory) => boolean;
    resetGame: () => void;
    setBinHoverState: (category: WasteCategory, isHovered: boolean) => void;
    isFinished: boolean;
    advanceToNextItem: () => void;
}

const ITEMS_PER_GAME = 5;

export function useGameLogic(): UseGameLogicReturn {
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [items, setItems] = useState<WasteItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [binStates, setBinStates] = useState<Record<WasteCategory, 'default' | 'unavailable' | 'open'>>({
        ORGANIK: 'default',
        ANORGANIK: 'default',
        B3: 'default',
    });

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = useCallback(() => {
        setScore(0);
        setMistakes(0);
        setCurrentIndex(0);
        setItems(shuffleArray(wasteItems).slice(0, ITEMS_PER_GAME));
        setBinStates({
            ORGANIK: 'default',
            ANORGANIK: 'default',
            B3: 'default',
        });
    }, []);

    const currentItem = items[currentIndex] || null;
    const isFinished = currentIndex >= items.length && items.length > 0;
    const totalItems = items.length;

    const setBinHoverState = useCallback((category: WasteCategory, isHovered: boolean) => {
        setBinStates((prev) => {
            if (prev[category] === 'unavailable') return prev;
            
            return {
                ...prev,
                [category]: isHovered ? 'open' : 'default',
            };
        });
    }, []);

    const handleDrop = useCallback((itemCategory: WasteCategory, targetCategory: WasteCategory) => {
        if (itemCategory === targetCategory) {
            setScore((prev) => prev + 1);
            setMistakes(0);
            setBinStates({
                ORGANIK: 'default',
                ANORGANIK: 'default',
                B3: 'default',
            });
            return true;
        } else {
            setMistakes((prev) => {
                const newMistakes = prev + 1;
                if (newMistakes >= 3 && currentItem) {
                    setBinStates((prevStates) => {
                        const newStates = { ...prevStates };
                        (Object.keys(newStates) as WasteCategory[]).forEach((key) => {
                            if (key !== currentItem.category) {
                                newStates[key] = 'unavailable';
                            } else {
                                newStates[key] = 'default';
                            }
                        });
                        return newStates;
                    });
                }
                return newMistakes;
            });
            return false;
        }
    }, [currentItem]);

    const advanceToNextItem = useCallback(() => {
        setCurrentIndex((prev) => prev + 1);
    }, []);

    return {
        score,
        mistakes,
        currentItem,
        totalItems,
        binStates,
        handleDrop,
        resetGame,
        setBinHoverState,
        isFinished,
        advanceToNextItem,
    };
}

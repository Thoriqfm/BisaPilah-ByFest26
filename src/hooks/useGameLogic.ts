import { useState, useCallback, useEffect } from 'react';
import { wasteItems, WasteItem, WasteCategory, trashBins, TrashBinData } from '../data/wasteTypes';
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
}

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

    // Initialize game
    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = useCallback(() => {
        setScore(0);
        setMistakes(0);
        setCurrentIndex(0);
        setItems(shuffleArray(wasteItems));
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
            // Don't change state if it's already unavailable
            if (prev[category] === 'unavailable') return prev;
            
            return {
                ...prev,
                [category]: isHovered ? 'open' : 'default',
            };
        });
    }, []);

    const handleDrop = useCallback((itemCategory: WasteCategory, targetCategory: WasteCategory) => {
        // Correct drop
        if (itemCategory === targetCategory) {
            setScore((prev) => prev + 1);
            setCurrentIndex((prev) => prev + 1);
            setMistakes(0); // Optional: reset mistakes on correct answer? The rule just says after 3 wrong. Let's keep mistakes or reset. The prompt doesn't specify resetting, we'll keep it cumulative or reset per item. Resetting per item makes more sense.
            setBinStates({
                ORGANIK: 'default',
                ANORGANIK: 'default',
                B3: 'default',
            });
            return true; // Success
        } else {
            // Wrong drop
            setMistakes((prev) => {
                const newMistakes = prev + 1;
                if (newMistakes >= 3 && currentItem) {
                    // Disable wrong bins as a clue
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
            return false; // Failed
        }
    }, [currentItem]);

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
    };
}

"use client";

import { useState, useEffect } from "react";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useDrag } from "../../hooks/useDrag";
import TrashBin from "../ui/TrashBin";
import TrashItem from "../ui/TrashItem";
import { WasteCategory } from "../../data/wasteTypes";
import { isColliding } from "../../lib/gameUtils";

interface GameSectionProps {
    onFinish?: (finished: boolean) => void;
}

export default function GameSection({ onFinish }: GameSectionProps) {
    const {
        score,
        currentItem,
        totalItems,
        binStates,
        handleDrop,
        setBinHoverState,
        isFinished,
        resetGame,
        advanceToNextItem,
    } = useGameLogic();

    useEffect(() => {
        if (onFinish) {
            onFinish(isFinished);
        }
    }, [isFinished, onFinish]);

    const [shakingBin, setShakingBin] = useState<{
        category: WasteCategory;
        type: "error" | "success";
    } | null>(null);

    const { itemRef, resetPosition, dropIntoBin } = useDrag({
        enabled: !isFinished && currentItem !== null,
        onDragMove: (x, y, element) => {
            const binElements = document.querySelectorAll(".trash-bin-target");
            let hoveredCategory: WasteCategory | null = null;

            binElements.forEach((bin) => {
                if (isColliding(element, bin as HTMLElement)) {
                    hoveredCategory = bin.getAttribute(
                        "data-category",
                    ) as WasteCategory;
                }
            });

            // Update hover states
            (["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).forEach(
                (cat) => {
                    setBinHoverState(cat, cat === hoveredCategory);
                },
            );
        },
        onDrop: (targetBin) => {
            // Reset all hover states
            (["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).forEach(
                (cat) => {
                    setBinHoverState(cat, false);
                },
            );

            if (!targetBin || !currentItem) {
                resetPosition(true);
                return;
            }

            const targetCategory = targetBin.getAttribute(
                "data-category",
            ) as WasteCategory;

            // If bin is unavailable, don't allow drop
            if (binStates[targetCategory] === "unavailable") {
                resetPosition(true);
                return;
            }

            const isSuccess = handleDrop(currentItem.category, targetCategory);

            if (isSuccess) {
                setShakingBin({ category: targetCategory, type: "success" });
                dropIntoBin(targetBin, () => {
                    advanceToNextItem();
                });
            } else {
                setShakingBin({ category: targetCategory, type: "error" });
                resetPosition(true);
            }
        },
    });

    return (
        <section
            id="game-section"
            className="relative min-h-screen bg-[#EBF4F9] flex flex-col items-center pt-20 sm:pt-28 select-none"
        >
            {/* Transition Blur */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none translate-y-[-50%]"
                style={{
                    width: "120%",
                    minWidth: 1440.59,
                    height: 18,
                    background: "#EBF4F9",
                    boxShadow: "50px 50px 50px rgba(0,0,0,0)", // fixed invalid boxShadow syntax just in case
                    filter: "blur(5px)",
                }}
            />
            {/* Header / Title */}
            <div className="text-center z-10 px-4 mb-8 sm:mb-12">
                <h2
                    className="text-4xl sm:text-5xl font-black text-[#1F542A] mb-4 drop-shadow-sm"
                    style={{ fontFamily: "'MOON GET', sans-serif" }}
                >
                    Coba Pilahlah Sampah Ini!
                </h2>
                <p
                    className="text-sm sm:text-base font-bold text-[#1F542A] mb-4 text-[32px]"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                    Masukkan sampah ini sesuai dengan jenisnya! Seret ke tempat
                    yang benar ya!
                </p>
                <div
                    className="text-xl sm:text-2xl font-bold text-[#1F542A]"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                    {score}/{totalItems}
                </div>
            </div>

            {/* Game Area */}
            <div className="relative w-full max-w-4xl flex-grow flex flex-col items-center justify-between z-10">
                {/* Active Trash Item */}
                <div className="flex-grow flex items-center justify-center mt-10">
                    {currentItem && !isFinished ? (
                        <TrashItem ref={itemRef} item={currentItem} />
                    ) : isFinished ? (
                        <div className="text-center bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                            <h3 className="text-2xl font-bold text-green-700 mb-4">
                                Permainan Selesai!
                            </h3>
                            <p className="text-lg mb-6">
                                Kamu berhasil memilah semua sampah.
                            </p>
                            <button
                                onClick={resetGame}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                            >
                                Main Lagi
                            </button>
                        </div>
                    ) : null}
                </div>

                {/* Trash Bins Container */}
                <div className="w-full flex justify-center gap-4 sm:gap-12 px-4 mb-32 sm:mb-40">
                    {(["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).map(
                        (cat) => (
                            <TrashBin
                                key={cat}
                                category={cat}
                                state={binStates[cat]}
                                shakeError={
                                    shakingBin?.category === cat &&
                                    shakingBin?.type === "error"
                                }
                                shakeSuccess={
                                    shakingBin?.category === cat &&
                                    shakingBin?.type === "success"
                                }
                                onAnimationEnd={() => setShakingBin(null)}
                            />
                        ),
                    )}
                </div>
            </div>

            {/* Background & Footer Graphics */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
                {/* Stones decoration */}
                <div className="absolute bottom-16 sm:bottom-20 left-[10%] opacity-80">
                    <img
                        src="/images/section/games/pic/batu-1.svg"
                        alt="batu"
                        className="w-8 sm:w-12 h-auto"
                    />
                </div>
                <div className="absolute bottom-24 sm:bottom-32 left-[25%] opacity-60">
                    <img
                        src="/images/section/games/pic/batu-2.svg"
                        alt="batu"
                        className="w-5 sm:w-8 h-auto"
                    />
                </div>
                <div className="absolute bottom-12 sm:bottom-16 right-[15%] opacity-90">
                    <img
                        src="/images/section/games/pic/batu-1.svg"
                        alt="batu"
                        className="w-10 sm:w-16 h-auto transform -scale-x-100"
                    />
                </div>

                {/* Footer Gradient / Ground */}
                <img
                    src="/images/section/games/pic/games-footer.svg"
                    alt="Ground footer"
                    className="w-full h-auto object-cover object-bottom"
                />
            </div>
        </section>
    );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
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

  const [showPopup, setShowPopup] = useState(false);
  const [headerFeedback, setHeaderFeedback] = useState<
    "default" | "success" | "error"
  >("default");
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isFinished) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

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
          hoveredCategory = bin.getAttribute("data-category") as WasteCategory;
        }
      });

      // Update hover states
      (["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).forEach((cat) => {
        setBinHoverState(cat, cat === hoveredCategory);
      });
    },
    onDrop: (targetBin) => {
      // Reset all hover states
      (["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).forEach((cat) => {
        setBinHoverState(cat, false);
      });

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
        setHeaderFeedback("success");
        setShakingBin({ category: targetCategory, type: "success" });
        dropIntoBin(targetBin, () => {
          advanceToNextItem();
        });
      } else {
        setHeaderFeedback("error");
        setShakingBin({ category: targetCategory, type: "error" });
        resetPosition(true);
        if (headerRef.current) {
          animate(headerRef.current, {
            translateX: [-10, 10, -10, 10, 0],
            duration: 300,
            ease: "inOutSine",
          });
        }
      }
    },
  });

  // Entrance animation for new items
  useEffect(() => {
    if (itemRef.current && currentItem && !isFinished) {
      animate(itemRef.current, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        ease: "outElastic(1, .5)",
      });
    }
  }, [currentItem, isFinished]);

  return (
    <section
      id="game-section"
      className="relative h-[100dvh] w-full bg-[#EBF4F9] flex flex-col items-center pt-[5vh] sm:pt-[8vh] select-none overflow-x-clip"
    >
      {/* Transition Blur */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none translate-y-[-50%]"
        style={{
          width: "120%",
          minWidth: 1440.59,
          height: 18,
          background: "#EBF4F9",
          boxShadow: "50px 50px 50px rgba(0,0,0,0)",
          filter: "blur(5px)",
        }}
      />

      {/* Header / Title */}
      <div className="text-center z-10 px-4 mb-[2vh] sm:mb-[4vh]">
        <h2
          ref={headerRef}
          className={`font-extrabold mb-2 sm:mb-4 drop-shadow-sm leading-normal transition-colors duration-500 ${
            !isFinished && headerFeedback === "error"
              ? "text-[#DE261E]"
              : "text-[#044800]"
          }`}
          style={{
            fontFamily: '"MOON GET!", sans-serif',
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
          }}
        >
          {isFinished
            ? "Selesai, Hebat!"
            : headerFeedback === "success"
              ? "Bagus, Lanjutkan!"
              : headerFeedback === "error"
                ? "Coba Perhatikan Lagi!"
                : "Coba Pilahlah Sampah Ini!"}
        </h2>
        <p
          className="font-bold text-[#044800] mb-2 sm:mb-4 leading-normal text-center transition-all duration-500"
          style={{
            fontFamily: "'Afacad', sans-serif",
            fontSize: "clamp(0.95rem, 3.2vw, 1.563rem)",
          }}
        >
          {isFinished
            ? "Mari bersama kita mulai dari sini, untuk bumi yang terus mengabdi!"
            : "Masukkan sampah ini sesuai dengan jenisnya! Seret ke tempat yang benar ya!"}
        </p>
        <div
          className="text-xl sm:text-2xl font-bold text-[#1F542A]"
          style={{ fontFamily: "'Afacad', sans-serif" }}
        >
          {score}/{totalItems}
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-between z-10 min-h-0">
        {/* Active Trash Item */}
        <div className="flex-1 w-full flex items-center justify-center pb-[10vh] min-h-0">
          {currentItem && !isFinished ? (
            <TrashItem key={currentItem.id} ref={itemRef} item={currentItem} />
          ) : null}
        </div>

        {/* Trash Bins Container */}
        <div className="w-full flex justify-center items-end gap-6 sm:gap-12 md:gap-16 lg:gap-24 px-4 pb-[5vh] md:pb-[8vh]">
          {(["ORGANIK", "ANORGANIK", "B3"] as WasteCategory[]).map((cat) => (
            <TrashBin
              key={cat}
              category={cat}
              state={binStates[cat]}
              shakeError={
                shakingBin?.category === cat && shakingBin?.type === "error"
              }
              shakeSuccess={
                shakingBin?.category === cat && shakingBin?.type === "success"
              }
              onAnimationEnd={() => setShakingBin(null)}
            />
          ))}
        </div>
      </div>

      {/* Floating Stones */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[45%] sm:top-[50%] left-[25%] sm:left-[30%]">
          <img
            src="/images/section/games/pic/batu-1.svg"
            alt="batu"
            className="w-16 sm:w-24 h-auto"
          />
        </div>
        <div className="absolute top-[38%] sm:top-[43%] right-[20%] sm:right-[30%]">
          <img
            src="/images/section/games/pic/batu-2.svg"
            alt="batu"
            className="w-12 sm:w-26 h-auto"
          />
        </div>
      </div>

      {/* Background & Footer Graphics */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <img
          src="/images/section/games/pic/games-footer.svg"
          alt="Ground footer"
          className="w-full h-auto object-cover object-bottom"
        />
      </div>

      {/* Popup Modal */}
      {isFinished && showPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-transparent px-4 animate-fade-in">
          <div className="relative bg-[#EBF9EE] border-[6px] border-[#2E7D32] rounded-[3rem] p-6 md:p-10 min-h-[350px] md:min-h-[450px] max-w-3xl w-full text-center flex flex-col items-center justify-center animate-fade-in-up mt-36 shadow-2xl">
            {/* Text and Image Wrapper */}
            <div className="mt-24 md:mt-36 w-full relative flex flex-col items-center z-10">
              {/* Farmer Woman Image (Anchored perfectly to the text) */}
              <div className="absolute -top-[130px] md:-top-[190px] left-1/2 -translate-x-1/2 w-[240px] md:w-[360px] h-auto z-0 pointer-events-none">
                <img
                  src="/images/section/games/popup/farmer-woman.png"
                  alt="Farmer Woman"
                  className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                />
              </div>

              <h3
                className="text-[22px] md:text-[28px] font-extrabold text-[#044800] mb-3 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
                style={{
                  fontFamily: '"MOON GET!", sans-serif',
                  textShadow: "0 0 20px white, 0 0 30px white",
                }}
              >
                Kamu Telah Menyelesaikan Tantangan!
              </h3>
              <p
                className="text-[16px] md:text-[22px] font-bold text-[#044800] mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                style={{
                  fontFamily: "'Afacad', sans-serif",
                  textShadow: "0 0 10px white, 0 0 20px white",
                }}
              >
                Apakah kamu mau lanjut bermain, atau mau jadi lebih tahu?
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    resetGame();
                    setHeaderFeedback("default");
                  }}
                  className="relative w-48 h-10 bg-[#E52D2D] hover:bg-[#D32F2F] text-white font-bold rounded-[50px] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-[16px] shadow-md"
                  style={{
                    fontFamily: "'Afacad', sans-serif",
                  }}
                >
                  Bermain Lagi
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const choice = document.getElementById("choice-section");
                    if (choice)
                      choice.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="relative w-48 h-10 bg-[#1F8D24] hover:bg-[#1B781F] text-white font-bold rounded-[50px] transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-[16px] shadow-md"
                  style={{
                    fontFamily: "'Afacad', sans-serif",
                  }}
                >
                  Jadi Lebih Tahu !
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

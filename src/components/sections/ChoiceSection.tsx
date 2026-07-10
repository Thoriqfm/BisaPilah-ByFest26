"use client";

import React, { useRef } from "react";
import { animate } from "animejs";
import {
  manImg,
  tanganBiruKiri,
  tanganMerahKanan,
} from "../../../public/images/section/choice";

interface ChoiceSectionProps {
  onPillSelect?: (pill: "aksi" | "fact") => void;
}

export default function ChoiceSection({ onPillSelect }: ChoiceSectionProps) {
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);

  const handleHoverEnter = (ref: React.RefObject<HTMLImageElement | null>) => {
    if (ref.current) {
      ref.current.style.zIndex = "50";
      animate(ref.current, {
        scale: 1.05,
        translateY: -10,
        duration: 600,
        ease: "outElastic(1, .6)",
      });
    }
  };

  const handleHoverLeave = (ref: React.RefObject<HTMLImageElement | null>) => {
    if (ref.current) {
      ref.current.style.zIndex = "30";
      animate(ref.current, {
        scale: 1,
        translateY: 0,
        duration: 400,
        ease: "outQuad",
      });
    }
  };

  return (
    <section
      id="choice-section"
      className="relative w-full h-[100dvh] bg-[#071120] flex flex-col md:items-center justify-center overflow-hidden select-none"
    >
      <div className="absolute top-[25%] md:top-[8%] w-full flex justify-center items-center z-10 pointer-events-none">
        <h2
          className="font-black tracking-wide drop-shadow-lg text-center leading-none"
          style={{
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(2.2rem, 8vw, 10rem)", // Sedikit disesuaikan clamp-nya agar aman di HP portrait
          }}
        >
          <span className="text-[#00A3FF]">Pilih</span>{" "}
          <span className="text-[#FF3333]">Jalanmu</span>
        </h2>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-screen max-w-[calc(100vh*16/9)] flex items-center justify-center mx-auto">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
          <div
            className="absolute opacity-[0.35] brightness-[0.8]"
            style={{
              width: "34%",
              bottom: "26%",
              left: "10%",
            }}
          >
            <img
              src={manImg}
              alt="Man Left"
              className="w-full h-auto object-contain"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 65%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            />
          </div>
          <div
            className="absolute opacity-[0.35] brightness-[0.8]"
            style={{
              width: "34%",
              bottom: "26%",
              right: "10%",
            }}
          >
            <img
              src={manImg}
              alt="Man Right"
              className="w-full h-auto object-contain"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 65%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center"
          style={{
            width: "44%",
            bottom: "30%",
          }}
        >
          <img
            src={manImg}
            alt="Man Center"
            className="w-full h-auto max-h-[90vh] object-contain object-bottom drop-shadow-2xl"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
        </div>

        <h3
          className="absolute font-black text-[#00A3FF] tracking-wide drop-shadow-[0_0_20px_rgba(0,163,255,0.55)] z-40 pointer-events-none"
          style={{
            top: "34%",
            left: "18%",
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(1.8rem, 6vw, 7rem)",
          }}
        >
          Aksi
        </h3>
        <h3
          className="absolute font-black text-[#FF3333] tracking-wide drop-shadow-[0_0_20px_rgba(255,51,51,0.55)] z-40 pointer-events-none"
          style={{
            top: "34%",
            right: "12%",
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(1.8rem, 6vw, 7rem)",
          }}
        >
          Fakta
        </h3>

        <img
          ref={leftHandRef}
          src={tanganBiruKiri}
          alt="Pilih Aksi"
          className="absolute origin-bottom-left pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter] z-30"
          style={{
            width: "25%",
            bottom: "12%",
            left: "24%",
          }}
          onMouseEnter={() => handleHoverEnter(leftHandRef)}
          onMouseLeave={() => handleHoverLeave(leftHandRef)}
          onClick={() => onPillSelect && onPillSelect("aksi")}
        />

        <img
          ref={rightHandRef}
          src={tanganMerahKanan}
          alt="Pilih Fakta"
          className="absolute origin-bottom-right pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter] z-30"
          style={{
            width: "25%",
            bottom: "12%",
            right: "24%",
          }}
          onMouseEnter={() => handleHoverEnter(rightHandRef)}
          onMouseLeave={() => handleHoverLeave(rightHandRef)}
          onClick={() => onPillSelect && onPillSelect("fact")}
        />
      </div>
    </section>
  );
}

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
        scale: 1.1,
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
        duration: 400,
        ease: "outQuad",
      });
    }
  };

  return (
    <section
      id="choice-section"
      className="relative w-full h-screen bg-[#071120] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* ── Title (z-0, pria tengah overlap kepala ke sini) ── */}
      <div className="absolute top-[4%] w-full flex justify-center items-center z-0">
        <h2
          className="font-black tracking-wide drop-shadow-lg text-center leading-none"
          style={{
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(2.8rem, 11vw, 11rem)",
          }}
        >
          <span className="text-[#00A3FF]">Pilih</span>{" "}
          <span className="text-[#FF3333]">Jalanmu</span>
        </h2>
      </div>

      {/* ── Ghost men – kiri & kanan, lebih besar & terlihat ── */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        {/* Left ghost man */}
        <div
          className="absolute opacity-[0.35] brightness-[0.8]"
          style={{
            width: "clamp(180px, 32vw, 680px)",
            transform: "translateX(-55%)",
          }}
        >
          <img
            src={manImg}
            alt="Man Left"
            className="w-full h-auto"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          />
        </div>
        {/* Right ghost man */}
        <div
          className="absolute opacity-[0.35] brightness-[0.8]"
          style={{
            width: "clamp(180px, 32vw, 680px)",
            transform: "translateX(55%)",
          }}
        >
          <img
            src={manImg}
            alt="Man Right"
            className="w-full h-auto"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Center Man – lebih besar, kepala melewati judul ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ width: "clamp(320px, 65vw, 1100px)" }}
      >
        <img
          src={manImg}
          alt="Man Center"
          className="w-full h-auto drop-shadow-2xl"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 72%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 72%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Label Aksi & Fakta ── */}
      <div
        className="absolute w-full flex justify-between items-center z-40 pointer-events-none"
        style={{
          top: "38%",
          paddingLeft: "clamp(1rem, 14vw, 18rem)",
          paddingRight: "clamp(1rem, 14vw, 18rem)",
        }}
      >
        <h3
          className="font-black text-[#00A3FF] tracking-wide drop-shadow-[0_0_20px_rgba(0,163,255,0.55)]"
          style={{
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)",
          }}
        >
          Aksi
        </h3>
        <h3
          className="font-black text-[#FF3333] tracking-wide drop-shadow-[0_0_20px_rgba(255,51,51,0.55)]"
          style={{
            fontFamily: '"Moon Get", sans-serif',
            fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)",
          }}
        >
          Fakta
        </h3>
      </div>

      {/* ── Hands – besar, hampir menyentuh tengah ── */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Left hand – blue / Aksi */}
        <img
          ref={leftHandRef}
          src={tanganBiruKiri}
          alt="Pilih Aksi"
          className="absolute origin-bottom-left pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter]"
          style={{
            width: "clamp(140px, 24vw, 420px)",
            bottom: "clamp(3%, 5vh, 8%)",
            left: "clamp(1rem, 18vw, 26%)",
          }}
          onMouseEnter={() => handleHoverEnter(leftHandRef)}
          onMouseLeave={() => handleHoverLeave(leftHandRef)}
          onClick={() => onPillSelect && onPillSelect("aksi")}
        />

        {/* Right hand – red / Fakta */}
        <img
          ref={rightHandRef}
          src={tanganMerahKanan}
          alt="Pilih Fakta"
          className="absolute origin-bottom-right pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter]"
          style={{
            width: "clamp(140px, 24vw, 420px)",
            bottom: "clamp(3%, 5vh, 8%)",
            right: "clamp(1rem, 18vw, 26%)",
          }}
          onMouseEnter={() => handleHoverEnter(rightHandRef)}
          onMouseLeave={() => handleHoverLeave(rightHandRef)}
          onClick={() => onPillSelect && onPillSelect("fact")}
        />
      </div>
    </section>
  );
}

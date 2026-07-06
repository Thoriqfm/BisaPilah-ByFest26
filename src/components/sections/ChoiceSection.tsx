"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { animate } from "animejs";

import {
  manImg,
  tanganBiruKiri,
  tanganMerahKanan,
} from "../../../public/images/section/choice";

export default function ChoiceSection() {
  const router = useRouter();
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);

  const handleHoverEnter = (ref: React.RefObject<HTMLImageElement | null>) => {
    if (ref.current) {
      ref.current.style.zIndex = "50";
      animate(ref.current, {
        scale: 1.35,
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
      {/* Title (Behind the center man) */}
      <div className="absolute top-[8%] md:top-[0%] w-full flex justify-center items-center z-0 gap-4 md:gap-8">
        <h2
          className="text-[4rem] md:text-[8rem] lg:text-[11rem] font-black text-[#00A3FF] tracking-tighter drop-shadow-lg"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Pilih
        </h2>
        <h2
          className="text-[4rem] md:text-[8rem] lg:text-[11rem] font-black text-[#FF3333] tracking-tighter drop-shadow-lg"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Jalanmu
        </h2>
      </div>

      {/* Background Men - 2 side faded */}
      {/* They are pushed down and scaled down so the center man is distinctly taller */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10 top-[5%] md:top-[8%]">
        {/* Left Man */}
        <div className="absolute -translate-x-[35%] md:-translate-x-[60%] opacity-[0.2] brightness-[0.7] mix-blend-screen w-[220px] md:w-[700px]">
          <img
            src={manImg}
            alt="Man Left"
            className="w-full h-auto"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
          />
        </div>
        {/* Right Man */}
        <div className="absolute translate-x-[35%] md:translate-x-[60%] opacity-[0.2] brightness-[0.7] mix-blend-screen w-[220px] md:w-[700px]">
          <img
            src={manImg}
            alt="Man Right"
            className="w-full h-auto"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Center Man (In front of title, behind hands) */}
      {/* He is huge so his head reaches the title and he stands taller than side men */}
      <div className="absolute bottom-[-5%] md:bottom-[10%] z-20 w-[450px] md:w-[750px] lg:w-[950px] pointer-events-none flex justify-center">
        <img
          src={manImg}
          alt="Man Center"
          className="w-full h-auto drop-shadow-2xl"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Texts: Aksi & Fact (Positioned at neck level of side men, above hands) */}
      <div className="absolute top-[40%] md:top-[45%] w-full flex justify-between px-[4%] md:px-[10%] lg:px-[14%] z-10 pointer-events-none">
        <h3
          className="text-5xl md:text-[6.5rem] font-black text-[#00A3FF] drop-shadow-[0_0_15px_rgba(0,163,255,0.4)]"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Aksi
        </h3>
        <h3
          className="text-5xl md:text-[6.5rem] font-black text-[#FF3333] drop-shadow-[0_0_15px_rgba(255,51,51,0.4)]"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Fakta
        </h3>
      </div>

      {/* Hands (Positioned precisely on the arms of the center man) */}
      <div className="absolute bottom-[-10%] md:bottom-[-18%] w-full h-full pointer-events-none z-30">
        <img
          ref={leftHandRef}
          src={tanganBiruKiri}
          alt="Aksi Hand"
          className="absolute bottom-42 left-[2%] md:left-[15%] lg:left-[20%] w-[180px] md:w-[320px] lg:w-[460px] origin-bottom-left pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter]"
          onMouseEnter={() => handleHoverEnter(leftHandRef)}
          onMouseLeave={() => handleHoverLeave(leftHandRef)}
          onClick={() => router.push("/aksi")}
        />

        <img
          ref={rightHandRef}
          src={tanganMerahKanan}
          alt="Fact Hand"
          className="absolute bottom-42 right-[2%] md:right-[15%] lg:right-[20%] w-[180px] md:w-[320px] lg:w-[460px] origin-bottom-right pointer-events-auto cursor-pointer drop-shadow-2xl hover:brightness-110 transition-[filter]"
          onMouseEnter={() => handleHoverEnter(rightHandRef)}
          onMouseLeave={() => handleHoverLeave(rightHandRef)}
          onClick={() => router.push("/fact")}
        />
      </div>
    </section>
  );
}

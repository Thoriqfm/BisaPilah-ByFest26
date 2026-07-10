"use client";

import { useRef, useEffect } from "react";
import { animate, createTimeline } from "animejs";

import {
    heroBg,
    awanKiriAtas,
    awanKananAtas,
    awanKiriBawah,
    awanKananBawah,
    trashIcon,
} from "../../../public/images/section/home";

export default function HeroSection({
    isSplashDone = true,
}: {
    isSplashDone?: boolean;
}) {
    const handleScrollToGame = () => {
        const gameSection = document.getElementById("game-section");
        if (gameSection) {
            const top = gameSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const animated = useRef(false);

    useEffect(() => {
        if (isSplashDone && !animated.current) {
            animated.current = true;

            const tl = createTimeline({
                defaults: {
                    ease: "outQuart",
                    duration: 2000,
                },
                onComplete: () => {
                    animate([".awan-kiri", ".awan-kanan"], {
                        translateY: () => (Math.random() > 0.5 ? "15px" : "-15px"),
                        alternate: true,
                        loop: true,
                        duration: () => 3000 + Math.random() * 2000,
                        delay: () => Math.random() * 1500,
                        ease: "inOutSine",
                    });
                },
            });

            tl.add(
                ".awan-kiri",
                {
                    translateX: ["-50vw", 0],
                    opacity: [0, 1],
                },
                100,
            ).add(
                ".awan-kanan",
                {
                    translateX: ["50vw", 0],
                    opacity: [0, 1],
                },
                100,
            );

            return () => {
                tl.pause();
                animate.remove(".awan-kiri");
                animate.remove(".awan-kanan");
            };
        }
    }, [isSplashDone]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#F3FBFF]">
            <div className="absolute inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
                <div className="relative w-full h-full min-w-[1200px]">
                    <img
                        src={heroBg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-bottom z-10"
                    />
                    <img
                        src={awanKiriAtas}
                        alt=""
                        className="absolute z-1 awan-kiri opacity-0"
                        style={{
                            top: "8%",
                            left: "-4.5%",
                            width: "50%",
                        }}
                    />
                    <img
                        src={awanKananAtas}
                        alt=""
                        className="absolute z-1 awan-kanan opacity-0"
                        style={{
                            top: "3%",
                            right: "-18%",
                            width: "57%",
                        }}
                    />
                    <img
                        src={awanKiriBawah}
                        alt=""
                        className="absolute z-1 awan-kiri opacity-0"
                        style={{
                            top: "67.5%",
                            left: "13%",
                            width: "45%",
                        }}
                    />
                    <img
                        src={awanKananBawah}
                        alt=""
                        className="absolute z-1 awan-kanan opacity-0"
                        style={{
                            top: "61%",
                            right: "5%",
                            width: "35%",
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 -translate-y-5">
                <h1
                    className="flex items-baseline select-none"
                    style={{
                        fontFamily: '"Moon Get", sans-serif',
                        fontSize: "clamp(3rem, 8vw, 7rem)",
                        lineHeight: 1,
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
                    }}
                >
                    <span style={{ color: "#4F8536" }}>Bis</span>
                    <span style={{ color: "#376AB3" }}>aPi</span>
                    <span style={{ color: "#D24127" }}>lah</span>
                </h1>

                <h2 className="text-xl md:text-3xl font-bold text-[#064b10] mt-4">
                    Bantu kamu paham cara pilah sampah!
                </h2>

                <p className="text-base md:text-2xl text-[#064b10] mt-2">
                    Yakin sudah paham cara pilah? Buktikan di sini
                </p>

                <button
                    onClick={handleScrollToGame}
                    className="mt-6 flex items-center justify-center gap-3 bg-[#1a5c2a] text-[#DDF8E9] font-semibold rounded-full border-2 border-[#1a5c2a] shadow-md hover:bg-[#247438] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer px-6 py-2.5 text-sm md:px-8 md:py-3 md:text-base"
                >
                    <img
                        src={trashIcon}
                        alt=""
                        className="w-5 h-5 object-contain"
                    />
                    Mulai Tantangan
                </button>
            </div>
        </section>
    );
}

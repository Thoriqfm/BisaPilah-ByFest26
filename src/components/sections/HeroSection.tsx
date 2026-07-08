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
        document
            .getElementById("game-section")
            ?.scrollIntoView({ behavior: "smooth" });
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
                    // Continuous wiggle out of sync
                    animate([".awan-kiri", ".awan-kanan"], {
                        // Start from current position (0) smoothly to either 15px or -15px
                        translateY: () => (Math.random() > 0.5 ? "15px" : "-15px"),
                        alternate: true,
                        loop: true,
                        duration: () => 3000 + Math.random() * 2000, // Random duration between 3s and 5s
                        delay: () => Math.random() * 1500, // Random delay so they don't start at the same time
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
                100, // slight delay after splash screen
            ).add(
                ".awan-kanan",
                {
                    translateX: ["50vw", 0],
                    opacity: [0, 1],
                },
                100,
            );
        }
    }, [isSplashDone]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#F3FBFF]">
            {/* Background Illustration */}
            <div className="absolute inset-0 z-2">
                <img
                    src={heroBg}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <img
                src={awanKiriAtas}
                alt=""
                className="absolute z-1 pointer-events-none awan-kiri opacity-0"
                style={{
                    top: "8%",
                    left: "-4.5%",
                    width: "50%",
                }}
            />
            <img
                src={awanKananAtas}
                alt=""
                className="absolute z-1 pointer-events-none awan-kanan opacity-0"
                style={{
                    top: "3%",
                    right: "-18%",
                    width: "57%",
                }}
            />
            <img
                src={awanKiriBawah}
                alt=""
                className="absolute z-1 pointer-events-none awan-kiri opacity-0"
                style={{
                    top: "67.5%",
                    left: "13%",
                    width: "45%",
                }}
            />
            <img
                src={awanKananBawah}
                alt=""
                className="absolute z-1 pointer-events-none awan-kanan opacity-0"
                style={{
                    top: "61%",
                    right: "5%",
                    width: "35%",
                }}
            />

            {/* Content */}
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
                {/* <img
                    src={bisapilahImg}
                    alt="BisaPilah"
                    className="w-70 md:w-125 lg:w-162.5"
                /> */}

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

"use client";

import {
    heroBg,
    awanKiriAtas,
    awanKananAtas,
    awanKiriBawah,
    awanKananBawah,
} from "../../../public/images/section/home";

export default function HeroSection() {
    const handleScrollToGame = () => {
        document
            .getElementById("game-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

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
                className="absolute z-1 pointer-events-none"
                style={{
                    top: "8%",
                    left: "-4.5%",
                    width: "50%",
                }}
            />
            <img
                src={awanKananAtas}
                alt=""
                className="absolute z-1 pointer-events-none"
                style={{
                    top: "3%",
                    right: "-18%",
                    width: "57%",
                }}
            />
            <img
                src={awanKiriBawah}
                alt=""
                className="absolute z-1 pointer-events-none"
                style={{
                    top: "67.5%",
                    left: "13%",
                    width: "45%",
                }}
            />
            <img
                src={awanKananBawah}
                alt=""
                className="absolute z-1 pointer-events-none"
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
                    className="mt-6 flex items-center gap-3 bg-[#1a5c2a] text-white font-semibold px-8 py-3 rounded-full border-2 border-[#1a5c2a] hover:bg-white hover:text-[#1a5c2a] transition-all duration-300 cursor-pointer"
                >
                    Mulai Tantangan
                </button>
            </div>
        </section>
    );
}

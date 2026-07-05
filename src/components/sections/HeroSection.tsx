"use client";

import {
    bisapilahImg,
    heroBg,
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
            <div className="absolute inset-0">
                <img
                    src={heroBg}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
                <img
                    src={bisapilahImg}
                    alt="BisaPilah"
                    className="w-[280px] md:w-[500px] lg:w-[650px]"
                />

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

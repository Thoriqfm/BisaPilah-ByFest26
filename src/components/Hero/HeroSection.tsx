"use client";

import Image from "next/image";
import {
    bisapilahImg,
    awanKiriAtas,
    awanKananAtas,
    awanKiriBawah,
    awanKananBawah,
    kincir1,
    kincir2,
    pohonKiri,
    pohonKanan,
    heroBg,
} from "@/assets/homepage";

export default function HeroSection() {
    const handleScrollToGame = () => {
        document
            .getElementById("game-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#F3FBFF" }}
        >
            {/* ===== LAYER 1: Awan (paling belakang) ===== */}
            <div className="absolute top-0 left-0 z-[1] w-[300px] md:w-[420px] pointer-events-none">
                <Image
                    src={awanKiriAtas}
                    alt="Awan kiri atas"
                    width={420}
                    height={200}
                    className="object-contain"
                />
            </div>
            <div className="absolute top-0 right-0 z-[1] w-[300px] md:w-[420px] pointer-events-none">
                <Image
                    src={awanKananAtas}
                    alt="Awan kanan atas"
                    width={420}
                    height={200}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-[30%] left-0 z-[1] w-[200px] md:w-[300px] pointer-events-none">
                <Image
                    src={awanKiriBawah}
                    alt="Awan kiri bawah"
                    width={300}
                    height={150}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-[30%] right-0 z-[1] w-[200px] md:w-[300px] pointer-events-none">
                <Image
                    src={awanKananBawah}
                    alt="Awan kanan bawah"
                    width={300}
                    height={150}
                    className="object-contain"
                />
            </div>
            {/* ===== LAYER 2: Kincir angin (kiri) ===== */}
            <div className="absolute bottom-[20%] left-[6%] z-[2] w-[80px] md:w-[110px] pointer-events-none">
                <Image
                    src={kincir1}
                    alt="Kincir angin 1"
                    width={110}
                    height={240}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-[22%] left-[13%] z-[2] w-[60px] md:w-[85px] pointer-events-none">
                <Image
                    src={kincir2}
                    alt="Kincir angin 2"
                    width={85}
                    height={200}
                    className="object-contain"
                />
            </div>
            {/* ===== LAYER 3: Pohon kiri & kanan ===== */}
            <div className="absolute bottom-0 left-0 z-[3] w-[200px] md:w-[280px] lg:w-[340px] pointer-events-none">
                <Image
                    src={pohonKiri}
                    alt="Pohon kiri"
                    width={340}
                    height={500}
                    className="object-contain object-bottom"
                />
            </div>
            <div className="absolute bottom-0 right-0 z-[3] w-[200px] md:w-[280px] lg:w-[340px] pointer-events-none">
                <Image
                    src={pohonKanan}
                    alt="Pohon kanan"
                    width={340}
                    height={500}
                    className="object-contain object-bottom"
                />
            </div>
            {/* ===== LAYER 4: Dataran utama (ground/terrain) ===== */}
            <div className="absolute bottom-0 left-0 right-0 z-[4] w-full h-[150px] md:h-[200px] lg:h-[260px] pointer-events-none">
                <Image
                    src={heroBg}
                    alt="Dataran hijau"
                    width={1440}
                    height={400}
                    className="w-full object-cover object-top"
                />
            </div>
            {/* ===== LAYER 5: Konten tengah ===== */}
            <div className="relative z-[10] flex flex-col items-center text-center px-6 pb-[180px] md:pb-[220px]">
                {/* Logo BisaPilah */}
                <div className="mb-5">
                    <Image
                        src={bisapilahImg}
                        alt="BisaPilah"
                        width={500}
                        height={150}
                        className="w-[260px] md:w-[400px] lg:w-[500px] object-contain"
                        priority
                    />
                </div>
                {/* Tagline */}
                <p
                    className="text-[#1a5c2a] font-bold text-lg md:text-2xl mb-2"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                    Bantu kamu paham cara pilah sampah!
                </p>
                {/* Subtitle */}
                <p
                    className="text-[#2d6e40] text-sm md:text-base mb-8"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                    Yakin sudah paham cara pilah? Buktikan Disini
                </p>
                {/* Tombol CTA */}
                <button
                    id="hero-cta-btn"
                    onClick={handleScrollToGame}
                    className="flex items-center gap-3 bg-[#1a5c2a] text-white font-semibold px-8 py-3 rounded-full border-2 border-[#1a5c2a] hover:bg-white hover:text-[#1a5c2a] transition-all duration-300 text-base md:text-lg cursor-pointer shadow-md hover:shadow-lg"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                    </svg>
                    Mulai Tantangan
                </button>
            </div>
        </section>
    );
}

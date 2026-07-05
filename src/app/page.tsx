"use client";

import { useState } from "react";
import SplashScreen from "../components/ui/SplashScreen";
import HeroSection from "../components/sections/HeroSection";
import GameSection from "../components/sections/GameSection";
import ChoiceSection from "../components/sections/ChoiceSection";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            {/* {!splashDone && ( */}
            <SplashScreen onComplete={() => setSplashDone(true)} />
            {/* )} */}

            <main>
                <HeroSection />
                <GameSection />
                <ChoiceSection />
                
                {/* Spacer section for testing scrolling */}
                <section className="h-screen bg-[#071120] flex items-center justify-center">
                    <p className="text-white/30 text-xl">Empty space for scrolling</p>
                </section>
            </main>
        </>
    );
}

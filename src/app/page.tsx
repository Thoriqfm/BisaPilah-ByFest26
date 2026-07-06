"use client";

import { useState } from "react";
import SplashScreen from "../components/ui/SplashScreen";
import HeroSection from "../components/sections/HeroSection";
import GameSection from "../components/sections/GameSection";
import ChoiceSection from "../components/sections/ChoiceSection";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    return (
        <>
            {/* {!splashDone && ( */}
            <SplashScreen onComplete={() => setSplashDone(true)} />
            {/* )} */}

            <main className="overflow-x-hidden">
                <HeroSection />
                <GameSection onFinish={(status) => setIsGameFinished(status)} />

                {isGameFinished && (
                    <div className="animate-fade-in transition-opacity duration-1000 flex flex-col -mt-1">
                        {/* Thin Transition Gradient from GameSection to ChoiceSection */}
                        <div className="w-full h-12 md:h-16 bg-gradient-to-b from-[#EBF4F9] to-[#071120]"></div>
                        <ChoiceSection />
                    </div>
                )}
            </main>
        </>
    );
}

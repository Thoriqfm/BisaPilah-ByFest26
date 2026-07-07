"use client";

import { useState } from "react";
import SplashScreen from "../components/ui/SplashScreen";
import HeroSection from "../components/sections/HeroSection";
import GameSection from "../components/sections/GameSection";
import ChoiceSection from "../components/sections/ChoiceSection";
import AksiSection from "../components/sections/AksiSection";
import FactSection from "../components/sections/FactSection";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [selectedPill, setSelectedPill] = useState<'aksi' | 'fact' | null>(null);

    const handlePillSelect = (pill: 'aksi' | 'fact') => {
        setSelectedPill(pill);
        setTimeout(() => {
            const section = document.getElementById(`${pill}-section`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

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
                        <ChoiceSection onPillSelect={handlePillSelect} />
                    </div>
                )}

                {/* Render Selected Pill Section Below */}
                {selectedPill === 'aksi' && (
                    <div className="animate-fade-in-up">
                        <AksiSection onBack={() => {
                            const choice = document.getElementById('choice-section');
                            if (choice) choice.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => setSelectedPill(null), 500);
                        }} />
                    </div>
                )}
                
                {selectedPill === 'fact' && (
                    <div className="animate-fade-in-up">
                        <FactSection onBack={() => {
                            const choice = document.getElementById('choice-section');
                            if (choice) choice.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => setSelectedPill(null), 500);
                        }} />
                    </div>
                )}
            </main>
        </>
    );
}

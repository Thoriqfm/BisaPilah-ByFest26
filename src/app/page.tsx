"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../components/ui/SplashScreen";
import HeroSection from "../components/sections/HeroSection";
import GameSection from "../components/sections/GameSection";
import ChoiceSection from "../components/sections/ChoiceSection";
import AksiSection from "../components/sections/AksiSection";
import FactSection from "../components/sections/FactSection";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [hasGameFinishedOnce, setHasGameFinishedOnce] = useState(false);
    const [selectedPill, setSelectedPill] = useState<"aksi" | "fact" | null>(
        null,
    );

    useEffect(() => {
        if (isGameFinished) {
            setHasGameFinishedOnce(true);
        }
    }, [isGameFinished]);

    const handlePillSelect = (pill: "aksi" | "fact") => {
        setSelectedPill(pill);
        setTimeout(() => {
            const section = document.getElementById(`${pill}-section`);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <>
            {/* {!splashDone && ( */}
            <SplashScreen onComplete={() => setSplashDone(true)} />
            {/* )} */}

            <main className="overflow-x-hidden">
                <HeroSection isSplashDone={splashDone} />
                <GameSection onFinish={(status) => setIsGameFinished(status)} />

                {hasGameFinishedOnce && (
                    <div className="relative animate-fade-in transition-opacity duration-1000 flex flex-col -mt-1">
                        {/* Thin Transition Gradient from GameSection to ChoiceSection */}
                        <div className="w-full h-12 md:h-16 bg-gradient-to-b from-[#EBF4F9] to-[#071120]"></div>
                        <ChoiceSection onPillSelect={handlePillSelect} />
                    </div>
                )}

                {/* Render Selected Pill Section Below */}
                {selectedPill === "aksi" && (
                    <div className="animate-fade-in-up">
                        <AksiSection
                            onBack={() => {
                                const choice =
                                    document.getElementById("choice-section");
                                if (choice)
                                    choice.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                setTimeout(() => setSelectedPill(null), 500);
                            }}
                        />
                    </div>
                )}

                {selectedPill === "fact" && (
                    <div className="animate-fade-in-up">
                        <FactSection
                            onBack={() => {
                                const choice =
                                    document.getElementById("choice-section");
                                if (choice)
                                    choice.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                setTimeout(() => setSelectedPill(null), 500);
                            }}
                        />
                    </div>
                )}
            </main>
        </>
    );
}

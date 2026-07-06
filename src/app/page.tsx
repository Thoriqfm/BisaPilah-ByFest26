"use client";

import { useState } from "react";
import SplashScreen from "../components/ui/SplashScreen";
import HeroSection from "../components/sections/HeroSection";
import GameSection from "../components/sections/GameSection";
import ChoiceSection from "@/components/sections/ChoiceSection";
export default function Home() {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            {/* {!splashDone && ( */}
            <SplashScreen onComplete={() => setSplashDone(true)} />
            {/* )} */}

            <main className="overflow-x-hidden">
                <HeroSection />
                <GameSection />
                <ChoiceSection />
            </main>
        </>
    );
}

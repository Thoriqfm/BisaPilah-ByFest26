"use client";

import { useState } from "react";
import SplashScreen from "../components/Splash/SplashScreen";
import HeroSection from "../components/Hero/HeroSection";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            {/* {!splashDone && ( */}
            <SplashScreen onComplete={() => setSplashDone(true)} />
            {/* )} */}

            <main>
                <HeroSection />
                {/* Game section — nanti */}
                <section
                    id="game-section"
                    className="min-h-screen bg-white flex items-center justify-center"
                >
                    <p className="text-gray-400 text-xl">
                        Game section coming soon...
                    </p>
                </section>
            </main>
        </>
    );
}

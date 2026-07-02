"use client";

import { useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            {!splashDone && (
                <SplashScreen onComplete={() => setSplashDone(true)} />
            )}

            <main className="flex min-h-screen items-center justify-center">
                <p className="text-xl text-gray-600">
                    Home page coming soon...
                </p>
            </main>
        </>
    );
}

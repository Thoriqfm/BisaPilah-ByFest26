"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import Image from "next/image";

interface SplashScreenProps {
    onComplete: () => void;
}

const TRASH_ITEMS = [
    {
        id: "bahan-kimia",
        src: "/images/splash/bahan-kimia.svg",
        alt: "Bahan Kimia",
        positionClass: "left-[15%] top-[25%] md:left-[35%] md:top-[30%]",
    },
    { 
        id: "kresek", 
        src: "/images/splash/kresek.svg", 
        alt: "Kantong Kresek",
        positionClass: "left-[85%] top-[25%] md:left-[65%] md:top-[30%]",
    },
    { 
        id: "apel", 
        src: "/images/splash/apple.svg", 
        alt: "Sisa Apel",
        positionClass: "left-[15%] top-[50%] md:left-[30%] md:top-[55%]",
    },
    { 
        id: "telur", 
        src: "/images/splash/telor.svg", 
        alt: "Cangkang Telur",
        positionClass: "left-[85%] top-[50%] md:left-[70%] md:top-[55%]",
    },
    { 
        id: "ikan", 
        src: "/images/splash/ikan.svg", 
        alt: "Tulang Ikan",
        positionClass: "left-[50%] top-[12%] md:left-[50%] md:top-[15%]",
    },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const binRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const trashRefs = useRef<(HTMLDivElement | null)[]>([]);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        const container = containerRef.current;
        const bin = binRef.current;
        const lid = lidRef.current;
        const overlay = overlayRef.current;
        if (!container || !bin || !lid || !overlay) return;

        const trashEls = trashRefs.current.filter(Boolean) as HTMLDivElement[];
        if (trashEls.length === 0) return;

        animate(bin, { opacity: [0, 0], scale: [0, 0], duration: 0 });
        trashEls.forEach((el) => {
            animate(el, { opacity: [0, 0], scale: [0, 0], duration: 0 });
        });
        animate(overlay, { translateY: ["100%", "100%"], duration: 0 });

        const tl = createTimeline({ defaults: { ease: "outElastic(1, 0.6)" } });

        tl.add(
            bin,
            {
                opacity: [0, 1],
                scale: [0, 1],
                duration: 700,
            },
            300,
        );

        tl.add(
            trashEls,
            {
                opacity: [0, 1],
                scale: [0, 1],
                duration: 500,
                delay: stagger(120),
            },
            900,
        );

        tl.add(
            lid,
            {
                translateY: ["0%", "-55%"],
                duration: 460,
                ease: "outQuad",
            },
            1800,
        );

        trashEls.forEach((el, i) => {
            tl.add(
                el,
                {
                    duration: 800,
                    ease: "linear",
                    onBegin() {
                        const binRect = bin.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();

                        const targetX = binRect.left + binRect.width / 2;
                        const targetY = binRect.top + binRect.height * 0.25;

                        const dx = targetX - (elRect.left + elRect.width / 2);
                        const dy = targetY - (elRect.top + elRect.height / 2);
                        const dropDy = dy + (binRect.height * 0.4); 

                        const arcPeakY = Math.min(0, dy) - 120;

                        animate(el, {
                            keyframes: [
                                {
                                    translateX: 0,
                                    translateY: 0,
                                    scale: 1,
                                    rotate: 0,
                                    opacity: 1,
                                },
                                {
                                    translateX: dx * 0.6,
                                    translateY: arcPeakY,
                                    scale: 0.8,
                                    rotate: i % 2 === 0 ? 120 : -120,
                                    opacity: 1,
                                },
                                {
                                    translateX: dx,
                                    translateY: dy - 40,
                                    scale: 0.5,
                                    rotate: i % 2 === 0 ? 240 : -240,
                                    opacity: 1,
                                },
                                {
                                    translateX: dx,
                                    translateY: dropDy,
                                    scale: 0.1,
                                    rotate: i % 2 === 0 ? 360 : -360,
                                    opacity: 0,
                                },
                            ],
                            duration: 800,
                            ease: "easeInOutSine",
                        });
                    },
                },
                2100 + i * 200,
            );
        });

        const afterTrash = 2100 + trashEls.length * 200 + 500;

        tl.add(
            lid,
            {
                translateY: ["-55%", "0%"],
                duration: 500,
                ease: "outBounce",
            },
            afterTrash,
        );

        const afterShake = afterTrash + 500 + 100;
        tl.add(
            bin,
            {
                rotate: [0, -12, 12, -9, 9, -5, 5, -2, 2, 0],
                duration: 950,
                ease: "linear",
            },
            afterShake,
        );

        const afterShakeDone = afterShake + 900 + 100;
        tl.add(
            container,
            {
                translateY: ["0%", "-100%"],
                duration: 1000,
                ease: "inOutQuart",
                onComplete() {
                    onCompleteRef.current();
                },
            },
            afterShakeDone,
        );

        return () => {
            tl.pause();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ backgroundColor: "#65B354" }}
            aria-hidden="true"
        >
            {TRASH_ITEMS.map((item, i) => (
                <div
                    key={item.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 ${item.positionClass}`}
                >
                    <div
                        ref={(el) => {
                            trashRefs.current[i] = el;
                        }}
                        className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px]"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-contain"
                            draggable={false}
                            priority
                        />
                    </div>
                </div>
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    ref={binRef}
                    className="relative w-[130px] h-[238px] sm:w-[150px] sm:h-[275px] md:w-[180px] md:h-[330px]"
                    style={{
                        transformOrigin: "bottom center",
                    }}
                >
                    <div
                        className="absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[80%] h-[6%] rounded-full bg-black/20 blur-[4px] md:blur-md"
                    />
                    <Image
                        ref={lidRef}
                        src="/images/splash/tutup-tong.svg"
                        alt="Trash Bin Lid"
                        width={180}
                        height={98}
                        className="absolute left-0 w-full h-auto object-contain z-10"
                        style={{ top: "17%", marginLeft: "1%" }}
                        draggable={false}
                        priority
                    />
                    <Image
                        src="/images/splash/body-tong.svg"
                        alt="Trash Bin Body"
                        width={180}
                        height={251}
                        className="absolute left-0 bottom-0 w-full h-auto object-contain z-0"
                        draggable={false}
                        priority
                    />
                </div>
            </div>
            <div
                ref={overlayRef}
                className="absolute inset-0 z-40"
                style={{ backgroundColor: "#65B354" }}
            />
        </div>
    );
}

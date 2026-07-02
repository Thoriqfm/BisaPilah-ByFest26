"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import Image from "next/image";
import { after } from "node:test";

interface SplashScreenProps {
    onComplete: () => void;
}

const TRASH_ITEMS = [
    {
        id: "bahan-kimia",
        src: "/images/splash/bahan-kimia.svg",
        alt: "Bahan Kimia",
    },
    { id: "kresek", src: "/images/splash/kresek.svg", alt: "Kantong Kresek" },
    { id: "apel", src: "/images/splash/apple.svg", alt: "Sisa Apel" },
    { id: "telur", src: "/images/splash/telor.svg", alt: "Cangkang Telur" },
    { id: "ikan", src: "/images/splash/ikan.svg", alt: "Tulang Ikan" },
];

function randomPos() {
    const positions = [
        { x: "12%", y: "15%" },
        { x: "75%", y: "12%" },
        { x: "8%", y: "60%" },
        { x: "80%", y: "58%" },
        { x: "20%", y: "75%" },
    ];
    return positions;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const binRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const trashRefs = useRef<(HTMLDivElement | null)[]>([]);
    const positions = randomPos();

    useEffect(() => {
        const container = containerRef.current;
        const bin = binRef.current;
        const lid = lidRef.current;
        const overlay = overlayRef.current;
        if (!container || !bin || !lid || !overlay) return;

        const trashEls = trashRefs.current.filter(Boolean) as HTMLDivElement[];
        if (trashEls.length === 0) return;

        // Initial state
        // All elements start invisible
        animate(bin, { opacity: [0, 0], scale: [0, 0], duration: 0 });
        trashEls.forEach((el) => {
            animate(el, { opacity: [0, 0], scale: [0, 0], duration: 0 });
        });
        animate(overlay, { translateY: ["100%", "100%"], duration: 0 });

        const tl = createTimeline({ defaults: { ease: "outElastic(1, 0.6)" } });

        // Bin body pops in
        tl.add(
            bin,
            {
                opacity: [0, 1],
                scale: [0, 1],
                duration: 700,
            },
            300,
        );

        // Trash items pop in with stagger
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

        // Lid lifts up
        tl.add(
            lid,
            {
                translateY: [0, -28],
                duration: 400,
                ease: "outQuad",
            },
            1800,
        );

        // Trash items fly into bin
        // Get bin center after render
        trashEls.forEach((el, i) => {
            tl.add(
                el,
                {
                    opacity: [1, 0],
                    scale: [1, 0.1],
                    duration: 450,
                    ease: "inQuad",
                    onBegin() {
                        const binRect = bin.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const dx =
                            binRect.left +
                            binRect.width / 2 -
                            (elRect.left + elRect.width / 2);
                        const dy =
                            binRect.top +
                            binRect.height / 2 -
                            (elRect.top + elRect.height / 2);
                        animate(el, {
                            translateX: dx,
                            translateY: dy,
                            opacity: [1, 0],
                            scale: [1, 0.1],
                            duration: 450,
                            ease: "inQuad",
                        });
                    },
                },
                2100 + i * 160,
            );
        });

        // Lid closes
        tl.add(
            lid,
            {
                translateY: [-28, 0],
                duration: 350,
                ease: "outBounce",
            },
            2100 + trashEls.length * 160 + 100,
        );

        // Bin shakes
        const afterShake = 2100 + trashEls.length * 160 + 100 + 350 + 100;
        tl.add(
            bin,
            {
                translateX: [0, -8, 8, -6, 6, -4, 4, 0],
                duration: 500,
                ease: "linear",
            },
            afterShake,
        );

        // Green overlay wipes up to cover page
        const afterShakeDone = afterShake + 500 + 200;
        tl.add(
            overlay,
            {
                translateY: ["100%", "0%"],
                duration: 600,
                ease: "inOutQuart",
                onComplete() {
                    onComplete();
                },
            },
            afterShakeDone,
        );

        return () => {
            tl.cancel?.();
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ backgroundColor: "#BAD197" }}
            aria-hidden="true"
        >
            {/* Trash items */}
            {TRASH_ITEMS.map((item, i) => (
                <div
                    key={item.id}
                    ref={(el) => {
                        trashRefs.current[i] = el;
                    }}
                    className="absolute"
                    style={{
                        left: positions[i].x,
                        top: positions[i].y,
                        width: 90,
                        height: 90,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        draggable={false}
                    />
                </div>
            ))}

            {/* Trash bin */}
            <div
                ref={binRef}
                className="absolute"
                style={{
                    left: "50%",
                    top: "54%",
                    transform: "translate(-50%, -50%)",
                    width: 180,
                }}
            >
                {/* Lid - separate image */}
                <Image
                    ref={lidRef}
                    src="/images/splash/tutup-tong.svg"
                    alt="Trash Bin Lid"
                    width={180}
                    height={60}
                    className="relative z-10 w-full object-contain"
                    style={{ display: "block" }}
                    draggable={false}
                />
                {/* Body */}
                <Image
                    src="/images/splash/body-tong.svg"
                    alt="Trash Bin Body"
                    width={180}
                    height={160}
                    className="relative z-0 w-full object-contain"
                    style={{ display: "block", marginTop: -4 }}
                    draggable={false}
                />
            </div>
            {/* Wipe overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-40"
                style={{ backgroundColor: "#BAD197" }}
            />
        </div>
    );
}

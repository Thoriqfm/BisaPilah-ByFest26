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
    },
    { id: "kresek", src: "/images/splash/kresek.svg", alt: "Kantong Kresek" },
    { id: "apel", src: "/images/splash/apple.svg", alt: "Sisa Apel" },
    { id: "telur", src: "/images/splash/telor.svg", alt: "Cangkang Telur" },
    { id: "ikan", src: "/images/splash/ikan.svg", alt: "Tulang Ikan" },
];

function randomPos() {
    const positions = [
        { x: "35%", y: "30%" },
        { x: "65%", y: "30%" },
        { x: "30%", y: "55%" },
        { x: "70%", y: "55%" },
        { x: "50%", y: "15%" },
    ];
    return positions;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const binRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const trashRefs = useRef<(HTMLDivElement | null)[]>([]);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;
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
                duration: 800,
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
                translateY: [0, -54],
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
                    duration: 600,
                    ease: "inOutQuad",
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
                        const arcHeight = 60;
                        const midX = dx * 0.5 + (i % 2 === 0 ? -20 : 20);

                        animate(el, {
                            keyframes: [
                                {
                                    translateX: 0,
                                    translateY: 0,
                                    scale: 1,
                                    opacity: 1,
                                },
                                {
                                    translateX: midX,
                                    translateY: dy - arcHeight,
                                    scale: 0.6,
                                    opacity: 1,
                                },
                                {
                                    translateX: dx,
                                    translateY: dy,
                                    scale: 0.1,
                                    opacity: 0,
                                },
                            ],
                            duration: 600,
                            ease: "inOutQuad",
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
                translateY: [-50, 0],
                duration: 500,
                ease: "outBounce",
            },
            2100 + trashEls.length * 160 + 100,
        );

        // Bin shakes (bottle-shake: rotate around base)
        const afterShake = 2100 + trashEls.length * 160 + 100 + 350 + 100;
        tl.add(
            bin,
            {
                rotate: [0, -12, 12, -9, 9, -5, 5, -2, 2, 0],
                duration: 900,
                ease: "linear",
            },
            afterShake,
        );

        // Green overlay wipes up to cover page
        const afterShakeDone = afterShake + 700 + 200;
        tl.add(
            container,
            {
                translateY: ["0%", "-100%"],
                duration: 1200,
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
                    top: "50%",
                    marginLeft: -90,
                    marginTop: -165,
                    width: 180,
                    height: 330,
                    transformOrigin: "bottom center",
                }}
            >
                {/* Ground shadow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 150,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        filter: "blur(6px)",
                    }}
                />
                {/* Lid - separate image */}
                <Image
                    ref={lidRef}
                    src="/images/splash/tutup-tong.svg"
                    alt="Trash Bin Lid"
                    width={180}
                    height={98}
                    className="absolute left-0 w-full object-contain z-10"
                    style={{ top: 56, marginLeft: 1 }}
                    draggable={false}
                />
                {/* Body */}
                <Image
                    src="/images/splash/body-tong.svg"
                    alt="Trash Bin Body"
                    width={180}
                    height={251}
                    className="absolute left-0 w-full object-contain z-0"
                    style={{ bottom: 0 }}
                    draggable={false}
                />
            </div>
            {/* Wipe overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-40"
                style={{ backgroundColor: "#65B354" }}
            />
        </div>
    );
}

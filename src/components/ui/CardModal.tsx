"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    titleColor?: string;
    content: React.ReactNode;
    imageSrc: any;
    imageAlt: string;
}

export default function CardModal({ isOpen, onClose, title, titleColor = "#00A3FF", content, imageSrc, imageAlt }: CardModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Prevent scrolling when modal is open and trigger animation
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            
            // Pop-up animation with Anime.js
            if (modalRef.current) {
                animate(modalRef.current, {
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    ease: "outElastic(1, .6)"
                });
            }
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            {/* Modal Container */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-5xl bg-[#0D2141] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[80vh] overflow-y-auto" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xl transition-colors"
                >
                    X
                </button>
                
                {/* Text Content */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <h2 
                        className="text-2xl md:text-3xl font-bold mb-4" 
                        style={{ fontFamily: "'Afacad', sans-serif", color: titleColor }}
                    >
                        {title}
                    </h2>
                    <div 
                        className="text-white text-base md:text-lg leading-relaxed space-y-4"
                        style={{ fontFamily: "'Afacad', sans-serif" }}
                    >
                        {content}
                    </div>
                </div>

                {/* Image / Illustration */}
                <div className="w-full md:w-2/5 p-8 md:p-12 bg-[#09172E]/50 flex items-center justify-center">
                    <Image 
                        src={imageSrc} 
                        alt={imageAlt} 
                        className="w-full h-auto max-h-[300px] object-contain drop-shadow-2xl" 
                    />
                </div>
            </div>

            {/* Click outside to close */}
            <div className="absolute inset-0 z-[-1]" onClick={onClose} />
        </div>
    );
}

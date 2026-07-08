"use client";

import Image from "next/image";
import { useState } from "react";
import pilMerahIcon from "../../../public/images/section/pills/pil-merah-icon.svg";
import faktaLiterasi from "../../../public/images/section/pills/fakta-literasi.svg";
import faktaFoodWaste from "../../../public/images/section/pills/fakta-food-waste.svg";
import faktaB3 from "../../../public/images/section/pills/fakta-b3.svg";
import CardModal from "../ui/CardModal";

export default function FactSection({ onBack }: { onBack?: () => void }) {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const cardsData = [
        {
            title: "Fakta \"Darurat Literasi & Apatis\"",
            imageSrc: faktaLiterasi,
            shortDesc: "Mayoritas dari kita tahu buang sampah itu penting, tapi banyak yang memilih untuk tidak peduli",
            fullDesc: (
                <p>
                    Mayoritas dari kita bukannya tidak bisa, tapi memilih untuk tidak peduli. 
                    Berdasarkan laporan Statistik Perumahan dan Permukiman BPS (2022), nyaris 
                    80% rumah tangga di Indonesia tidak memilah sampah. Yang lebih memprihatinkan, dari angka tersebut, 
                    sebanyak 39,92% masyarakat sebenarnya TAHU cara memisahkan sampah, tetapi sengaja TIDAK MELAKUKANNYA karena 
                    alasan "terlalu repot". Sementara 39,87% lainnya benar-benar tidak memiliki 
                    pengetahuan dasar (literasi) sama sekali tentang mana yang organik dan anorganik. Kita darurat edukasi dan krisis empati lingkungan.
                </p>
            )
        },
        {
            title: "Fakta Food Waste",
            imageSrc: faktaFoodWaste,
            shortDesc: "Indonesia adalah negara pembuang makanan terbesar ke-2 di dunia.",
            fullDesc: (
                <p>
                    Indonesia adalah negara pembuang sisa makanan (Food Waste) terbesar ke-2 di dunia setelah Arab Saudi. 
                    Setiap tahunnya, kita membuang jutaan ton nasi, sayur, dan lauk ke tong sampah, yang ujung-ujungnya menumpuk di 
                    Tempat Pembuangan Akhir (TPA). Saat sisa makanan ini terperangkap di dalam plastik dan membusuk tanpa oksigen, 
                    ia menghasilkan Gas Metana—gas rumah kaca yang 25 kali lebih merusak lapisan ozon daripada CO2. Tragisnya, kita 
                    membuang makanan ini di saat jutaan anak di pelosok negeri masih mengalami kelaparan dan stunting.
                </p>
            )
        },
        {
            title: "Fakta Bunuh Diri Ekologis (Jejak Beracun)",
            imageSrc: faktaB3,
            shortDesc: "Limbah B3 yang kita buang sembarangan mengancam air, tanah, dan generasi mendatang",
            fullDesc: (
                <p>
                    Setiap hari, kita dengan santainya membuang sampah elektronik, baterai bekas, lampu rusak, dan obat kedaluwarsa 
                    (Limbah B3) ke tanah kosong atau mencampurnya ke tong sampah biasa. Tahukah Anda? Zat kimia berat dari satu baterai kecil yang bocor dapat 
                    mencemari dan meracuni ratusan liter air tanah. Air tanah yang sama itulah yang akhirnya dipompa, direbus, dan diminum oleh 
                    keluarga kita sendiri. Tanpa sadar, kita sedang meracuni diri sendiri dan generasi mendatang secara perlahan.
                </p>
            )
        }
    ];

    return (
        <section id="fact-section" className="w-full bg-[#071120] text-white py-16 px-4 md:px-8 lg:px-16 flex flex-col items-center">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-4xl mb-16 animate-fade-in">
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 flex-wrap">
                    <h2 
                        className="text-5xl md:text-[6.5rem] font-black text-[#F03724]"
                        style={{ fontFamily: '"Moon Get", sans-serif' }}
                    >
                        Pil Merah
                    </h2>
                    <Image src={pilMerahIcon} alt="Pil Merah" className="w-16 md:w-28 h-auto drop-shadow-[0_0_15px_rgba(240,55,36,0.4)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#F03724]" style={{ fontFamily: "'Afacad', sans-serif" }}>
                    Selamat Datang di Dunia Nyata
                </h3>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl" style={{ fontFamily: "'Afacad', sans-serif" }}>
                    Ini adalah kenyataan pahit tentang krisis literasi sampah di Indonesia.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] w-full mb-16 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                {cardsData.map((card, index) => (
                    <div key={index} className="bg-[#0D2141] rounded-[2rem] p-8 flex flex-col items-center text-center hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(240,55,36,0.2)] transition-all duration-300 shadow-xl border border-white/5 cursor-pointer" onClick={() => setSelectedCard(index)}>
                        <div className="h-48 flex items-center justify-center mb-6 w-full">
                            <Image 
                                src={card.imageSrc} 
                                alt={card.title} 
                                className={`w-auto object-contain ${index === 0 ? 'max-h-36 md:max-h-40' : 'max-h-full'}`} 
                            />
                        </div>
                        <h4 className="text-[#F03724] text-2xl md:text-3xl font-bold mb-3 min-h-[4rem] md:min-h-[5.5rem] flex items-center justify-center" style={{ fontFamily: "'Afacad', sans-serif" }}>{card.title.split("(")[0].replace(/"/g, "")}</h4>
                        <p className="text-base md:text-lg text-gray-200 mb-8 min-h-[4.5rem] md:min-h-[6.5rem] flex items-center justify-center" style={{ fontFamily: "'Afacad', sans-serif", lineHeight: "1.6" }}>
                            {card.shortDesc}
                        </p>
                        <button 
                            onClick={() => setSelectedCard(index)}
                            className="text-gray-350 hover:text-[#F03724] transition-colors text-base md:text-lg font-semibold flex items-center gap-2 mt-auto"
                        >
                            Lihat Selengkapnya <span>→</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button 
                onClick={() => {
                    if (onBack) {
                        onBack();
                    } else {
                        const choiceSection = document.getElementById('choice-section');
                        if (choiceSection) choiceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="bg-[#F03724] hover:bg-[#D9301F] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-[0_0_15px_rgba(240,55,36,0.4)] animate-fade-in-up mb-8"
                style={{ fontFamily: "'Afacad', sans-serif", animationDelay: '300ms' }}
            >
                Selesai Baca, Kembali Memilih
            </button>

            {/* Modals */}
            {cardsData.map((card, index) => (
                <CardModal
                    key={`modal-${index}`}
                    isOpen={selectedCard === index}
                    onClose={() => setSelectedCard(null)}
                    title={card.title}
                    titleColor="#F03724"
                    content={card.fullDesc}
                    imageSrc={card.imageSrc}
                    imageAlt={card.title}
                />
            ))}
        </section>
    );
}

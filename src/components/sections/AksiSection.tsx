"use client";

import Image from "next/image";
import { useState } from "react";
import pilBiruIcon from "../../../public/images/section/pills/pil-biru-icon.svg";
import aturanDuaTong from "../../../public/images/section/pills/aturan-dua-tong.svg";
import sedekahSampah from "../../../public/images/section/pills/sedekah-sampah.svg";
import karantinaB3 from "../../../public/images/section/pills/karantina-b3.svg";
import CardModal from "../ui/CardModal";

export default function AksiSection({ onBack }: { onBack?: () => void }) {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const cardsData = [
        {
            title: "Aksi Level 1: Aturan Dua Tong (Pisahkan Basah & Kering)",
            imageSrc: aturanDuaTong,
            shortDesc: "Pisahkan sampah organik dan anorganik untuk membantu daur ulang dan mengurangi sampah ke TPA",
            fullDesc: (
                <p>
                    Anda tidak perlu membeli 5 tong sampah warna-warni seperti di luar negeri. 
                    Cukup mulai dengan 2 wadah di rumah. Satu tong khusus berpenutup untuk sisa makanan (organik/basah) 
                    agar tidak mengundang lalat, dan satu kardus/kresek besar khusus untuk bungkus plastik, kertas, 
                    dan botol (anorganik/kering). Pemisahan sederhana ini mencegah plastik menjadi kotor dan bau, 
                    sehingga 100% bisa didaur ulang. Ini saja sudah sangat membantu meringankan beban petugas kebersihan!
                </p>
            )
        },
        {
            title: "Aksi Level 2: \"Sedekah Sampah\" untuk Ekonomi Sirkular",
            imageSrc: sedekahSampah,
            shortDesc: "Sampah anorganik yang kamu kumpulkan bisa menjadi berkah bagi pemulung dan bank sampah",
            fullDesc: (
                <p>
                    Sampah anorganik Anda (kardus paket, botol minum, kaleng soda) bukanlah "sampah", 
                    melainkan "uang" bagi para pemulung dan bank sampah. Daripada membuangnya ke TPA 
                    dan menjadi polusi abadi, kumpulkan barang-barang kering tersebut di satu sudut rumah. 
                    Setelah terkumpul banyak, berikan langsung kepada pengepul barang bekas atau 
                    daftarkan ke Bank Sampah terdekat. Anda baru saja melakukan sedekah lingkungan 
                    sekaligus menghidupkan roda ekonomi rakyat kecil.
                </p>
            )
        },
        {
            title: "Aksi Level 3: Karantina Si Beracun (Penanganan B3)",
            imageSrc: karantinaB3,
            shortDesc: "Simpan dan buang limbah berbahaya (B3) pada tempat khusus agar tidak mencemari lingkungan",
            fullDesc: (
                <p>
                    Baterai bekas, lampu mati, sisa cairan pembersih lantai, atau obat kedaluwarsa HARAM hukumnya dibuang ke tong sampah biasa. 
                    Siapkan satu toples plastik transparan bekas (misal bekas sosis atau kue), beri label besar bertuliskan 
                    "BAHAYA/B3", dan masukkan semua limbah beracun ke sana. Simpan toples ini di tempat yang aman dari jangkauan anak-anak. 
                    Serahkan limbah ini saat ada program pengumpulan sampah elektronik (e-waste) di kota Anda atau drop-box khusus di fasilitas publik/puskesmas.
                </p>
            )
        }
    ];

    return (
        <section id="aksi-section" className="w-full bg-[#071120] text-white py-16 px-4 md:px-8 lg:px-16 flex flex-col items-center">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-4xl mb-16 animate-fade-in">
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 flex-wrap">
                    <h2 
                        className="text-5xl md:text-[6.5rem] font-black text-[#00A3FF]"
                        style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
                    >
                        Pil Biru
                    </h2>
                    <Image src={pilBiruIcon} alt="Pil Biru" className="w-16 md:w-28 h-auto drop-shadow-[0_0_15px_rgba(0,163,255,0.4)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#00A3FF]" style={{ fontFamily: "'Afacad', sans-serif" }}>
                    Ambil Kendali Mulai Hari Ini
                </h3>
                <p className="text-sm md:text-base text-gray-300 max-w-2xl" style={{ fontFamily: "'Afacad', sans-serif" }}>
                    Anda tidak perlu mengubah dunia dalam semalam. Cukup lakukan hal kecil di dalam rumah dengan langkah ini
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] w-full mb-16 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                {cardsData.map((card, index) => (
                    <div key={index} className="bg-[#0D2141] rounded-[2rem] p-8 flex flex-col items-center text-center hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,163,255,0.2)] transition-all duration-300 shadow-xl border border-white/5 cursor-pointer" onClick={() => setSelectedCard(index)}>
                        <div className="h-48 flex items-center justify-center mb-6 w-full">
                            <Image src={card.imageSrc} alt={card.title} className="max-h-full w-auto object-contain" />
                        </div>
                        <h4 className="text-[#00A3FF] text-xl font-bold mb-3" style={{ fontFamily: "'Afacad', sans-serif" }}>{card.title.split(":")[1]?.trim() || card.title}</h4>
                        <p className="text-sm text-gray-300 flex-grow mb-8" style={{ fontFamily: "'Afacad', sans-serif", lineHeight: "1.6" }}>
                            {card.shortDesc}
                        </p>
                        <button 
                            onClick={() => setSelectedCard(index)}
                            className="text-gray-400 hover:text-[#00A3FF] transition-colors text-sm font-semibold flex items-center gap-2 mt-auto"
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
                className="bg-[#00A3FF] hover:bg-[#0082CC] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-[0_0_15px_rgba(0,163,255,0.4)] animate-fade-in-up mb-8"
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
                    titleColor="#00A3FF"
                    content={card.fullDesc}
                    imageSrc={card.imageSrc}
                    imageAlt={card.title}
                />
            ))}
        </section>
    );
}

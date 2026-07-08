"use client";

import { useEffect, useState } from "react";
import ChoiceSection from "../../components/sections/ChoiceSection";

export default function ChoiceTestPage() {
  const [info, setInfo] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      const sec = document.getElementById("choice-section");
      const rects: string[] = [];
      rects.push(`viewport=${window.innerWidth}x${window.innerHeight}`);
      if (sec) {
        const r = sec.getBoundingClientRect();
        rects.push(`section L${Math.round(r.left)} W${Math.round(r.width)}`);
      }
      document.querySelectorAll("h2,h3").forEach((el) => {
        const r = el.getBoundingClientRect();
        rects.push(
          `${el.textContent}: L${Math.round(r.left)} R${Math.round(r.right)}`
        );
      });
      setInfo(rects.join(" | "));
    }, 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <main className="overflow-x-hidden">
      <ChoiceSection />
      <div className="fixed top-0 left-0 z-[999] bg-black/80 text-white text-[10px] p-1 max-w-full">
        {info}
      </div>
    </main>
  );
}

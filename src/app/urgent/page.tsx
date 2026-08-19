import type { Metadata } from "next";
import SiteHeader from "@/components/sites/tutu-ru/root/SiteHeader";
import UrgentTravel from "@/components/sites/tutu-ru/root/UrgentTravel";
import UrgentTravelFaq from "@/components/sites/tutu-ru/root/UrgentTravelFaq";
import FloatingBadge from "@/components/sites/tutu-ru/root/FloatingBadge";

export const metadata: Metadata = {
  title: "План «Б» — Tutu.ru",
  description: "Сравните все виды транспорта и найдите способ успеть точно к сроку.",
};

export default function SrochnoDobratsyaPage() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <SiteHeader />
      <main className="flex-1">
        <UrgentTravel />
        <UrgentTravelFaq />
      </main>
      <FloatingBadge />
    </div>
  );
}

import SiteHeader from "@/components/sites/tutu-ru/root/SiteHeader";
import HeroSearch from "@/components/sites/tutu-ru/root/HeroSearch";
import PromoDuo from "@/components/sites/tutu-ru/root/PromoDuo";
import DealsCarousel from "@/components/sites/tutu-ru/root/DealsCarousel";
import HotelsCarousel from "@/components/sites/tutu-ru/root/HotelsCarousel";
import TrainWeekendCarousel from "@/components/sites/tutu-ru/root/TrainWeekendCarousel";
import SeaBanner from "@/components/sites/tutu-ru/root/SeaBanner";
import FloatingBadge from "@/components/sites/tutu-ru/root/FloatingBadge";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <SiteHeader />
      <HeroSearch />
      <main className="flex-1">
        <PromoDuo />
        <DealsCarousel />
        <HotelsCarousel />
        <TrainWeekendCarousel />
        <SeaBanner />
      </main>
      <FloatingBadge />
    </div>
  );
}

import { PillTabs } from "@/components/sites/tutu-ru/shared/PillTabs";
import { CarouselRow } from "@/components/sites/tutu-ru/shared/CarouselRow";

const deals = [
  {
    img: "/sites/tutu-ru/root/images/deal-baku.webp",
    price: "15 196",
    oldPrice: "22 104",
    discount: "-31%",
    route: "Москва — Баку",
    dateTime: "18 сентября, 09:50 – 14:05",
    durationStops: "3ч 15м · прямой",
  },
  {
    img: "/sites/tutu-ru/root/images/deal-sochi.jpg",
    price: "14 315",
    oldPrice: "18 381",
    discount: "-22%",
    route: "Новосибирск — Сочи",
    dateTime: "15 сентября, 05:35 – 06:50",
    durationStops: "5ч 15м · прямой",
  },
  {
    img: "/sites/tutu-ru/root/images/deal-sochi.jpg",
    price: "10 430",
    oldPrice: "11 430",
    discount: "-8%",
    route: "Москва — Сочи",
    dateTime: "1 октября, 16:50 – 20:35",
    durationStops: "3ч 45м · прямой",
  },
  {
    img: "/sites/tutu-ru/root/images/deal-sochi.jpg",
    price: "10 746",
    oldPrice: "11 235",
    discount: "-4%",
    route: "Санкт-Петербург — Сочи",
    dateTime: "22 сентября, 08:50 – 13:15",
    durationStops: "4ч 25м · прямой",
  },
];

export default function DealsCarousel() {
  return (
    <section className="max-w-[1336px] mx-auto px-6 my-8">
      <div
        className="relative overflow-hidden rounded-[24px] p-8"
        style={{ background: "linear-gradient(90deg, #FC5D2C 25%, #FFB118)" }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-white text-[32px] font-semibold">Это выгодно!</h2>
            <p className="text-white/90 text-sm mt-1 max-w-md">
              Цены ниже средних за последние 10 дней. Обновляем постоянно, заглядывайте чаще
            </p>
          </div>
          <button className="rounded-full bg-white text-tutu-text font-semibold text-sm px-4 py-2 flex items-center gap-1 hover:bg-white/90 shrink-0">
            Все билеты →
          </button>
        </div>

        <PillTabs tabs={["Все", "Самолёты", "Поезда"]} defaultTab="Все" className="mt-5" />

        <CarouselRow className="mt-5">
          {deals.map((deal) => (
            <div
              key={deal.route + deal.dateTime}
              className="snap-start shrink-0 w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <img className="h-36 w-full object-cover" src={deal.img} alt={deal.route} />
              <div className="p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-bold text-tutu-text">{deal.price} ₽</span>
                  <span className="text-sm text-tutu-muted line-through">{deal.oldPrice} ₽</span>
                  <span className="bg-[#FFE5DC] text-[#FC5D2C] text-xs font-bold rounded-full px-2 py-0.5">
                    {deal.discount}
                  </span>
                </div>
                <p className="font-semibold mt-1 text-tutu-text">{deal.route}</p>
                <div className="flex items-center gap-1.5 text-xs text-tutu-muted mt-2">
                  <span className="h-4 w-4 rounded-full bg-blue-600 inline-block" />
                  {deal.dateTime}
                </div>
                <p className="text-xs text-tutu-muted mt-0.5">{deal.durationStops}</p>
              </div>
            </div>
          ))}
        </CarouselRow>
      </div>
    </section>
  );
}

import { PillTabs } from "@/components/sites/tutu-ru/shared/PillTabs";
import { CarouselRow } from "@/components/sites/tutu-ru/shared/CarouselRow";

const cards = [
  {
    img: "/sites/tutu-ru/root/images/city-spb.webp",
    route: "Москва — Санкт-Петербург",
    duration: "от 5 ч 20 м в пути",
    price: "2 281",
  },
  {
    img: "/sites/tutu-ru/root/images/city-nnov.webp",
    route: "Москва — Нижний Новгород",
    duration: "от 3 ч 48 м в пути",
    price: "2 832",
  },
  {
    img: "/sites/tutu-ru/root/images/city-yaroslavl.webp",
    route: "Москва — Ярославль",
    duration: "от 3 ч 24 м в пути",
    price: "1 181",
  },
  {
    img: "/sites/tutu-ru/root/images/city-ryazan.webp",
    route: "Москва — Рязань",
    duration: "от 2 ч 5 м в пути",
    price: "1 723",
  },
];

export default function TrainWeekendCarousel() {
  return (
    <section className="max-w-[1336px] mx-auto px-6 my-8">
      <div
        className="relative overflow-hidden rounded-[24px] p-8"
        style={{
          background:
            "linear-gradient(135deg, #8A3FF0 0%, #C23FD6 50%, #EF5AA8 100%)",
        }}
      >
        <h2 className="text-white text-[32px] font-semibold">
          Развеяться на выходных на поезде
        </h2>
        <PillTabs
          tabs={["из Москвы", "из Санкт-Петербурга", "из Казани"]}
          defaultTab="из Москвы"
          variant="dark"
          className="mt-5"
        />
        <CarouselRow className="mt-5">
          {cards.map((card) => (
            <div
              key={card.route}
              className="snap-start shrink-0 w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                className="h-40 w-full object-cover"
                src={card.img}
                alt={card.route}
              />
              <div className="p-4">
                <p className="font-semibold text-tutu-text">{card.route}</p>
                <p className="text-xs text-tutu-muted mt-1">
                  {card.duration}
                </p>
                <p className="text-lg font-bold mt-2 text-tutu-text">
                  от {card.price} ₽
                </p>
              </div>
            </div>
          ))}
        </CarouselRow>
      </div>
    </section>
  );
}

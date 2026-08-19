import { CarouselRow } from "@/components/sites/tutu-ru/shared/CarouselRow";

type HotelCard = {
  img: string;
  rating: string;
  starsAndCity: string;
  hotelName: string;
  price: string;
  discount: string;
  oldPrice: string;
};

const hotels: HotelCard[] = [
  {
    img: "/sites/tutu-ru/root/images/hotel-food-city.jpg",
    rating: "7.7",
    starsAndCity: "4★ Москва",
    hotelName: "Отель Фуд Сити",
    price: "4 646",
    discount: "-10%",
    oldPrice: "5 162",
  },
  {
    img: "/sites/tutu-ru/root/images/hotel-apartstel.jpg",
    rating: "9.4",
    starsAndCity: "3★ Санкт-Петербург",
    hotelName: "Отель ApartStel/АпартСтель",
    price: "4 417",
    discount: "-10%",
    oldPrice: "4 908",
  },
  {
    img: "/sites/tutu-ru/root/images/hotel-gavan.jpg",
    rating: "8.7",
    starsAndCity: "4★ Казань",
    hotelName: "Мини-отель Гавань",
    price: "6 745",
    discount: "-14%",
    oldPrice: "7 843",
  },
  {
    img: "/sites/tutu-ru/root/images/hotel-ayti.jpg",
    rating: "9.0",
    starsAndCity: "3★ Москва",
    hotelName: "Отель АйТи",
    price: "6 066",
    discount: "-10%",
    oldPrice: "6 740",
  },
  {
    img: "/sites/tutu-ru/root/images/hotel-cronwell.jpg",
    rating: "9.2",
    starsAndCity: "4★ Санкт-Петербург",
    hotelName: "Отель Cronwell Inn Стремянная",
    price: "9 146",
    discount: "-10%",
    oldPrice: "10 162",
  },
  {
    img: "/sites/tutu-ru/root/images/hotel-hostel.jpg",
    rating: "8.4",
    starsAndCity: "3★ Москва",
    hotelName: "Хостел",
    price: "3 664",
    discount: "-10%",
    oldPrice: "4 071",
  },
];

export default function HotelsCarousel() {
  return (
    <section className="max-w-[1336px] mx-auto px-6 my-10">
      <h2 className="text-[32px] font-semibold text-tutu-text">
        Отели по суперцене
      </h2>
      <p className="text-tutu-muted text-sm mt-1">
        Классные варианты с выгодой — специально для вас
      </p>
      <CarouselRow className="mt-5">
        {hotels.map((hotel) => (
          <div key={hotel.hotelName} className="snap-start shrink-0 w-[220px]">
            <div className="relative rounded-2xl overflow-hidden h-[160px]">
              <img
                className="h-full w-full object-cover"
                src={hotel.img}
                alt={hotel.hotelName}
              />
              <span className="absolute top-2 left-2 bg-[#2E7D32] text-white text-xs font-bold rounded-md px-1.5 py-0.5">
                {hotel.rating}
              </span>
            </div>
            <div className="mt-2">
              <p className="flex items-center gap-1 text-xs text-tutu-muted">
                ★ {hotel.starsAndCity} · 26 авг - 27 авг · 2 гостя
              </p>
              <p className="font-semibold text-sm mt-1 text-tutu-text truncate">
                {hotel.hotelName}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="font-bold text-tutu-text">
                  {hotel.price} ₽
                </span>
                <span className="bg-[#E9E4FF] text-tutu-primary text-xs font-bold rounded-full px-1.5 py-0.5">
                  {hotel.discount}
                </span>
                <span className="text-xs text-tutu-muted line-through">
                  {hotel.oldPrice} ₽
                </span>
              </div>
            </div>
          </div>
        ))}
      </CarouselRow>
    </section>
  );
}

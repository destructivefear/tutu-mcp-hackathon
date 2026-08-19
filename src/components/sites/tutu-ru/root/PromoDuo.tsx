export default function PromoDuo() {
  return (
    <section className="max-w-[1336px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-tutu-surface rounded-2xl p-8 flex flex-col justify-center gap-3">
          <h3 className="text-xl font-semibold text-tutu-text">
            Скидка 20% на жильё в Калининграде и Сухуме
          </h3>
          <p className="text-sm text-tutu-muted">Бронируйте по промокоду WOW-3</p>
          <button className="self-start rounded-[10px] bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold text-sm px-5 py-2.5 mt-2">
            Забронировать
          </button>
        </div>
        <div
          className="relative rounded-2xl overflow-hidden bg-cover bg-center aspect-[2624/711] lg:aspect-auto lg:min-h-[220px]"
          style={{ backgroundImage: "url(/sites/tutu-ru/root/images/promo-happy-weeks.webp)" }}
          role="img"
          aria-label="Счастливые недели — скидка 20% на жильё"
        />
      </div>
    </section>
  );
}

export default function SeaBanner() {
  return (
    <section className="max-w-[1336px] mx-auto px-6 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch rounded-2xl overflow-hidden bg-tutu-surface">
        <div className="flex flex-col justify-center gap-3 p-8">
          <h3 className="text-2xl font-semibold text-tutu-text">Море + скидки до 25%</h3>
          <p className="text-sm text-tutu-muted">Отдыхайте за границей выгодно и без визы</p>
          <button className="self-start rounded-[10px] bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold text-sm px-5 py-2.5 mt-2">
            Найти билеты
          </button>
        </div>
        <div
          className="aspect-[1749/474] bg-cover bg-center lg:aspect-auto lg:min-h-[200px]"
          style={{ backgroundImage: "url(/sites/tutu-ru/root/images/banner-sea-discount.webp)" }}
        />
      </div>
    </section>
  );
}

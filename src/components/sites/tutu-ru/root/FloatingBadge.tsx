export default function FloatingBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <button
        type="button"
        aria-label="Турбоскидки"
        className="block h-[88px] w-[88px] hover:scale-105 transition-transform cursor-pointer"
      >
        <img
          src="/sites/tutu-ru/root/images/turbo-badge.webp"
          alt="Турбоскидки"
          className="h-full w-full object-contain drop-shadow-lg"
        />
      </button>
    </div>
  );
}

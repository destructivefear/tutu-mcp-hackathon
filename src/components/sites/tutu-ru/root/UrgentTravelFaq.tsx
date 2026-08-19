import { ChevronDownIcon } from "@/components/sites/tutu-ru/shared/MiscIcons";
import "./urgent-travel.css";

const FAQ_ITEMS = [
  {
    question: "Что если я опоздаю на пересадку?",
    answer:
      "Сравните варианты без пересадок и с пересадками в результатах подбора — так вы сразу увидите способ добраться, где риск не успеть ниже. Если пересадка всё же нужна, закладывайте запас от 40–60 минут между рейсами: это время учитывается в общей длительности маршрута, которую мы показываем в столбце «В пути».",
  },
  {
    question: "Как вернуть билет, если планы изменились?",
    answer:
      "Условия возврата зависят от перевозчика и тарифа конкретного билета и указываются при оформлении. Возврат оформляется в личном кабинете на странице заказа или в поддержке перевозчика — Tutu.ru переносит туда после выбора варианта.",
  },
  {
    question: "Что делать, если рейс отменили?",
    answer:
      "Введите город отправления, город назначения и время, к которому нужно успеть, — сервис сразу покажет все виды транспорта, которые довезут вовремя, отсортированные по надёжности, скорости и цене.",
  },
  {
    question: "Спишутся ли деньги, если я не успею на новый рейс?",
    answer:
      "Нет — «План «Б»» только подбирает и сравнивает варианты, деньги списываются только при оформлении конкретного билета на сайте перевозчика. Пока вы не нажали «Выбрать» и не завершили оформление, никакая оплата не происходит.",
  },
  {
    question: "Можно ли поменять дату или город назначения после покупки?",
    answer:
      "Это зависит от правил конкретного тарифа — где-то обмен доступен бесплатно, где-то с доплатой. Проверить условия и оформить обмен можно на странице вашего заказа у перевозчика, который выдал билет.",
  },
];

export default function UrgentTravelFaq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="ut-faq" aria-labelledby="ut-faq-title">
      <div className="ut-wrap">
        <h2 className="ut-faq-title" id="ut-faq-title">
          Частые вопросы
        </h2>
        <div className="ut-faq-list">
          {FAQ_ITEMS.map((item) => (
            <details className="ut-faq-item" key={item.question}>
              <summary className="ut-faq-q">
                <span>{item.question}</span>
                <ChevronDownIcon className="ut-faq-caret" />
              </summary>
              <p className="ut-faq-a">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}

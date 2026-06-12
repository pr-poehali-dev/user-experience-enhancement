const reviews = [
  {
    name: "Анастасия К.",
    avatar: "👩‍🦰",
    rating: 5,
    date: "12 мая 2025",
    text: "Заказывала шары на день рождения дочки — привезли точно в срок, всё красиво упаковано. Девочки были в восторге! Буду заказывать ещё.",
    occasion: "День рождения",
  },
  {
    name: "Дмитрий В.",
    avatar: "👨‍💼",
    rating: 5,
    date: "3 апреля 2025",
    text: "Отличный сервис! Помогли подобрать состав под бюджет, созвонились заранее. Шары простояли больше недели. Рекомендую!",
    occasion: "Корпоратив",
  },
  {
    name: "Мария Л.",
    avatar: "👩",
    rating: 5,
    date: "28 марта 2025",
    text: "Встречали малыша из роддома — взяли набор на выписку для мальчика. Всё нежно и красиво, муж был приятно удивлён. Спасибо огромное!",
    occasion: "Выписка",
  },
  {
    name: "Ольга Т.",
    avatar: "🧑‍🦱",
    rating: 5,
    date: "14 февраля 2025",
    text: "Заказывала сюрприз любимому на 14 февраля. Доставили в нужное время, шары огромные и яркие. Очень удобный сайт, всё понятно.",
    occasion: "День влюблённых",
  },
  {
    name: "Екатерина С.",
    avatar: "👩‍🦳",
    rating: 5,
    date: "8 марта 2025",
    text: "Брала на 8 марта для мамы. Состав предложили сами, цена порадовала. Шары продержались 12 дней — это рекорд! Однозначно вернусь.",
    occasion: "8 марта",
  },
  {
    name: "Иван Р.",
    avatar: "🧔",
    rating: 5,
    date: "1 января 2025",
    text: "Новогодние шары заказывал для корпоративной вечеринки. Качество на высшем уровне, ребята всё сделали чётко и без задержек. Молодцы!",
    occasion: "Новый год",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-10 sm:py-28 bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-light tracking-tight mb-3 sm:mb-4">
            Отзывы <span className="font-semibold" style={{ color: "#7c3aed" }}>клиентов</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Более 1200 счастливых заказов по Краснодару
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ fontSize: 24, color: "#f97316" }}>★</span>
            ))}
            <span className="text-lg font-bold ml-2">5.0</span>
            <span className="text-muted-foreground text-sm ml-1">средняя оценка</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3 border border-violet-100"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ fontSize: 32 }}>{r.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
                >
                  {r.occasion}
                </span>
              </div>

              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ fontSize: 16, color: s <= r.rating ? "#f97316" : "#e5e7eb" }}>★</span>
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{r.text}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <a
            href="https://www.avito.ru/profile/rating"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg,#00aaff,#0070cc)", boxShadow: "0 4px 16px rgba(0,170,255,0.35)" }}
          >
            Все отзывы на Авито →
          </a>
        </div>
      </div>
    </section>
  )
}
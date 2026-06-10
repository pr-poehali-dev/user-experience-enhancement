const LOGO = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/34d75e4f-1f88-4d99-8c35-824695216d1d.png"

const WHY = [
  {
    emoji: "🎈",
    title: "Долгий срок полёта — Ultra Hi-Float",
    text: "Мы используем специальное американское средство Ultra Hi-Float, которое внутри шарика создаёт дополнительную оболочку и замедляет просачивание гелия через стенки материала.",
  },
  {
    emoji: "⭐",
    title: "100% гелий и только гелий",
    text: "Мы надуваем шарики чистым гелием, не используя другие газы. Благодаря этому наши шарики имеют хорошую взлётную тягу и долго висят.",
  },
  {
    emoji: "💰",
    title: "Лучшие цены в Краснодаре",
    text: "Мы хорошо поработали над тем, чтобы у нас были лучшие цены на шарики в Краснодаре. Качество без переплат!",
  },
  {
    emoji: "🤝",
    title: "Индивидуальный подход",
    text: "Если есть трудности с подбором, мы помогаем — собираем композицию в интернете и присылаем на утверждение. После согласования собираем финальный заказ.",
  },
  {
    emoji: "📖",
    title: "Большой и удобный каталог",
    text: "Свыше 2000 композиций — собрали каталог так, чтобы вы точно нашли то, что искали для любого праздника.",
  },
]

export function AboutUs() {
  return (
    <section id="about" className="py-12 sm:py-20 bg-gradient-to-b from-background to-violet-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Логотип */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <img
            src={LOGO}
            alt="Шаровик Затейник"
            className="w-48 sm:w-64 drop-shadow-xl"
          />
        </div>

        {/* Основная инфо */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-14 sm:mb-20">
          {/* Photo */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-rose-200/40 rounded-[3rem] blur-2xl" />
              <img
                src="https://cdn.poehali.dev/files/1c81981c-8a25-4651-a48f-e1caece90b1e.jpg"
                alt="Шаровик Затейник"
                className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] object-cover rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl"
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🎈</span>
                <div>
                  <p className="text-xs text-muted-foreground">с Вами с</p>
                  <p className="font-bold text-foreground text-sm">2020 года</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 space-y-5 sm:space-y-6">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 sm:mb-3">О нас</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight mb-3">
                Привет, я{" "}
                <span className="font-semibold text-primary">Виктория</span>
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Всё началось с одного простого желания — сделать день рождения дочки незабываемым.
                Я заказала шарики, увидела восторг в её глазах и поняла: <span className="text-foreground font-medium">вот оно</span>.
              </p>
              <p>
                С 2020 года мы создаём атмосферу праздника для сотен семей Краснодара и края.
                Каждая композиция — это не просто шарики, это эмоции, которые остаются в памяти навсегда.
              </p>
              <p>
                Мы работаем по всему <span className="text-foreground font-semibold">Краснодару и Краснодарскому краю</span> круглосуточно без выходных.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 sm:pt-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border px-3 sm:px-5 py-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-primary">5000+</p>
                <p className="text-xs text-muted-foreground mt-0.5">клиентов</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-border px-3 sm:px-5 py-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-primary">6 лет</p>
                <p className="text-xs text-muted-foreground mt-0.5">опыт</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-border px-3 sm:px-5 py-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground mt-0.5">доставка</p>
              </div>
            </div>
          </div>
        </div>

        {/* Почему выбирают нас */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-center mb-3">
            Почему выбирают <span className="font-semibold text-primary">нас</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12">Несколько причин выбрать Шаровик Затейник</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WHY.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-violet-100 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-pink-50/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-rose-200/40 rounded-[3rem] blur-2xl" />
              <img
                src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/c2f7eeda-1294-4056-9a5e-9bc57cc5767e.jpg"
                alt="Виктория — основательница Шарим"
                className="relative w-80 h-96 lg:w-96 lg:h-[480px] object-cover rounded-[2.5rem] shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2">
                <span className="text-2xl">🎈</span>
                <div>
                  <p className="text-xs text-muted-foreground">с нами с</p>
                  <p className="font-bold text-foreground text-sm">2018 года</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">О нас</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-2">
                Привет, я{" "}
                <span className="font-semibold text-primary">Виктория</span>
              </h2>
              <p className="text-lg text-muted-foreground">основательница студии «Шарим»</p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Всё началось с одного простого желания — сделать день рождения дочки незабываемым.
                Я заказала шарики, увидела восторг в её глазах и поняла: <span className="text-foreground font-medium">вот оно</span>.
              </p>
              <p>
                С 2018 года мы создаём атмосферу праздника для сотен семей Краснодара и края.
                Каждая композиция — это не просто шарики, это эмоции, которые остаются
                в памяти навсегда.
              </p>
              <p>
                Мы работаем круглосуточно, потому что праздники случаются в любое время.
                И мы всегда рядом, чтобы ваш момент стал особенным.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border px-5 py-3 text-center">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground mt-0.5">счастливых клиентов</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-border px-5 py-3 text-center">
                <p className="text-2xl font-bold text-primary">6 лет</p>
                <p className="text-xs text-muted-foreground mt-0.5">опыт работы</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-border px-5 py-3 text-center">
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground mt-0.5">доставка</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

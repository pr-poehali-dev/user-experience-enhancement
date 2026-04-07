import Icon from "@/components/ui/icon"

const features = [
  {
    icon: "Truck",
    title: "Быстрая доставка",
    description: "Доставим свежие шарики в день заказа — они будут яркими и упругими на протяжении всего праздника",
  },
  {
    icon: "Palette",
    title: "Любой дизайн",
    description: "Создаём букеты под любую тематику: от принцесс до супергероев, от романтики до строгого стиля",
  },
  {
    icon: "Phone",
    title: "Поддержка 24/7",
    description: "Поможем выбрать набор, подскажем по оформлению и ответим на любые вопросы в любое время",
  },
  {
    icon: "BadgeCheck",
    title: "Гарантия качества",
    description: "Только профессиональные шарики высокого качества — не лопаются, держат форму и яркий цвет",
  },
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-32 bg-pink-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Почему выбирают <span className="font-semibold text-primary">Шарим</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Делаем праздники яркими и незабываемыми — с любовью к каждой детали
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
                <Icon name={feature.icon} size={32} />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
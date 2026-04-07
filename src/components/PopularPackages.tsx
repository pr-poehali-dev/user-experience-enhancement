import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const packages = [
  {
    title: "Композиция «Принцесса»",
    category: "Для девочки",
    count: "15 шариков",
    emoji: "👑",
    rating: "4.9",
    reviews: "128",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg",
    highlights: ["Розовые", "Сиреневые", "Фольга-звёзды", "Единорог"],
    price: "1 890 ₽",
  },
  {
    title: "Набор «Настоящий мужчина»",
    category: "Для мужчины",
    count: "12 шариков",
    emoji: "🎩",
    rating: "4.8",
    reviews: "94",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg",
    highlights: ["Синие", "Чёрные", "Серебро", "Цифра-возраст"],
    price: "2 290 ₽",
  },
  {
    title: "Встреча малыша",
    category: "Для выписки",
    count: "20 шариков",
    emoji: "👶",
    rating: "5.0",
    reviews: "213",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg",
    highlights: ["Пастельные", "Звёзды", "«Это мальчик!»", "Облачка"],
    price: "3 490 ₽",
  },
]

export function PopularPackages() {
  return (
    <section id="popular" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Популярные <span className="font-semibold text-primary">наборы</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Самые любимые композиции наших покупателей — уже готовые к заказу
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-pink-50">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Icon name="Star" className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                  <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{pkg.emoji}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{pkg.category}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{pkg.title}</h3>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Package" className="h-4 w-4" />
                      <span>{pkg.count}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Цена от</div>
                    <div className="text-2xl font-semibold text-primary">{pkg.price}</div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    Заказать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
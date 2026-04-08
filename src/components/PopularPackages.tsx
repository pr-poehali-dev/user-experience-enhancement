import { useRef } from "react"
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const cardW = scrollRef.current.offsetWidth * 0.48
    scrollRef.current.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" })
  }

  return (
    <section id="popular" className="py-16 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 sm:mb-6 text-balance">
            Популярные <span className="font-semibold text-primary">наборы</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
            Самые любимые композиции наших покупателей — уже готовые к заказу
          </p>
        </div>

        {/* Mobile — горизонтальный скролл, 2 карточки видно, свайп пальцем */}
        <div className="relative lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="snap-start flex-shrink-0"
                style={{ width: "calc(50% - 6px)" }}
              >
                <Card className="group overflow-hidden border-0 bg-card shadow-md h-full flex flex-col">
                  <div className="relative overflow-hidden bg-pink-50" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Icon name="Star" className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">{pkg.emoji}</span>
                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full truncate">{pkg.category}</span>
                      </div>
                      <h3 className="text-sm font-semibold leading-tight mb-2">{pkg.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-muted rounded-full">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                      <div className="text-sm font-bold text-primary">{pkg.price}</div>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs px-3 h-7">
                        Заказать
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Стрелки навигации на мобиле */}
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Desktop — обычная сетка */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden bg-pink-50">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Icon name="Star" className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                  <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{pkg.emoji}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{pkg.category}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{pkg.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Package" className="h-4 w-4" />
                      <span>{pkg.count}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
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

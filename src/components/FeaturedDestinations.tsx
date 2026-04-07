import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const categories = [
  {
    name: "Для девушки",
    emoji: "💕",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg",
    description: "Нежные розовые, фиолетовые и золотые букеты для неё",
    count: "38 наборов",
  },
  {
    name: "Для мужчины",
    emoji: "🎩",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg",
    description: "Стильные синие, чёрные и серебристые композиции для него",
    count: "24 набора",
  },
  {
    name: "Для мальчика",
    emoji: "🚀",
    image: "/placeholder.jpg",
    description: "Яркие синие и зелёные шарики с машинками, роботами и супергероями",
    count: "31 набор",
  },
  {
    name: "Для девочки",
    emoji: "👑",
    image: "/placeholder.jpg",
    description: "Розовые и сиреневые шарики с единорогами, принцессами и цветами",
    count: "35 наборов",
  },
  {
    name: "Для выписки",
    emoji: "👶",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg",
    description: "Нежные наборы для встречи малыша — мальчика или девочки",
    count: "19 наборов",
  },
  {
    name: "На день рождения",
    emoji: "🎂",
    image: "/placeholder.jpg",
    description: "Универсальные праздничные наборы с цифрами и пожеланиями",
    count: "42 набора",
  },
]

const allCategories = ["Все", "Для девушки", "Для мужчины", "Для мальчика", "Для девочки", "Для выписки", "На день рождения"]

export function FeaturedDestinations() {
  const [activeFilter, setActiveFilter] = useState("Все")

  const filtered = activeFilter === "Все" ? categories : categories.filter(c => c.name === activeFilter)

  return (
    <section id="categories" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Каталог <span className="font-semibold text-primary">шариков</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Подберём идеальный букет для любого случая и любимого человека
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((category, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden bg-pink-50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-base">{category.emoji}</span>
                  <span className="text-xs font-medium">{category.count}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">от 890 ₽</span>
                  <Button variant="ghost" size="sm" className="group/btn text-foreground hover:text-primary">
                    Смотреть
                    <Icon name="ArrowRight" className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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

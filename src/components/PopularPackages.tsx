import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const packages = [
  { title: "Набор для девочки 1", category: "Для девочки", count: "15 шариков", emoji: "👑", rating: "4.9", reviews: "128", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9c99662e-bef5-4504-a623-e3bdc9ab36a3.jpg", highlights: ["Розовые", "Сиреневые", "Фольга"], price: "1 890 ₽" },
  { title: "Набор для мужчины 1", category: "Для мужчины", count: "12 шариков", emoji: "🎩", rating: "4.8", reviews: "94", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66fd2a4c-a22c-4717-8995-bdd2ec581332.jpg", highlights: ["Синие", "Чёрные", "Серебро"], price: "2 290 ₽" },
  { title: "Набор на выписку 1", category: "На выписку", count: "20 шариков", emoji: "👶", rating: "5.0", reviews: "213", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22d1e846-f3ed-4233-add8-b04c4757b1d6.png", highlights: ["Пастельные", "Звёзды", "Облачка"], price: "3 490 ₽" },
  { title: "Набор для девушки 1", category: "Для девушки", count: "18 шариков", emoji: "🌹", rating: "4.9", reviews: "156", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4801d79-dc90-4d7f-8763-42f85ecd49bf.jpg", highlights: ["Розовые", "Белые", "Сердечки"], price: "2 100 ₽" },
  { title: "Набор для девушки 2", category: "Для девушки", count: "10 шариков", emoji: "🌹", rating: "4.7", reviews: "89", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd83284-b2ec-45ff-bd42-c6eb2cd87246.jpg", highlights: ["Пастель", "Компактный"], price: "990 ₽" },
  { title: "Набор для мальчика 1", category: "Для мальчика", count: "14 шариков", emoji: "🚀", rating: "4.8", reviews: "73", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/492be4c8-e1c9-4086-af13-a90da62cb5c5.jpg", highlights: ["Синие", "Серебро", "Звёзды"], price: "1 790 ₽" },
  { title: "Набор для девушки 7", category: "Для девушки", count: "10 шариков", emoji: "🌹", rating: "5.0", reviews: "187", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b5ed6c2-adbc-46f4-a8da-7c50eab42f8e.jpg", highlights: ["Баблс 60см", "Хром серебро", "Конфетти"], price: "4 230 ₽" },
  { title: "Набор на выписку 2", category: "На выписку", count: "12 шариков", emoji: "👶", rating: "4.9", reviews: "145", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5beb1b2-88f2-4ca4-92d4-d597512dbd8a.png", highlights: ["Белые", "Голубые", "Нежные"], price: "1 590 ₽" },
  { title: "Набор для мужчины 2", category: "Для мужчины", count: "15 шариков", emoji: "🎩", rating: "4.8", reviews: "102", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f5e51be1-3813-4c3c-ab24-38f23ad99861.jpg", highlights: ["Чёрные", "Золото", "Стиль"], price: "2 500 ₽" },
  { title: "Набор для девочки 2", category: "Для девочки", count: "16 шариков", emoji: "🎀", rating: "4.9", reviews: "118", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d05c932b-4339-475e-8233-c9868e8a2a6c.jpg", highlights: ["Фиолетовые", "Розовые", "Звёзды"], price: "2 000 ₽" },
  { title: "Набор для девочки 3", category: "Для девочки", count: "20 шариков", emoji: "🎀", rating: "5.0", reviews: "201", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62cb939f-05f5-4e41-89b6-3504437129e0.jpg", highlights: ["Разноцветные", "Яркие"], price: "2 400 ₽" },
  { title: "Набор для мужчины 3", category: "Для мужчины", count: "14 шариков", emoji: "🎩", rating: "4.7", reviews: "67", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg", highlights: ["Серебро", "Белые", "Стиль"], price: "1 990 ₽" },
  { title: "Набор для девушки 3", category: "Для девушки", count: "22 шариков", emoji: "🌹", rating: "4.9", reviews: "176", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfe2ab59-e17a-44cf-800f-d64f8af0c606.jpg", highlights: ["Красные", "Сердечки", "Розы"], price: "2 800 ₽" },
  { title: "Набор для мальчика 2", category: "Для мальчика", count: "12 шариков", emoji: "🚀", rating: "4.8", reviews: "91", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/800dd386-d12f-4ad8-9efd-8f5ec69d18df.jpg", highlights: ["Голубые", "Белые", "Звёзды"], price: "1 690 ₽" },
  { title: "Набор для девочки 4", category: "Для девочки", count: "18 шариков", emoji: "🎀", rating: "4.9", reviews: "134", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23a9c8fe-ef93-423b-8aca-7b5c0aebb6a1.jpg", highlights: ["Яркие", "Фольга", "Шик"], price: "2 300 ₽" },
  { title: "Набор для девушки 4", category: "Для девушки", count: "14 шариков", emoji: "🌹", rating: "4.8", reviews: "109", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg", highlights: ["Пастельные", "Розовые"], price: "1 500 ₽" },
  { title: "Набор на выписку 3", category: "На выписку", count: "16 шариков", emoji: "👶", rating: "5.0", reviews: "167", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg", highlights: ["Голубые", "Белые", "Нежные"], price: "2 100 ₽" },
  { title: "Набор для мужчины 4", category: "Для мужчины", count: "13 шариков", emoji: "🎩", rating: "4.7", reviews: "78", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b3bd6c91-c75c-4b53-a2eb-1f51d03b55fe.jpg", highlights: ["Красные", "Чёрные", "Стиль"], price: "1 890 ₽" },
  { title: "Набор для девочки 5", category: "Для девочки", count: "17 шариков", emoji: "🎀", rating: "4.9", reviews: "142", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg", highlights: ["Розовые", "Фиолетовые"], price: "2 200 ₽" },
  { title: "Набор для мужчины 5", category: "Для мужчины", count: "10 шариков", emoji: "🎩", rating: "4.8", reviews: "85", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d31b7e40-58dd-400d-8549-46b93da1df23.jpg", highlights: ["Чёрные", "Белые"], price: "1 290 ₽" },
]

export function PopularPackages() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [dCanLeft, setDCanLeft] = useState(false)
  const [dCanRight, setDCanRight] = useState(true)

  const updateArrows = () => {
    const el = scrollRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }
    const d = desktopScrollRef.current
    if (d) {
      setDCanLeft(d.scrollLeft > 10)
      setDCanRight(d.scrollLeft < d.scrollWidth - d.clientWidth - 10)
    }
  }

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    const d = desktopScrollRef.current
    el?.addEventListener("scroll", updateArrows)
    d?.addEventListener("scroll", updateArrows)
    return () => {
      el?.removeEventListener("scroll", updateArrows)
      d?.removeEventListener("scroll", updateArrows)
    }
  }, [])

  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    if (!ref.current) return
    const cardW = ref.current.offsetWidth * 0.35
    ref.current.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" })
  }

  return (
    <section id="popular" className="py-16 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 sm:mb-6 text-balance">
              Популярные <span className="font-semibold text-primary">наборы</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
              Самые любимые композиции наших покупателей — уже готовые к заказу
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(desktopScrollRef, "left")}
              disabled={!dCanLeft}
              className="w-11 h-11 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => scroll(desktopScrollRef, "right")}
              disabled={!dCanRight}
              className="w-11 h-11 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile — горизонтальный скролл */}
        <div className="relative sm:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((pkg, index) => (
              <div key={index} className="snap-start flex-shrink-0" style={{ width: "calc(50% - 6px)" }}>
                <Card className="group overflow-hidden border-0 bg-card shadow-md h-full flex flex-col">
                  <div className="relative overflow-hidden bg-pink-50" style={{ aspectRatio: "4/3" }}>
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
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
          <div className="flex justify-center gap-3 mt-3">
            <button onClick={() => scroll(scrollRef, "left")} disabled={!canScrollLeft} className="w-9 h-9 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30">
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button onClick={() => scroll(scrollRef, "right")} disabled={!canScrollRight} className="w-9 h-9 rounded-full border border-border bg-white shadow flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30">
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Desktop — горизонтальный скролл */}
        <div
          ref={desktopScrollRef}
          className="hidden sm:flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500 flex-shrink-0"
              style={{ width: "320px" }}
            >
              <div className="relative h-52 overflow-hidden bg-pink-50">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Icon name="Star" className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                  <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{pkg.emoji}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{pkg.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.highlights.map((h, i) => (
                      <span key={i} className="text-xs px-2.5 py-0.5 bg-muted rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Цена от</div>
                    <div className="text-xl font-semibold text-primary">{pkg.price}</div>
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
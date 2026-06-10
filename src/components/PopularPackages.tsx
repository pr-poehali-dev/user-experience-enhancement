import { useRef, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import CompositionModal from "@/components/catalog/CompositionModal"
import { Composition } from "@/data/catalogData"

const packages: Composition[] = [
  { id: 9001, title: "Набор для девочки 1", description: "Розовые и сиреневые шары, фольгированные фигуры, стеклянные шары с конфетти", price: "1 890 ₽", priceNum: 1890, colors: ["pink", "purple"], subcategory: "kid-girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9c99662e-bef5-4504-a623-e3bdc9ab36a3.jpg" },
  { id: 9002, title: "Набор для мужчины 1", description: "Синие и чёрные хром-шары, серебряные фольгированные цифры, стеклянные шары", price: "2 290 ₽", priceNum: 2290, colors: ["blue", "black", "silver"], subcategory: "man", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66fd2a4c-a22c-4717-8995-bdd2ec581332.jpg" },
  { id: 9003, title: "Набор на выписку 1", description: "Пастельные шары, звёздочки, облачка, нежные тона", price: "3 490 ₽", priceNum: 3490, colors: ["white", "cream"], subcategory: "boy-discharge", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22d1e846-f3ed-4233-add8-b04c4757b1d6.png" },
  { id: 9004, title: "Набор для девушки 1", description: "Розовые и белые шары, сердечки, нежная романтичная композиция", price: "2 100 ₽", priceNum: 2100, colors: ["pink", "white"], subcategory: "girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4801d79-dc90-4d7f-8763-42f85ecd49bf.jpg" },
  { id: 9005, title: "Набор для девушки 2", description: "Пастельные шары, компактная и нежная композиция", price: "990 ₽", priceNum: 990, colors: ["pink", "cream"], subcategory: "girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd83284-b2ec-45ff-bd42-c6eb2cd87246.jpg" },
  { id: 9006, title: "Набор для мальчика 1", description: "Синие и серебристые шары, звёзды, яркая мальчишеская композиция", price: "1 790 ₽", priceNum: 1790, colors: ["blue", "silver"], subcategory: "boy", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/492be4c8-e1c9-4086-af13-a90da62cb5c5.jpg" },
  { id: 9007, title: "Набор для девушки 7", description: "Баблс 60см стеклянный, хром серебро, конфетти — роскошная композиция", price: "4 230 ₽", priceNum: 4230, colors: ["silver", "white"], subcategory: "girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b5ed6c2-adbc-46f4-a8da-7c50eab42f8e.jpg" },
  { id: 9008, title: "Набор на выписку 2", description: "Белые и голубые нежные шары, мягкая пастельная выписка", price: "1 590 ₽", priceNum: 1590, colors: ["white", "blue"], subcategory: "girl-discharge", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5beb1b2-88f2-4ca4-92d4-d597512dbd8a.png" },
  { id: 9009, title: "Набор для мужчины 2", description: "Чёрные и золотые хром-шары, стильная мужская композиция", price: "2 500 ₽", priceNum: 2500, colors: ["black", "gold"], subcategory: "man", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f5e51be1-3813-4c3c-ab24-38f23ad99861.jpg" },
  { id: 9010, title: "Набор для девочки 2", description: "Фиолетовые и розовые шары, звёзды, яркая детская композиция", price: "2 000 ₽", priceNum: 2000, colors: ["purple", "pink"], subcategory: "kid-girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d05c932b-4339-475e-8233-c9868e8a2a6c.jpg" },
  { id: 9011, title: "Набор для девочки 3", description: "Разноцветные яркие шары, праздничная детская композиция", price: "2 400 ₽", priceNum: 2400, colors: ["multicolor"], subcategory: "kid-girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62cb939f-05f5-4e41-89b6-3504437129e0.jpg" },
  { id: 9012, title: "Набор для мужчины 3", description: "Серебро и белые шары, стильная лаконичная мужская композиция", price: "1 990 ₽", priceNum: 1990, colors: ["silver", "white"], subcategory: "man", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg" },
  { id: 9013, title: "Набор для девушки 3", description: "Красные шары, сердечки, розы — романтичная цветочная тема", price: "2 800 ₽", priceNum: 2800, colors: ["red", "pink"], subcategory: "girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfe2ab59-e17a-44cf-800f-d64f8af0c606.jpg" },
  { id: 9014, title: "Набор для мальчика 2", description: "Голубые и белые шары со звёздами", price: "1 690 ₽", priceNum: 1690, colors: ["blue", "white"], subcategory: "boy", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/800dd386-d12f-4ad8-9efd-8f5ec69d18df.jpg" },
  { id: 9015, title: "Набор для девочки 4", description: "Яркие фольгированные шары, шик и праздник", price: "2 300 ₽", priceNum: 2300, colors: ["pink", "purple"], subcategory: "kid-girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23a9c8fe-ef93-423b-8aca-7b5c0aebb6a1.jpg" },
  { id: 9016, title: "Набор для девушки 4", description: "Пастельные розовые шары, нежная женская композиция", price: "1 500 ₽", priceNum: 1500, colors: ["pink", "cream"], subcategory: "girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg" },
  { id: 9017, title: "Набор на выписку 3", description: "Голубые и белые нежные шары, встречаем малыша", price: "2 100 ₽", priceNum: 2100, colors: ["blue", "white"], subcategory: "boy-discharge", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg" },
  { id: 9018, title: "Набор для мужчины 4", description: "Красные и чёрные шары, стильная яркая мужская тема", price: "1 890 ₽", priceNum: 1890, colors: ["red", "black"], subcategory: "man", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b3bd6c91-c75c-4b53-a2eb-1f51d03b55fe.jpg" },
  { id: 9019, title: "Набор для девочки 5", description: "Розовые и фиолетовые шары, нежная детская тема", price: "2 200 ₽", priceNum: 2200, colors: ["pink", "purple"], subcategory: "kid-girl", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg" },
  { id: 9020, title: "Набор для мужчины 5", description: "Чёрные и белые шары, минималистичная мужская тема", price: "1 290 ₽", priceNum: 1290, colors: ["black", "white"], subcategory: "man", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d31b7e40-58dd-400d-8549-46b93da1df23.jpg" },
]

export type PopularPkg = typeof packages[0]

const CARD_W = 260 // ширина карточки px
const GAP = 16

export function PopularPackages() {
  const navigate = useNavigate()
  const trackRef = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<Composition | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const posRef = useRef(0)

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      const track = trackRef.current
      if (!track) return
      const maxScroll = track.scrollWidth / 2
      posRef.current += 1
      if (posRef.current >= maxScroll) posRef.current = 0
      track.style.transform = `translateX(-${posRef.current}px)`
    }, 20)
  }, [])

  const stopAuto = useCallback(() => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null }
  }, [])

  useEffect(() => {
    if (!isPaused) startAuto()
    else stopAuto()
    return () => stopAuto()
  }, [isPaused, startAuto, stopAuto])

  // Бесконечная лента — дублируем массив
  const doubled = [...packages, ...packages]

  return (
    <section id="popular" className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-balance">
              Популярные <span className="font-semibold" style={{ color: "#f97316" }}>наборы</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-2">Самые любимые композиции наших покупателей</p>
          </div>
          <button
            onClick={() => navigate("/popular")}
            className="flex items-center gap-2 rounded-full font-bold text-white transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#f97316,#e63000)",
              boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
              padding: "12px 28px",
              fontSize: "clamp(15px,1.3vw,18px)",
            }}
          >
            Смотреть все <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>

      {/* Бесконечная лента */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        style={{ cursor: isPaused ? "grab" : "default" }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: GAP,
            willChange: "transform",
            transition: isPaused ? "none" : undefined,
          }}
        >
          {doubled.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              className="group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl"
              style={{ width: CARD_W, height: CARD_W }}
              onClick={() => { setIsPaused(true); setModal(pkg) }}
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Градиент снизу */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Цена — всегда видна */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-extrabold text-xl drop-shadow-lg">{pkg.price}</p>
              </div>
              {/* Название — при наведении */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent px-3 pt-3 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-semibold leading-tight drop-shadow">{pkg.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Подсказка — пауза при ручном листании */}
        {isPaused && (
          <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            Нажмите для просмотра
          </div>
        )}
      </div>

      {modal && (
        <CompositionModal
          modal={modal}
          allItems={packages}
          onNavigate={setModal}
          onClose={() => { setModal(null); setIsPaused(false) }}
        />
      )}
    </section>
  )
}

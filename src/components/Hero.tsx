import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const BG    = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3ba8882a-4f8d-4c53-9d30-12e0dac5e1ad.png"


const socials = [
  { label: "Max",       href: "#",                          icon: "MessageCircle", bg: "linear-gradient(135deg,#3b82f6,#8b5cf6,#a855f7)" },
  { label: "WhatsApp",  href: "https://wa.me/79885973303",  icon: "MessageSquare", bg: "#22c55e" },
  { label: "Telegram",  href: "#",                          icon: "Send",          bg: "#0ea5e9" },
  { label: "ВКонтакте", href: "#",                          icon: "MessageCircle", bg: "#2563eb" },
  { label: "Instagram", href: "#",                          icon: "Instagram",     bg: "linear-gradient(135deg,#f97316,#ec4899)" },
]

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Фон */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      />



      {/* Центральный контент */}
      <div className="relative z-10 flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-7">

          <h1 className="font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl drop-shadow-sm">
            <span className="block text-primary">Воздушные</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(100deg, hsl(var(--primary)) 35%, #ec4899 60%, #f97316 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >шарики</span>
          </h1>

          <p className="text-lg sm:text-2xl text-foreground/80 max-w-lg leading-snug font-medium drop-shadow-sm">
            Стильные композиции из воздушных и гелиевых шаров с доставкой
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="group relative overflow-hidden rounded-full px-12 sm:px-20 text-white font-bold shadow-2xl hover:scale-105 transition-transform active:scale-95"
            style={{
              height: "5rem",
              fontSize: "1.65rem",
              background: "linear-gradient(160deg, #ff6a00 0%, #e63000 100%)",
              boxShadow: "0 6px 32px rgba(230,90,0,0.45)",
            }}
          >
            <span className="relative flex items-center gap-3">
              Смотреть каталог
              <span className="text-2xl group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </button>

          <div className="inline-flex items-center gap-3 sm:gap-4 bg-orange-50/90 border-2 border-orange-200 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md backdrop-blur-sm">
            <Icon name="Truck" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" style={{ color: "#f97316" }} />
            <span className="font-extrabold text-lg sm:text-2xl whitespace-nowrap" style={{ color: "#f97316" }}>
              Доставка по Краснодару <span style={{ color: "#f97316" }}>24/7</span>
            </span>
          </div>

        </div>
      </div>

      {/* Нижняя плашка — соцсети */}
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-8 pb-6">
        <div className="px-4 sm:px-10 py-4 flex flex-wrap items-center justify-around gap-3 w-full">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-full text-base font-semibold hover:scale-105 transition-transform shadow-md whitespace-nowrap w-40"
              style={{ background: s.bg }}
            >
              <Icon name={s.icon} size={18} /> {s.label}
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
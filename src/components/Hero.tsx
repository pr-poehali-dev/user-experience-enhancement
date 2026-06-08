import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const HERO_BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fa61040-2d84-48bd-83c8-fd37fba5d88e.png"

const MAX_ICON = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2fc43e5-0684-4a7f-8b92-ae7af3e01398.png"

const socials = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", icon: "MessageSquare", bg: "#22c55e" },
  { label: "Telegram", href: "#", icon: "Send", bg: "#0ea5e9" },
  { label: "ВКонтакте", href: "#", icon: "MessageCircle", bg: "#2563eb" },
  { label: "Instagram", href: "#", icon: "Instagram", bg: "linear-gradient(135deg, #f97316, #ec4899)" },
  { label: "Max", href: "#", img: MAX_ICON, bg: "linear-gradient(135deg, #3b82f6, #8b5cf6, #a855f7)" },
]

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-violet-100 via-violet-50 to-orange-50">
      {/* Background scene — truck + shop */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      {/* Main hero row */}
      <div className="relative z-10 flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 flex items-center justify-center">
        {/* Center — content */}
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

          <p className="text-lg sm:text-2xl text-foreground/70 max-w-md leading-snug font-medium">
            Стильные композиции из шаров{" "}
            <span className="font-extrabold">
              <span className="text-primary">по</span>{" "}
              <span className="text-orange-500">низким</span>{" "}
              <span className="text-primary">ценам</span>
            </span>
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="group relative overflow-hidden rounded-full px-10 sm:px-16 text-white font-bold shadow-2xl hover:scale-105 transition-transform active:scale-95"
            style={{
              height: "4.5rem",
              fontSize: "1.5rem",
              background: "linear-gradient(160deg, #ffb347 0%, #ff6a00 40%, #e63000 100%)",
              border: "3px solid rgba(255,255,255,0.7)",
              boxShadow: "0 6px 32px rgba(230,90,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            {/* gloss highlight */}
            <span className="pointer-events-none absolute inset-x-4 top-1 h-[40%] rounded-full bg-white/25 blur-sm" />
            <span className="relative flex items-center gap-3">
              Смотреть каталог
              <span className="text-2xl group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </button>

          <img
            src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca01be13-ac51-4d8b-ab15-f050a5f17de2.png"
            alt="Доставка по Краснодару"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 px-4 sm:px-10 py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 divide-x divide-border/60">
            <div className="flex items-center gap-3 pl-0">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" className="h-5 w-5 text-primary" />
              </span>
              <div className="text-left leading-tight">
                <span className="block text-sm font-bold text-foreground">Более 5000</span>
                <span className="block text-sm text-muted-foreground">композиций</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-6">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" className="h-5 w-5 text-primary" />
              </span>
              <div className="text-left leading-tight">
                <span className="block text-sm font-bold text-foreground">Работаем 24/7</span>
                <span className="block text-sm text-muted-foreground">без выходных</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-md whitespace-nowrap"
                style={{ background: s.bg }}
              >
                {s.img ? (
                  <img src={s.img} alt={s.label} className="w-4 h-4 rounded-sm object-contain" />
                ) : (
                  <Icon name={s.icon} size={16} />
                )} {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
import { useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const HERO_BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fa61040-2d84-48bd-83c8-fd37fba5d88e.png"

const MAX_ICON = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/555d9ff8-3bba-4e68-837c-85a402fed391.png"

const socials = [
  { label: "Max", href: "#", img: MAX_ICON, bg: "linear-gradient(135deg, #3b82f6, #8b5cf6, #a855f7)" },
  { label: "WhatsApp", href: "https://wa.me/79885973303", icon: "MessageSquare", bg: "#22c55e" },
  { label: "Telegram", href: "#", icon: "Send", bg: "#0ea5e9" },
  { label: "ВКонтакте", href: "#", icon: "MessageCircle", bg: "#2563eb" },
  { label: "Instagram", href: "#", icon: "Instagram", bg: "linear-gradient(135deg, #f97316, #ec4899)" },
]

function FloatingBalloon() {
  return (
    <div
      className="absolute pointer-events-none select-none z-[2]"
      style={{
        left: "62%",
        bottom: "28%",
        fontSize: "2.8rem",
        animation: "balloonFloat 4s ease-in-out infinite",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
      }}
    >
      🎈
    </div>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const headlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const blink = () => {
      const el = headlightRef.current
      if (!el) return
      el.style.opacity = "0.2"
      setTimeout(() => { if (el) el.style.opacity = "1" }, 120)
      setTimeout(() => { if (el) el.style.opacity = "0.2" }, 240)
      setTimeout(() => { if (el) el.style.opacity = "1" }, 360)
      timeout = setTimeout(blink, 5000)
    }
    timeout = setTimeout(blink, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Background scene */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      {/* Фары машины — светящийся оверлей */}
      <div
        ref={headlightRef}
        className="absolute z-[2] pointer-events-none transition-opacity duration-100"
        style={{
          left: "4%",
          bottom: "8%",
          width: "120px",
          height: "40px",
          background: "radial-gradient(ellipse at left, rgba(255,240,120,0.85) 0%, rgba(255,220,60,0.4) 50%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(6px)",
        }}
      />

      {/* Шарики в кузове — шевелятся */}
      <div
        className="absolute z-[2] pointer-events-none select-none"
        style={{
          left: "14%",
          bottom: "18%",
          display: "flex",
          gap: "4px",
          fontSize: "1.4rem",
        }}
      >
        {["🎈", "🎀", "🎈"].map((b, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: `cargoWiggle${i % 2 === 0 ? "A" : "B"} 2.5s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* Летающий шарик внутри магазина */}
      <FloatingBalloon />

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

          <p className="text-lg sm:text-2xl text-foreground/70 max-w-lg leading-snug font-medium">
            Стильные композиции из воздушных и гелиевых шаров с доставкой
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="group relative overflow-hidden rounded-full px-12 sm:px-20 text-white font-bold shadow-2xl hover:scale-105 transition-transform active:scale-95"
            style={{
              height: "5rem",
              fontSize: "1.65rem",
              background: "linear-gradient(160deg, #ffb347 0%, #ff6a00 40%, #e63000 100%)",
              border: "3px solid rgba(255,255,255,0.7)",
              boxShadow: "0 6px 32px rgba(230,90,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <span className="pointer-events-none absolute inset-x-4 top-1 h-[40%] rounded-full bg-white/25 blur-sm" />
            <span className="relative flex items-center gap-3">
              Смотреть каталог
              <span className="text-2xl group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </button>

          <div className="inline-flex items-center gap-3 sm:gap-4 bg-orange-50 border-2 border-orange-200 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md">
            <Icon name="Truck" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" style={{ color: "#f97316" }} />
            <span className="font-extrabold text-lg sm:text-2xl whitespace-nowrap" style={{ color: "#f97316" }}>
              Доставка по Краснодару{" "}
              <span style={{ color: "#f97316", fontSize: "inherit" }}>24/7</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom info bar — только соцсети */}
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 px-4 sm:px-10 py-4 flex flex-wrap items-center justify-around gap-3 w-full">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-base font-semibold hover:scale-105 transition-transform shadow-md whitespace-nowrap"
              style={{ background: s.bg }}
            >
              {s.img ? (
                <img src={s.img} alt={s.label} className="w-5 h-5 rounded-sm object-contain" />
              ) : (
                <Icon name={s.icon} size={18} />
              )} {s.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes balloonFloat {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-22px) rotate(4deg); }
        }
        @keyframes cargoWiggleA {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes cargoWiggleB {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
      `}</style>
    </section>
  )
}

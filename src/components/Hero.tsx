import { useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const BG     = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e6bd09a3-5691-4295-8b35-c6443f571dfd.png"
const SHOP   = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7db538f7-d2ec-4f48-92b0-d7b4fc40b9e1.png"
const TRUCK  = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6193d6eb-0c26-49cb-b3f6-84b41733d33a.png"
const MAX_ICON = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/555d9ff8-3bba-4e68-837c-85a402fed391.png"

const socials = [
  { label: "Max",       href: "#",                           img: MAX_ICON,       bg: "linear-gradient(135deg,#3b82f6,#8b5cf6,#a855f7)" },
  { label: "WhatsApp",  href: "https://wa.me/79885973303",   icon: "MessageSquare", bg: "#22c55e" },
  { label: "Telegram",  href: "#",                           icon: "Send",          bg: "#0ea5e9" },
  { label: "ВКонтакте", href: "#",                           icon: "MessageCircle", bg: "#2563eb" },
  { label: "Instagram", href: "#",                           icon: "Instagram",     bg: "linear-gradient(135deg,#f97316,#ec4899)" },
]

export function Hero() {
  const navigate = useNavigate()
  const headlightRef = useRef<HTMLDivElement>(null)

  /* Фары моргают раз в 5 сек */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const blink = () => {
      const el = headlightRef.current
      if (!el) return
      el.style.opacity = "0.15"
      setTimeout(() => { if (el) el.style.opacity = "1" }, 130)
      setTimeout(() => { if (el) el.style.opacity = "0.15" }, 260)
      setTimeout(() => { if (el) el.style.opacity = "1" }, 390)
      t = setTimeout(blink, 5000)
    }
    t = setTimeout(blink, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── ФОН (светло-фиолетовый с подарками) ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      />

      {/* ── МАГАЗИН — слева снизу ── */}
      <img
        src={SHOP}
        alt="Магазин Шаровик Затейник"
        className="absolute z-[2] pointer-events-none select-none"
        style={{
          left: "-2%",
          bottom: "4%",
          width: "clamp(260px, 30vw, 480px)",
          objectFit: "contain",
        }}
      />

      {/* ── МАШИНА — справа снизу ── */}
      <img
        src={TRUCK}
        alt="Машина доставки"
        className="absolute z-[2] pointer-events-none select-none"
        style={{
          right: "-2%",
          bottom: "3%",
          width: "clamp(280px, 34vw, 520px)",
          objectFit: "contain",
          animation: "truckBob 4s ease-in-out infinite",
        }}
      />

      {/* ── ФАРЫ машины ── */}
      <div
        ref={headlightRef}
        className="absolute z-[3] pointer-events-none transition-opacity duration-100"
        style={{
          right: "6%",
          bottom: "9%",
          width: "clamp(50px, 5vw, 80px)",
          height: "clamp(16px, 2vw, 28px)",
          background: "radial-gradient(ellipse at right, rgba(255,235,100,0.9) 0%, rgba(255,210,50,0.5) 50%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(5px)",
        }}
      />

      {/* ── ЛЕТАЮЩИЙ ШАРИК над магазином ── */}
      <div
        className="absolute z-[3] pointer-events-none select-none text-5xl"
        style={{
          left: "14%",
          bottom: "52%",
          animation: "balloonFloat 3.5s ease-in-out infinite",
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.2))",
        }}
      >
        🎈
      </div>

      {/* ── ШАРИКИ В КУЗОВЕ — шевелятся ── */}
      <div
        className="absolute z-[3] pointer-events-none select-none flex gap-1"
        style={{ right: "20%", bottom: "28%", fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
      >
        {(["🟣","🟠","🟣"] as const).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: `cargoWiggle${i % 2 === 0 ? "A" : "B"} 2.4s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            🎈
          </span>
        ))}
      </div>

      {/* ── ЦЕНТРАЛЬНЫЙ КОНТЕНТ ── */}
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

          <div className="inline-flex items-center gap-3 sm:gap-4 bg-orange-50/90 border-2 border-orange-200 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md backdrop-blur-sm">
            <Icon name="Truck" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" style={{ color: "#f97316" }} />
            <span className="font-extrabold text-lg sm:text-2xl whitespace-nowrap" style={{ color: "#f97316" }}>
              Доставка по Краснодару <span style={{ color: "#f97316" }}>24/7</span>
            </span>
          </div>

        </div>
      </div>

      {/* ── НИЖНЯЯ ПЛАШКА — соцсети ── */}
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 px-4 sm:px-10 py-4 flex flex-wrap items-center justify-around gap-3 w-full">
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
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-24px) rotate(5deg); }
        }
        @keyframes truckBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes cargoWiggleA {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%     { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes cargoWiggleB {
          0%,100% { transform: translateY(0) rotate(4deg); }
          50%     { transform: translateY(-10px) rotate(-4deg); }
        }
      `}</style>
    </section>
  )
}

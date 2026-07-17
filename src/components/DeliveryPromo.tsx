import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function DeliveryPromo() {
  const navigate = useNavigate()

  return (
    <section id="delivery-promo" className="py-10 sm:py-24 bg-gradient-to-b from-violet-50 to-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden grid lg:grid-cols-2 items-center transition-transform duration-500 hover:scale-[1.015] hover:-translate-y-1"
          style={{
            boxShadow: "0 20px 50px rgba(124,58,237,0.22)",
          }}
        >
          {/* Фоновая фотография */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dd07844f-9b88-4f58-8c81-5b7923f18ace.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Полупрозрачный фиолетовый оверлей */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(168,85,247,0.35))" }}
          />

          {/* Декоративные звёзды */}
          <span className="hidden lg:block absolute z-10" style={{ top: "10%", left: "6%", fontSize: 18, color: "rgba(255,255,255,0.5)" }}>✦</span>
          <span className="hidden lg:block absolute z-10" style={{ bottom: "14%", left: "16%", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>✦</span>

          {/* Текстовая часть */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-10 sm:py-14 lg:py-16 text-center lg:text-left">
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: 12,
              textShadow: "0 1px 6px rgba(0,0,0,0.25)",
            }}>
              🚀 Работаем без выходных
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: "clamp(26px, 3.4vw, 42px)", color: "#fff", lineHeight: 1.15,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}>
              Круглосуточная{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#fde68a" }}>
                доставка
              </span>{" "}
              по Краснодару
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "clamp(14px,1.1vw,17px)",
              color: "rgba(255,255,255,0.92)", marginTop: 14, lineHeight: 1.6, maxWidth: 420,
              textShadow: "0 1px 6px rgba(0,0,0,0.25)",
            }} className="mx-auto lg:mx-0">
              Привезём шары в любое время дня и ночи — в любой район города, быстро и бережно
            </p>

            <button
              onClick={() => navigate("/delivery")}
              className="inline-flex items-center gap-2.5 transition-transform hover:scale-105 mt-8"
              style={{
                background: "#fff",
                color: "#7c3aed", borderRadius: 999, padding: "16px 32px",
                fontWeight: 700, fontSize: "clamp(14px,1.6vw,17px)",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <Icon name="Clock" size={20} />
              Узнать условия
              <Icon name="ArrowUpRight" size={18} />
            </button>
          </div>

          {/* Пустая правая колонка — фото уже на фоне */}
          <div className="relative hidden lg:block" style={{ minHeight: 320 }} />
        </div>
      </div>
    </section>
  )
}
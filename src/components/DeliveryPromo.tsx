import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function DeliveryPromo() {
  const navigate = useNavigate()

  return (
    <section id="delivery-promo" className="py-10 sm:py-24 bg-gradient-to-b from-violet-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden grid lg:grid-cols-2 items-center"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#a855f7)",
            boxShadow: "0 20px 50px rgba(124,58,237,0.28)",
          }}
        >
          {/* Декоративные звёзды */}
          <span className="hidden lg:block absolute" style={{ top: "10%", left: "6%", fontSize: 18, color: "rgba(255,255,255,0.5)" }}>✦</span>
          <span className="hidden lg:block absolute" style={{ bottom: "14%", left: "16%", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>✦</span>

          {/* Текстовая часть */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 text-center lg:text-left">
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 12,
            }}>
              🚀 Работаем без выходных
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: "clamp(28px, 3.8vw, 46px)", color: "#fff", lineHeight: 1.15,
            }}>
              Круглосуточная{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#fde68a" }}>
                доставка
              </span>{" "}
              по Краснодару
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "clamp(14px,1.1vw,17px)",
              color: "rgba(255,255,255,0.85)", marginTop: 14, lineHeight: 1.6, maxWidth: 440,
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
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              <Icon name="Clock" size={20} />
              Узнать условия
              <Icon name="ArrowUpRight" size={18} />
            </button>
          </div>

          {/* Иллюстрация */}
          <div className="relative w-full flex items-center justify-center px-6 pb-8 lg:pb-0 lg:px-10" style={{ minHeight: 260 }}>
            <img
              src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/29b6b349-311d-4434-80ef-50b7fcc8c27d.jpg"
              alt="Круглосуточная доставка шаров"
              className="w-full max-w-[380px] h-auto rounded-[24px] object-cover"
              style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

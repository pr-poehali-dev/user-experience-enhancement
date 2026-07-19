import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function DeliveryPromo() {
  const navigate = useNavigate()

  return (
    <section id="delivery-promo" className="py-10 sm:py-16 bg-gradient-to-b from-violet-50 to-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* ═══ МОБИЛЬНАЯ ВЕРСИЯ — с нуля ═══ */}
        <div
          className="lg:hidden relative rounded-[26px] overflow-hidden"
          style={{ background: "linear-gradient(160deg,#7c3aed 0%,#a855f7 100%)", boxShadow: "0 16px 40px rgba(124,58,237,0.28)" }}
        >
          <span className="absolute" style={{ top: 14, right: 18, fontSize: 22, color: "rgba(255,255,255,0.35)" }}>✦</span>
          <span className="absolute" style={{ bottom: 60, left: 16, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>✦</span>

          <div className="relative px-6 pt-6 pb-5">
            <div
              className="inline-flex items-center gap-1.5 mb-3"
              style={{
                background: "rgba(255,255,255,0.16)", borderRadius: 999, padding: "5px 12px",
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 11,
                color: "#fff", letterSpacing: "0.4px",
              }}
            >
              <Icon name="Clock" size={13} />
              Работаем 24/7
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: 26, color: "#fff", lineHeight: 1.15,
            }}>
              Круглосуточная{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#fde68a" }}>
                доставка
              </span>
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 14,
              color: "rgba(255,255,255,0.88)", marginTop: 6, lineHeight: 1.5,
            }}>
              Привезём шары в любое время дня и ночи по всему Краснодару
            </p>

            <button
              onClick={() => navigate("/delivery")}
              className="inline-flex items-center gap-2 active:scale-95 transition-transform"
              style={{
                marginTop: 16,
                background: "#fff", color: "#7c3aed", borderRadius: 999, padding: "11px 20px",
                fontWeight: 700, fontSize: 13.5,
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
              }}
            >
              Узнать условия
              <Icon name="ArrowUpRight" size={15} />
            </button>
          </div>
        </div>

        {/* ═══ ДЕСКТОП/ПЛАНШЕТ — без изменений ═══ */}
        <div
          className="hidden lg:flex relative rounded-[24px] sm:rounded-[32px] overflow-hidden items-center justify-center transition-transform duration-500 hover:scale-[1.005] hover:-translate-y-1"
          style={{
            boxShadow: "0 20px 50px rgba(124,58,237,0.22)",
            minHeight: "clamp(180px, 22vw, 280px)",
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
          <span className="hidden lg:block absolute z-10" style={{ top: "14%", left: "5%", fontSize: 16, color: "rgba(255,255,255,0.5)" }}>✦</span>
          <span className="hidden lg:block absolute z-10" style={{ bottom: "16%", left: "12%", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>✦</span>

          {/* Контент */}
          <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 py-7 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10 text-center lg:text-left">
            <div>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11,
                letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: 6,
                textShadow: "0 1px 6px rgba(0,0,0,0.25)",
              }}>
                🚀 Работаем без выходных
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 500,
                fontSize: "clamp(22px, 2.6vw, 34px)", color: "#fff", lineHeight: 1.15,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}>
                Круглосуточная{" "}
                <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#fde68a" }}>
                  доставка
                </span>{" "}
                по Краснодару
              </h2>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "clamp(13px,1vw,15px)",
                color: "rgba(255,255,255,0.92)", marginTop: 8, lineHeight: 1.5, maxWidth: 420,
                textShadow: "0 1px 6px rgba(0,0,0,0.25)",
              }} className="mx-auto lg:mx-0">
                Привезём шары в любое время дня и ночи — в любой район города
              </p>
            </div>

            <button
              onClick={() => navigate("/delivery")}
              className="inline-flex items-center gap-2.5 transition-transform hover:scale-105 flex-shrink-0"
              style={{
                background: "#fff",
                color: "#7c3aed", borderRadius: 999, padding: "14px 28px",
                fontWeight: 700, fontSize: "clamp(13px,1.2vw,16px)",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <Icon name="Clock" size={18} />
              Узнать условия
              <Icon name="ArrowUpRight" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
import Icon from "@/components/ui/icon"

const POINTS = [
  { icon: "Gift",  title: "Бесплатно",     subtitle: "при заказе от 3500 ₽" },
  { icon: "Truck", title: "150 — 500 ₽",   subtitle: "по Краснодару" },
  { icon: "Clock", title: "Круглосуточно", subtitle: "24/7, без выходных" },
]

export function DeliverySection() {
  return (
    <section
      id="delivery-section"
      className="py-10 sm:py-14 px-4"
      style={{
        background: "linear-gradient(180deg, #f7f2fd 0%, #fdfbff 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        {/* Текст */}
        <div className="text-center lg:text-left lg:flex-shrink-0">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 6,
          }}>Быстро и бережно</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(24px, 2.8vw, 36px)", color: "#1a1024", lineHeight: 1.15,
          }}>
            Доставим{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики
            </span>{" "}
            к вам
          </h2>
        </div>

        {/* Точки */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {POINTS.map(p => (
            <div
              key={p.title}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 flex-1"
              style={{ border: "1px solid #ece4fb" }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                background: "rgba(124,58,237,0.08)", color: "#7c3aed",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={p.icon} size={17} />
              </span>
              <div className="text-left">
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1024", whiteSpace: "nowrap" }}>{p.title}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, color: "#8a7d9c", whiteSpace: "nowrap" }}>{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

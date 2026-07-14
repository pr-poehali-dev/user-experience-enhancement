import Icon from "@/components/ui/icon"

const CAR_IMG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cad6095d-44cd-4c3f-9696-b63eb62b42ee.png"

const POINTS = [
  { icon: "Gift",  title: "Бесплатно",     subtitle: "при заказе от 3500 ₽" },
  { icon: "Truck", title: "150 — 500 ₽",   subtitle: "по Краснодару" },
  { icon: "Clock", title: "Круглосуточно", subtitle: "24/7, без выходных" },
]

export function DeliverySection() {
  return (
    <section
      id="delivery-section"
      className="py-14 sm:py-24 px-4 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 10% 90%, #fbeafd 0%, transparent 55%), linear-gradient(180deg, #f7f2fd 0%, #fdfbff 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Текст */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
          }}>Быстро и бережно</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(30px, 4.2vw, 54px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Доставим{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики
            </span>{" "}
            к вам
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 16,
            color: "#5c5468", lineHeight: 1.6, marginTop: 14, maxWidth: 420,
          }} className="mx-auto lg:mx-0">
            Работаем 24/7 — привезём в любое время, в любой район Краснодара
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 mt-8 max-w-md mx-auto lg:mx-0">
            {POINTS.map(p => (
              <div
                key={p.title}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
                style={{ border: "1px solid #ece4fb" }}
              >
                <span style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: "rgba(124,58,237,0.08)", color: "#7c3aed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={p.icon} size={19} />
                </span>
                <div className="text-left">
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1024" }}>{p.title}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, color: "#8a7d9c" }}>{p.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Машина */}
        <div className="order-1 lg:order-2 flex justify-center">
          <img
            src={CAR_IMG}
            alt="Доставка воздушных шаров"
            className="w-full drop-shadow-xl"
            style={{ maxWidth: 480, objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  )
}

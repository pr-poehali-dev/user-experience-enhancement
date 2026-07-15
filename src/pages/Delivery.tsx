import { Footer } from "@/components/Footer"
import { FloatingSocials } from "@/components/FloatingSocials"
import Icon from "@/components/ui/icon"

const MAP_URL = "https://2gis.ru/search/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%93%D0%B5%D1%80%D0%BE%D1%8F%20%D0%AF%D1%86%D0%BA%D0%BE%D0%B2%D0%B0%2019%D0%BA3"

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366",
    icon: <svg width="16" height="16" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.26 19.86c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
  { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: "Max", href: "https://vk.com/sharovik_krd", bg: "#1e3a5f",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 4h16v12H5.17L4 17.17V4zm2 5h12v2H6zm0-3h12v2H6zm0 6h8v2H6z"/></svg> },
]

const PRICE_ROWS = [
  { icon: "Gift", title: "Бесплатно", desc: "при заказе от 4 000 ₽ (кроме районов Западный обход, Юбилейный, Пашковский)", bg: "#f0fdf4", iconBg: "#16a34a", color: "#1a1024" },
  { icon: "Truck", title: "от 150 ₽", desc: "при заказе менее 4 000 ₽", bg: "#fff7ed", iconBg: "#f97316", color: "#1a1024" },
]

export default function Delivery() {
  return (
    <div className="min-h-screen mt-[58px] md:mt-[84px]" style={{ background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 45%, #ffffff 100%)" }}>

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 85% 10%, #f3ebff 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 10% 90%, #fbeafd 0%, transparent 55%)" }} />
        <span className="hidden lg:block absolute" style={{ top: "14%", left: "8%", fontSize: 18, color: "#c4a3f7" }}>✦</span>
        <span className="hidden lg:block absolute" style={{ top: "22%", right: "12%", fontSize: 14, color: "#e3b8ea" }}>✦</span>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14 text-center">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 10,
          }}>
            🚀 Быстро и бережно
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(34px, 5.5vw, 64px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Доставим{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики
            </span>{" "}
            к вам
          </h1>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400, color: "#5c5468",
            fontSize: "clamp(14px,1.1vw,18px)", marginTop: 14, lineHeight: 1.6,
          }}>
            Работаем 24/7 — привезём в любое время, в любой район Краснодара
          </p>
        </div>
      </section>

      {/* ══════ ОСНОВНОЙ КОНТЕНТ ══════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-5">

        {/* Стоимость доставки */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden" style={{ border: "1px solid #ece4fb" }}>
          <div className="px-6 pt-6 pb-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              <Icon name="Tag" size={18} className="text-white" />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(18px,1.6vw,22px)", color: "#1a1024" }}>
              Стоимость доставки
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#f0ebff" }}>
            {PRICE_ROWS.map((row) => (
              <div key={row.title} className="flex items-center gap-4 px-6 py-4" style={{ background: row.bg }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: row.iconBg }}>
                  <Icon name={row.icon} size={19} className="text-white" />
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 16, color: row.color }}>{row.title}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 13, color: "#8a7d9c" }}>{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Самовывоз + График — в одной карточке */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden" style={{ border: "1px solid #ece4fb" }}>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-5 transition-colors group"
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#faf5ff"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
              <Icon name="MapPin" size={19} className="text-white" />
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1024" }}>
                Самовывоз: ул. Героя Яцкова 19к3
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 12, color: "#8a7d9c" }}>
                г. Краснодар · нажмите, чтобы открыть на карте
              </p>
            </div>
            <Icon name="ExternalLink" size={15} className="flex-shrink-0" style={{ color: "#a855f7" }} />
          </a>
          <div className="flex items-center gap-4 px-6 py-5" style={{ borderTop: "1px solid #f0ebff" }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
              <Icon name="Clock" size={19} className="text-white" />
            </div>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1024" }}>Круглосуточно, 24/7</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 12, color: "#8a7d9c" }}>Без выходных и праздников</p>
            </div>
          </div>
        </div>

        {/* Вопросы — контакты */}
        <div className="rounded-3xl p-6 sm:p-8 text-center" style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(19px,1.8vw,24px)", color: "#fff", marginBottom: 4 }}>
            Есть вопросы по доставке?
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            <a
              href="tel:+79885973303"
              className="flex items-center gap-2 bg-white px-5 py-3 rounded-full transition-transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, color: "#7c3aed" }}
            >
              <Icon name="Phone" size={15} /> 8 988 597 33 03
            </a>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-4 py-3 rounded-full transition-transform hover:scale-105"
                style={{ background: "rgba(255,255,255,0.18)", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13 }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      <Footer />
      <FloatingSocials />
    </div>
  )
}
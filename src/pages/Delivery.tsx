import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const CAR_IMG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cad6095d-44cd-4c3f-9696-b63eb62b42ee.png"
const MAP_URL = "https://2gis.ru/search/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%93%D0%B5%D1%80%D0%BE%D1%8F%20%D0%AF%D1%86%D0%BA%D0%BE%D0%B2%D0%B0%2019%D0%BA3"

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366",
    icon: <svg width="18" height="18" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.26 19.86c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
  { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.85c-.7 0-.91-.56-2.16-1.81-1.09-1.05-1.57-.93-1.57.22v1.65c0 .39-.13.62-1.18.62-1.74 0-3.67-1.05-5.03-3.01C4.42 10.5 4 8.5 4 8.5s0-.23.25-.23h1.85c.68 0 .94.31 1.19 1.04.65 1.9 1.74 3.57 2.19 3.57.17 0 .25-.08.25-.5V10.1c-.06-1.06-.62-1.15-.62-1.53 0-.21.17-.42.45-.42h2.9c.38 0 .51.21.51.66v3.12c0 .38.17.51.28.51.17 0 .31-.13.62-.44 1.07-1.2 1.83-3.06 1.83-3.06.1-.23.3-.44.68-.44h1.85c.56 0 .68.29.56.67-.23.97-2.42 4.14-2.42 4.14-.19.31-.26.45 0 .79.19.26.8.79 1.21 1.27.74.84 1.31 1.55 1.46 2.04.17.49-.08.74-.57.74z"/></svg> },
  { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#dc2743,#bc1888)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
]

export default function Delivery() {
  return (
    <div className="min-h-screen" style={{background:"linear-gradient(180deg,#f5f3ff 0%,#ffffff 50%)"}}>

      {/* HERO: машина на всю ширину */}
      <div className="relative pt-[clamp(72px,10vw,120px)] overflow-hidden">
        {/* Фоновый градиент */}
        <div className="absolute inset-0" style={{background:"linear-gradient(160deg,#ede9fe 0%,#fff7ed 60%,#fff 100%)"}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Заголовок над машиной */}
          <div className="text-center pt-6 sm:pt-10 pb-4 sm:pb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{background:"rgba(124,58,237,0.1)", color:"#7c3aed"}}>
              🚀 Быстрая доставка по Краснодару
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>
              <span style={{color:"#7c3aed"}}>Доставим</span>{" "}
              <span style={{color:"#e63000"}}>шарики</span><br className="hidden sm:block" /> к вам!
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">Работаем 24/7 — привезём в любое время, в любой район Краснодара</p>
          </div>

          {/* Машина — крупная, на всю ширину */}
          <div className="flex justify-center">
            <img
              src={CAR_IMG}
              alt="Шаровик Затейник — доставка шариков"
              className="w-full drop-shadow-2xl"
              style={{
                maxWidth: 860,
                maxHeight: 560,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Быстрые плашки под машиной */}
          <div className="flex flex-wrap justify-center gap-3 pb-8 sm:pb-12 -mt-2 sm:-mt-4">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-md border border-violet-100">
              <span className="text-xl">🎁</span>
              <div>
                <p className="font-bold text-sm text-foreground">Бесплатно</p>
                <p className="text-xs text-muted-foreground">от 3500 ₽</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-md border border-violet-100">
              <span className="text-xl">🚚</span>
              <div>
                <p className="font-bold text-sm text-foreground">150–500 ₽</p>
                <p className="text-xs text-muted-foreground">по Краснодару</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-md border border-violet-100">
              <span className="text-xl">⏰</span>
              <div>
                <p className="font-bold text-sm text-foreground">Круглосуточно</p>
                <p className="text-xs text-muted-foreground">24/7, без выходных</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-5">

        {/* Стоимость доставки */}
        <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <Icon name="Tag" size={22} className="text-primary" /> Стоимость доставки
            </h2>
          </div>
          <div className="divide-y divide-border mt-4">
            <div className="flex items-center gap-4 px-6 py-4 bg-green-50/70">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">🎁</div>
              <div className="flex-1">
                <p className="font-bold text-green-700 text-lg">Бесплатно!</p>
                <p className="text-sm text-muted-foreground">при заказе на сумму <b>от 3500 ₽</b></p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 bg-orange-50/60">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">🚚</div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">150 — 500 ₽</p>
                <p className="text-sm text-muted-foreground">при сумме заказа менее 3500 ₽ — зависит от района</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">🗺️</div>
              <div className="flex-1">
                <p className="font-bold text-foreground">Краснодарский край</p>
                <p className="text-sm text-muted-foreground">Выезжаем за город — уточняйте стоимость</p>
              </div>
            </div>
          </div>
        </div>

        {/* Самовывоз */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6">
          <h2 className="font-bold text-xl flex items-center gap-2 mb-4">
            <Icon name="Store" size={22} className="text-primary" /> Самовывоз
          </h2>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-2xl bg-violet-50 hover:bg-violet-100 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)"}}>
              <Icon name="MapPin" size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">р-н Губернский: ул. Героя Яцкова 19к3</p>
              <p className="text-sm text-muted-foreground">г. Краснодар · нажмите, чтобы открыть на карте</p>
            </div>
            <Icon name="ExternalLink" size={16} className="text-muted-foreground mt-1 group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        </div>

        {/* График работы */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6">
          <h2 className="font-bold text-xl flex items-center gap-2 mb-4">
            <Icon name="Clock" size={22} className="text-primary" /> График работы
          </h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{background:"linear-gradient(135deg,#f5f3ff,#ede9fe)"}}>
            <div className="text-3xl">⏰</div>
            <div>
              <p className="font-bold text-primary text-lg">Круглосуточно, 24/7</p>
              <p className="text-sm text-muted-foreground">Без выходных и праздников</p>
            </div>
          </div>
        </div>

        {/* Вопросы — контакты */}
        <div className="rounded-3xl p-6 sm:p-8 text-center" style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)"}}>
          <p className="text-white font-bold text-xl mb-1">Есть вопросы по доставке?</p>
          <p className="text-white/80 text-sm mb-5">Свяжитесь с нами любым удобным способом</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+79880653700" className="flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-lg">
              <Icon name="Phone" size={16} /> +7 988 065 37 00
            </a>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white px-4 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105" style={{background:"rgba(255,255,255,0.2)"}}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

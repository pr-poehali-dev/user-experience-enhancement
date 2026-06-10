import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fda3455-48ed-4479-b42c-5dac5056af85.png"

// Статичные конфетти + звёзды + стикеры — фиксированные позиции
const CONFETTI = [
  // Прямоугольные конфетти — много!
  { type: "rect", x: 2,  y: 7,  w: 20, h: 10, color: "#f97316", rot: 25 },
  { type: "rect", x: 6,  y: 20, w: 16, h: 8,  color: "#7c3aed", rot: -15 },
  { type: "rect", x: 1,  y: 40, w: 22, h: 11, color: "#ec4899", rot: 40 },
  { type: "rect", x: 13, y: 60, w: 18, h: 9,  color: "#facc15", rot: -30 },
  { type: "rect", x: 4,  y: 77, w: 20, h: 10, color: "#60a5fa", rot: 15 },
  { type: "rect", x: 87, y: 11, w: 22, h: 11, color: "#f43f5e", rot: -22 },
  { type: "rect", x: 91, y: 28, w: 17, h: 9,  color: "#a855f7", rot: 35 },
  { type: "rect", x: 85, y: 52, w: 20, h: 10, color: "#fb923c", rot: -18 },
  { type: "rect", x: 90, y: 70, w: 18, h: 9,  color: "#34d399", rot: 28 },
  { type: "rect", x: 93, y: 87, w: 16, h: 8,  color: "#f97316", rot: -10 },
  { type: "rect", x: 23, y: 4,  w: 18, h: 9,  color: "#a855f7", rot: 20 },
  { type: "rect", x: 68, y: 6,  w: 20, h: 10, color: "#facc15", rot: -25 },
  { type: "rect", x: 44, y: 2,  w: 16, h: 8,  color: "#ec4899", rot: 10 },
  { type: "rect", x: 55, y: 90, w: 18, h: 9,  color: "#7c3aed", rot: 22 },
  { type: "rect", x: 38, y: 92, w: 14, h: 7,  color: "#f43f5e", rot: -8 },
  { type: "rect", x: 76, y: 88, w: 16, h: 8,  color: "#34d399", rot: 32 },
  { type: "rect", x: 16, y: 85, w: 20, h: 10, color: "#60a5fa", rot: -20 },
  // Круглые конфетти
  { type: "circle", x: 9,  y: 33, r: 10, color: "#facc15" },
  { type: "circle", x: 17, y: 53, r: 8,  color: "#f97316" },
  { type: "circle", x: 7,  y: 90, r: 12, color: "#7c3aed" },
  { type: "circle", x: 94, y: 43, r: 10, color: "#ec4899" },
  { type: "circle", x: 81, y: 80, r: 12, color: "#60a5fa" },
  { type: "circle", x: 37, y: 5,  r: 8,  color: "#34d399" },
  { type: "circle", x: 57, y: 3,  r: 10, color: "#f43f5e" },
  { type: "circle", x: 79, y: 4,  r: 8,  color: "#a855f7" },
  { type: "circle", x: 50, y: 94, r: 9,  color: "#fb923c" },
  { type: "circle", x: 30, y: 96, r: 7,  color: "#facc15" },
  { type: "circle", x: 65, y: 93, r: 11, color: "#ec4899" },
  // Ленточки
  { type: "ribbon", x: 3,  y: 15, w: 32, h: 5, color: "#f43f5e", rot: 30 },
  { type: "ribbon", x: 84, y: 20, w: 36, h: 5, color: "#7c3aed", rot: -28 },
  { type: "ribbon", x: 5,  y: 67, w: 30, h: 4, color: "#facc15", rot: 20 },
  { type: "ribbon", x: 87, y: 63, w: 34, h: 5, color: "#f97316", rot: -20 },
  { type: "ribbon", x: 19, y: 91, w: 28, h: 4, color: "#ec4899", rot: 15 },
  { type: "ribbon", x: 71, y: 91, w: 32, h: 5, color: "#60a5fa", rot: -12 },
  { type: "ribbon", x: 29, y: 3,  w: 26, h: 4, color: "#fb923c", rot: -5 },
  { type: "ribbon", x: 59, y: 7,  w: 24, h: 4, color: "#a855f7", rot: 18 },
  { type: "ribbon", x: 47, y: 95, w: 20, h: 3, color: "#34d399", rot: -25 },
  // Звёздочки (эмодзи)
  { type: "emoji", x: 1,  y: 28, emoji: "⭐", size: 28 },
  { type: "emoji", x: 97, y: 18, emoji: "✨", size: 24 },
  { type: "emoji", x: 96, y: 60, emoji: "⭐", size: 30 },
  { type: "emoji", x: 2,  y: 68, emoji: "🌟", size: 26 },
  { type: "emoji", x: 50, y: 1,  emoji: "✨", size: 22 },
  { type: "emoji", x: 34, y: 2,  emoji: "⭐", size: 26 },
  { type: "emoji", x: 62, y: 1,  emoji: "🌟", size: 24 },
  { type: "emoji", x: 22, y: 94, emoji: "✨", size: 22 },
  { type: "emoji", x: 78, y: 94, emoji: "⭐", size: 28 },
  // Праздничные стикеры
  { type: "emoji", x: 0,  y: 55, emoji: "🎉", size: 32 },
  { type: "emoji", x: 97, y: 75, emoji: "🎊", size: 30 },
  { type: "emoji", x: 42, y: 0,  emoji: "🎈", size: 28 },
  { type: "emoji", x: 55, y: 97, emoji: "🎁", size: 26 },
  { type: "emoji", x: 86, y: 96, emoji: "🎉", size: 28 },
  { type: "emoji", x: 10, y: 97, emoji: "🎊", size: 24 },
]

function ConfettiLayer() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {CONFETTI.map((c, i) => {
        if (c.type === "emoji") {
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${c.x}%`, top: `${c.y}%`,
              fontSize: c.size,
              lineHeight: 1,
              opacity: 0.88,
              userSelect: "none",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.15))",
            }}>{c.emoji}</div>
          )
        }
        if (c.type === "circle") {
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${c.x}%`, top: `${c.y}%`,
              width: c.r! * 2, height: c.r! * 2,
              borderRadius: "50%",
              background: c.color,
              opacity: 0.75,
            }} />
          )
        }
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: c.h,
            background: c.color,
            borderRadius: c.type === "ribbon" ? 3 : 2,
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.78,
          }} />
        )
      })}
    </div>
  )
}

export function Hero() {
  const navigate = useNavigate()

  return (
    <section style={{
      width: "100%", minHeight: "100vh",
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
      position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <ConfettiLayer />

      {/* Заголовок */}
      <div style={{ textAlign: "center", lineHeight: 1.05, marginTop: "-8vh", position: "relative", zIndex: 3 }}>
        <div style={{
          fontSize: "clamp(44px, 6.5vw, 105px)", fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif", color: "#3b0f9e",
          letterSpacing: "-0.5px", textShadow: "0 3px 0 rgba(255,255,255,0.4)",
          marginBottom: "-0.05em", transform: "scaleY(1.15)", display: "block",
        }}>Воздушные</div>
        <div style={{
          fontSize: "clamp(60px, 8.5vw, 136px)", fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.5px",
          lineHeight: 0.9, transform: "scaleY(1.15)", display: "block",
          background: "linear-gradient(105deg, #5b21b6 0%, #7c3aed 25%, #db2777 60%, #f97316 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", textShadow: "none",
        }}>шарики</div>
      </div>

      {/* Подпись */}
      <div style={{
        textAlign: "center", marginTop: "clamp(24px, 4vh, 44px)", lineHeight: 1.35,
        fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 500,
        fontFamily: "'Montserrat', sans-serif", color: "#3d2070",
        position: "relative", zIndex: 3,
      }}>
        <div>Стильные композиции</div>
        <div>из шаров <span style={{ color: "#e63000", fontWeight: 700 }}>с доставкой</span></div>
      </div>

      {/* Кнопка */}
      <button
        onClick={() => navigate("/catalog")}
        style={{
          marginTop: "clamp(24px, 4vh, 52px)", display: "flex", alignItems: "center", gap: 14,
          background: "linear-gradient(160deg, #ff7a10 0%, #e63000 100%)", color: "#fff",
          border: "4px solid #c44a00", borderRadius: 999,
          padding: "clamp(10px, 1.4vh, 16px) clamp(28px, 3.5vw, 56px)",
          fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 700,
          fontFamily: "'Nunito', sans-serif", cursor: "pointer",
          boxShadow: "0 8px 0 #a33a00, 0 10px 32px rgba(180,60,0,0.45)",
          transition: "transform 0.15s, box-shadow 0.15s", whiteSpace: "nowrap",
          position: "relative", zIndex: 3,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px) scale(1.04)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 11px 0 #a33a00, 0 14px 40px rgba(180,60,0,0.55)"
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 0 #a33a00, 0 10px 32px rgba(180,60,0,0.45)"
        }}
        onMouseDown={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(5px)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 3px 0 #a33a00, 0 4px 16px rgba(180,60,0,0.35)"
        }}
        onMouseUp={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 0 #a33a00, 0 10px 32px rgba(180,60,0,0.45)"
        }}
      >Смотреть каталог →</button>

      {/* Нижняя полоса */}
      <div style={{
        position: "absolute", bottom: "3%", left: 0, right: 0,
        background: "rgba(237,233,254,0.95)", backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(167,139,250,0.3)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(10px,1.6vh,18px) clamp(16px,2.2vw,36px)",
        flexWrap: "nowrap", gap: 12, zIndex: 10,
      }}>
        {/* СЛЕВА: Работаем + Адрес */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,32px)", flexWrap: "wrap", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 50, height: 50, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, color: "#fff", flexShrink: 0,
            }}>🕐</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(14px,1.3vw,18px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>Работаем 24/7</div>
              <div style={{ fontSize: "clamp(12px,1.05vw,15px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>без выходных</div>
            </div>
          </div>
          <div style={{ width: 2, height: 44, background: "rgba(124,58,237,0.25)", borderRadius: 2, flexShrink: 0 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 50, height: 50, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, color: "#fff", flexShrink: 0,
            }}>📍</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(14px,1.3vw,18px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>ул. Героя Яцкова, 19к3</div>
              <div style={{ fontSize: "clamp(12px,1.05vw,15px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>г. Краснодар</div>
            </div>
          </div>
        </div>

        {/* СПРАВА: Соцсети */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,0.8vw,12px)", flexWrap: "wrap" }}>
          {[
            { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366",
              icon: <svg width="20" height="20" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4c-2.18 0-4.22-.6-5.96-1.64l-.42-.26-4.42 1.04 1.06-4.3-.28-.44A11.38 11.38 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.26-8.54c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
            { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.85c-.7 0-.91-.56-2.16-1.81-1.09-1.05-1.57-.93-1.57.22v1.65c0 .39-.13.62-1.18.62-1.74 0-3.67-1.05-5.03-3.01C4.42 10.5 4 8.5 4 8.5s0-.23.25-.23h1.85c.68 0 .94.31 1.19 1.04.65 1.9 1.74 3.57 2.19 3.57.17 0 .25-.08.25-.5V10.1c-.06-1.06-.62-1.15-.62-1.53 0-.21.17-.42.45-.42h2.9c.38 0 .51.21.51.66v3.12c0 .38.17.51.28.51.17 0 .31-.13.62-.44 1.07-1.2 1.83-3.06 1.83-3.06.1-.23.3-.44.68-.44h1.85c.56 0 .68.29.56.67-.23.97-2.42 4.14-2.42 4.14-.19.31-.26.45 0 .79.19.26.8.79 1.21 1.27.74.84 1.31 1.55 1.46 2.04.17.49-.08.74-.57.74z"/></svg> },
            { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
            { label: "Max", href: "https://vk.com/sharovik_krd", bg: "#1e3a5f",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg> },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: s.bg, borderRadius: 999,
                padding: "clamp(9px,1.1vh,13px) clamp(12px,1.4vw,20px)",
                fontWeight: 700, fontSize: "clamp(13px,1.05vw,15px)",
                fontFamily: "'Montserrat',sans-serif", color: "#fff",
                textDecoration: "none", boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                transition: "transform 0.15s, box-shadow 0.15s", flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.05)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(0,0,0,0.28)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)"
              }}
            >
              {s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fda3455-48ed-4479-b42c-5dac5056af85.png"

export function Hero() {
  const navigate = useNavigate()

  return (
    <section style={{
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Заголовок */}
      <div style={{
        textAlign: "center",
        lineHeight: 1.05,
        marginTop: "-8vh",
      }}>
        <div style={{
          fontSize: "clamp(44px, 6.5vw, 105px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          color: "#3b0f9e",
          letterSpacing: "-0.5px",
          textShadow: "0 3px 0 rgba(255,255,255,0.4)",
          marginBottom: "-0.05em",
          transform: "scaleY(1.15)",
          display: "block",
        }}>
          Воздушные
        </div>
        <div style={{
          fontSize: "clamp(60px, 8.5vw, 136px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.5px",
          lineHeight: 0.9,
          transform: "scaleY(1.15)",
          display: "block",
          background: "linear-gradient(105deg, #5b21b6 0%, #7c3aed 25%, #db2777 60%, #f97316 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
        }}>
          шарики
        </div>
      </div>

      {/* Подпись */}
      <div style={{
        textAlign: "center",
        marginTop: "clamp(24px, 4vh, 44px)",
        lineHeight: 1.35,
        fontSize: "clamp(20px, 2.2vw, 32px)",
        fontWeight: 500,
        fontFamily: "'Montserrat', sans-serif",
        color: "#3d2070",
      }}>
        <div>Стильные композиции</div>
        <div>из шаров <span style={{ color: "#e63000", fontWeight: 700 }}>с доставкой</span></div>
      </div>

      {/* Кнопка "Смотреть каталог" */}
      <button
        onClick={() => navigate("/catalog")}
        style={{
          marginTop: "clamp(24px, 4vh, 52px)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "linear-gradient(160deg, #ff7a10 0%, #e63000 100%)",
          color: "#fff",
          border: "4px solid #c44a00",
          borderRadius: 999,
          padding: "clamp(10px, 1.4vh, 16px) clamp(28px, 3.5vw, 56px)",
          fontSize: "clamp(20px, 2.4vw, 34px)",
          fontWeight: 700,
          fontFamily: "'Nunito', sans-serif",
          cursor: "pointer",
          boxShadow: "0 8px 0 #a33a00, 0 10px 32px rgba(180,60,0,0.45)",
          transition: "transform 0.15s, box-shadow 0.15s",
          whiteSpace: "nowrap",
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
      >
        Смотреть каталог →
      </button>

      {/* Нижняя полоса */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(10px,1.4vh,18px) clamp(20px,3vw,48px)",
        flexWrap: "wrap",
        gap: 10,
        zIndex: 10,
      }}>

        {/* Работаем + Адрес */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px,2.5vw,36px)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "#fff", flexShrink: 0,
            }}>🕐</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(12px,1.1vw,15px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>Работаем 24/7</div>
              <div style={{ fontSize: "clamp(10px,0.9vw,13px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>без выходных</div>
            </div>
          </div>

          <div style={{ width: 1, height: 36, background: "#e5e7eb", flexShrink: 0 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "#fff", flexShrink: 0,
            }}>📍</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(12px,1.1vw,15px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>ул. Героя Яцкова, 19к3</div>
              <div style={{ fontSize: "clamp(10px,0.9vw,13px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>г. Краснодар</div>
            </div>
          </div>
        </div>

        {/* Соцсети */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,0.9vw,12px)", flexWrap: "wrap" }}>
          {[
            { label: "WhatsApp",  href: "https://wa.me/79885973303", bg: "#25D366" },
            { label: "Telegram",  href: "https://t.me/sharovik_krd",  bg: "#229ED9" },
            { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF" },
            { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
            { label: "Max",       href: "#", bg: "linear-gradient(135deg,#3b82f6,#8b5cf6)" },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: s.bg,
                color: "#fff",
                borderRadius: 999,
                padding: "clamp(8px,1vh,12px) clamp(12px,1.4vw,20px)",
                fontWeight: 700,
                fontSize: "clamp(12px,1.1vw,15px)",
                fontFamily: "'Montserrat',sans-serif",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(0,0,0,0.25)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)"
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
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
        bottom: "3%", left: 0, right: 0,
        background: "rgba(237,233,254,0.95)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(167,139,250,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(10px,1.6vh,18px) clamp(20px,2.5vw,44px)",
        flexWrap: "nowrap",
        gap: 16,
        zIndex: 10,
      }}>

        {/* Работаем + Адрес */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px,3vw,44px)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 48, height: 48, borderRadius: "50%",
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
              width: 48, height: 48, borderRadius: "50%",
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

        {/* Соцсети */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(7px,1vw,14px)", flexWrap: "wrap" }}>
          {[
            { label: "WhatsApp",  href: "https://wa.me/79885973303", bg: "#25D366",
              icon: <svg width="18" height="18" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4c-2.18 0-4.22-.6-5.96-1.64l-.42-.26-4.42 1.04 1.06-4.3-.28-.44A11.38 11.38 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.26-8.54c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
            { label: "Telegram",  href: "https://t.me/sharovik_krd", bg: "#229ED9",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.85c-.7 0-.91-.56-2.16-1.81-1.09-1.05-1.57-.93-1.57.22v1.65c0 .39-.13.62-1.18.62-1.74 0-3.67-1.05-5.03-3.01C4.42 10.5 4 8.5 4 8.5s0-.23.25-.23h1.85c.68 0 .94.31 1.19 1.04.65 1.88 1.73 3.53 2.18 3.53.17 0 .24-.08.24-.52V10.3c-.06-1.11-.65-1.2-.65-1.6 0-.22.18-.44.46-.44h2.91c.49 0 .67.26.67.83v2.81c0 .49.22.67.34.67.17 0 .35-.18.69-.52 1.07-1.2 1.84-3.05 1.84-3.05.1-.21.28-.41.97-.41h1.85c.56 0 .68.29.56.68-.22 1.04-2.37 4.07-2.37 4.07-.19.3-.26.44 0 .77.18.25 1.04 1.04 1.57 1.67.97 1.09 1.71 2.01 1.91 2.64.18.62-.16.93-.72.93z"/></svg> },
            { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
            { label: "Max", href: "#", bg: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              icon: <img src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2855267-b382-4ddd-b7f8-f179ae031524.png" width="20" height="20" style={{borderRadius:5, objectFit:"cover", flexShrink:0}} /> },
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
                padding: "clamp(7px,0.9vh,11px) clamp(10px,1.1vw,16px)",
                fontWeight: 700,
                fontSize: "clamp(12px,1vw,14px)",
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
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
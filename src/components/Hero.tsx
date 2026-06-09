import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fda3455-48ed-4479-b42c-5dac5056af85.png"
const LOGO = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2b7aa5e7-076f-477e-9c08-2524b06cad6a.png"

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
      {/* ── ШАПКА: логотип + навигация + телефон ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 24px 6px 8px",
        zIndex: 20,
      }}>
        {/* Логотип */}
        <img
          src={LOGO}
          alt="Шаровик Затейник"
          onClick={() => navigate("/")}
          style={{
            height: "clamp(70px, 10vw, 130px)",
            width: "auto",
            cursor: "pointer",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
            flexShrink: 0,
          }}
        />

        {/* Навигация */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(6px, 1.8vw, 28px)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          {[
            { label: "О нас", path: "/about", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            { label: "Прайс", path: "/contacts", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg> },
            { label: "Каталог", path: "/catalog", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
            { label: "Отзывы", path: "#popular", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            { label: "Доставка", path: "/delivery", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.path === "#popular") {
                  document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" })
                } else {
                  navigate(item.path)
                }
              }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "transparent", border: "none", cursor: "pointer",
                padding: "6px 4px",
                fontSize: "clamp(14px, 1.35vw, 19px)",
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                color: "#3b1fa3",
                whiteSpace: "nowrap",
                transition: "color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#7c3aed"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#3b1fa3"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
              }}
            >
              <span style={{
                width: "clamp(30px, 3vw, 42px)",
                height: "clamp(30px, 3vw, 42px)",
                borderRadius: "50%",
                background: "rgba(124,58,237,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{item.svg}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Телефон */}
        <a
          href="tel:+79880653700"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            borderRadius: 999,
            padding: "clamp(8px,1vh,12px) clamp(12px,1.5vw,22px)",
            fontWeight: 800,
            fontSize: "clamp(12px, 1.15vw, 16px)",
            fontFamily: "'Montserrat', sans-serif",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            animation: "phonePulse 2s infinite",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        >
          📞 +7 988 065 37 00
        </a>
      </div>

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

    </section>
  )
}
import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/61d08530-2a08-4c66-a266-998c2b9d942c.png"
const LOGO = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17df5f55-b7b9-42ca-bc99-28f55f0241b7.png"

const NAV_ITEMS = [
  { label: "О нас",     icon: "⭐", path: "/about" },
  { label: "Прайс",    icon: "🎁", path: "/contacts" },
  { label: "Каталог",  icon: "🎈", path: "/catalog" },
  { label: "Отзывы",   icon: "💬", path: "#popular" },
  { label: "Доставка", icon: "🚚", path: "/delivery" },
]

const SOCIALS = [
  { label: "WhatsApp",  href: "https://wa.me/79885973303", bg: "#25D366" },
  { label: "Telegram",  href: "#", bg: "#229ED9" },
  { label: "ВКонтакте", href: "#", bg: "#0077FF" },
  { label: "Instagram", href: "#", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
  { label: "Max",       href: "#", bg: "linear-gradient(135deg,#3b82f6,#8b5cf6)" },
]

export function Hero() {
  const navigate = useNavigate()

  const go = (path: string) => {
    if (path === "#popular") {
      const el = document.getElementById("popular")
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate(path)
    }
  }

  return (
    <>
      {/* ══════════════════════════════════
          ФИКСИРОВАННАЯ ШАПКА
      ══════════════════════════════════ */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 24px 6px 12px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(2px)",
      }}>

        {/* Логотип */}
        <img
          src={LOGO}
          alt="Шаровик Затейник"
          onClick={() => navigate("/")}
          style={{
            height: "clamp(60px, 9vw, 110px)",
            width: "auto",
            cursor: "pointer",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
            flexShrink: 0,
          }}
        />

        {/* Навигация по центру */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(4px, 1.6vw, 24px)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "50%",
          marginTop: "-4px",
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 4px",
                fontSize: "clamp(12px, 1.15vw, 16px)",
                fontWeight: 700,
                color: "#3b1fa3",
                whiteSpace: "nowrap",
                transition: "color 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#7c3aed"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#3b1fa3"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
              }}
            >
              <span style={{
                width: "clamp(24px, 2.4vw, 34px)",
                height: "clamp(24px, 2.4vw, 34px)",
                borderRadius: "50%",
                background: "rgba(124,58,237,0.13)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(11px, 1vw, 15px)",
              }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Телефон — пульсирующий */}
        <a
          href="tel:+79880653700"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            borderRadius: 999,
            padding: "clamp(8px,1vh,13px) clamp(12px,1.5vw,22px)",
            fontWeight: 800,
            fontSize: "clamp(12px, 1.15vw, 16px)",
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
      </header>

      {/* ══════════════════════════════════
          HERO-СЕКЦИЯ (фон + кнопка каталога)
      ══════════════════════════════════ */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Кнопка "Смотреть каталог" */}
        <div style={{
          position: "absolute",
          top: "57%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}>
          <button
            onClick={() => navigate("/catalog")}
            style={{
              background: "linear-gradient(160deg, #ff6a00 0%, #e63000 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "clamp(12px,1.8vh,20px) clamp(36px,5vw,80px)",
              fontSize: "clamp(15px, 1.7vw, 24px)",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 6px 32px rgba(230,90,0,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 44px rgba(230,90,0,0.7)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)"
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(230,90,0,0.5)"
            }}
          >
            Смотреть каталог →
          </button>
        </div>

        {/* ── НИЖНЯЯ ПОЛОСА ── */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(8px,1.2vh,14px) clamp(16px,3vw,40px)",
          zIndex: 10,
          gap: 12,
          flexWrap: "wrap",
        }}>

          {/* Левая часть: Режим работы + Адрес */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#fff", flexShrink: 0,
              }}>🕐</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "clamp(12px,1.1vw,15px)", color: "#1e1b4b" }}>Работаем 24/7</div>
                <div style={{ fontSize: "clamp(10px,0.9vw,13px)", color: "#6b7280" }}>без выходных</div>
              </div>
            </div>

            <div style={{ width: 1, height: 36, background: "#e5e7eb" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#fff", flexShrink: 0,
              }}>📍</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "clamp(12px,1.1vw,15px)", color: "#1e1b4b" }}>ул. Героя Яцкова, 19к3</div>
                <div style={{ fontSize: "clamp(10px,0.9vw,13px)", color: "#6b7280" }}>г. Краснодар</div>
              </div>
            </div>
          </div>

          {/* Правая часть: Соцсети */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(5px,0.8vw,10px)", flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: s.bg,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "clamp(7px,0.9vh,11px) clamp(10px,1.3vw,18px)",
                  fontWeight: 700,
                  fontSize: "clamp(11px,1vw,14px)",
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
    </>
  )
}

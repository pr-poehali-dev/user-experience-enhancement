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
      {/* ── ФИКСИРОВАННАЯ ШАПКА ── */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "4px 20px 4px 8px",
        background: "transparent",
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

        {/* Навигация — по центру, прижата к верху */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(6px, 1.8vw, 26px)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "8px",
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "5px 6px",
                fontSize: "clamp(13px, 1.3vw, 18px)",
                fontWeight: 700,
                color: "#3b1fa3",
                whiteSpace: "nowrap",
                transition: "color 0.2s, transform 0.2s",
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
                width: "clamp(28px, 2.8vw, 38px)",
                height: "clamp(28px, 2.8vw, 38px)",
                borderRadius: "50%",
                background: "rgba(124,58,237,0.13)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(13px, 1.2vw, 17px)",
              }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Телефон — пульсирующий, прижат к верху */}
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
            fontSize: "clamp(12px, 1.2vw, 17px)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginTop: "8px",
            animation: "phonePulse 2s infinite",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        >
          📞 +7 988 065 37 00
        </a>
      </header>

      {/* ── HERO-СЕКЦИЯ ── */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>

        {/* Смотреть каталог */}
        <div style={{
          position: "absolute",
          top: "62%",
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

        {/* Соцсети — без фона, плавают над картинкой */}
        <div style={{
          position: "absolute",
          bottom: "3%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(6px, 0.9vw, 12px)",
          zIndex: 10,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
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
                padding: "clamp(8px,1vh,12px) clamp(12px,1.5vw,20px)",
                fontWeight: 700,
                fontSize: "clamp(12px,1.1vw,15px)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 5px 20px rgba(0,0,0,0.28)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)"
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

      </section>
    </>
  )
}

import { useNavigate, useLocation } from "react-router-dom"

const HERO_VIDEO = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1f9a1b9-1b85-4a2c-b686-06f9d21e66d7.mp4"
const HERO_MOBILE_IMAGE = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6471b1ef-189c-49d4-80c7-fd78a99cfd33.jpg"

export function Hero() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToCatalogCta = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("catalog-cta")
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/#catalog-cta")
    }
  }

  return (
    <section
      className="relative w-full overflow-hidden mt-[58px] md:mt-[84px]"
      style={{
        background: "radial-gradient(ellipse 90% 70% at 15% 15%, #f3ebff 0%, transparent 55%), radial-gradient(ellipse 80% 80% at 90% 85%, #fbeafd 0%, transparent 55%), linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)",
      }}
    >
      {/* Декоративные звёзды-конфетти */}
      <span className="hidden lg:block absolute" style={{ top: "8%", left: "6%", fontSize: 20, color: "#c4a3f7" }}>✦</span>
      <span className="hidden lg:block absolute" style={{ top: "18%", left: "38%", fontSize: 14, color: "#e3b8ea" }}>✦</span>
      <span className="hidden lg:block absolute" style={{ bottom: "12%", left: "10%", fontSize: 16, color: "#c4a3f7" }}>✦</span>
      <span className="hidden lg:block absolute" style={{ top: "10%", left: "48%", fontSize: 12, color: "#e3b8ea" }}>✦</span>
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Левая часть — текст */}
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-0"
          style={{ minHeight: "min(760px, 90vh)" }}
        >
          <div className="relative">
            <span
              className="absolute -top-6 left-1 text-2xl sm:text-3xl"
              style={{ color: "#a855f7" }}
            >✦</span>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                fontSize: "clamp(48px, 6.8vw, 88px)",
                lineHeight: 1.05,
                color: "#1a1024",
                letterSpacing: "-0.5px",
              }}
            >
              Воздушные<br />шары
            </h1>
            <div
              style={{
                fontFamily: "'Marck Script', cursive",
                fontSize: "clamp(34px, 4.8vw, 62px)",
                color: "#8b5cf6",
                lineHeight: 1.15,
                marginTop: "clamp(4px, 0.8vw, 10px)",
              }}
            >
              для особенных<br />моментов
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(17px, 1.35vw, 21px)",
              color: "#5c5468",
              lineHeight: 1.6,
              marginTop: "clamp(10px, 1.4vw, 18px)",
              maxWidth: 400,
            }}
          >
            Стильные композиции из шаров<br />
            с доставкой по Краснодару от 60 минут
          </p>

          <button
            onClick={goToCatalogCta}
            style={{
              marginTop: "clamp(18px, 2.4vw, 28px)",
              alignSelf: "flex-start",
              background: "#6d28d9",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "clamp(18px,2vw,22px) clamp(40px,4vw,60px)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              letterSpacing: "1.2px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(109,40,217,0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px rgba(109,40,217,0.36)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = ""
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(109,40,217,0.28)"
            }}
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </button>
        </div>

        {/* Правая часть — видео (десктоп) / фото (мобильные) */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "min(760px, 90vh)" }}
        >
          <video
            src={HERO_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={HERO_MOBILE_IMAGE}
            alt="Воздушные шары"
            className="block lg:hidden absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/14cfdc07-c8b3-464d-acc0-c6a7ecde14e1.png"
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
      {/* Логотип слева сверху */}
      <img
        src={LOGO}
        alt="Шаровик Затейник"
        style={{
          position: "absolute",
          top: "clamp(8px, 1.5vh, 20px)",
          left: "clamp(8px, 1.5vw, 24px)",
          height: "clamp(80px, 11vw, 150px)",
          width: "auto",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
        }}
      />

      {/* Заголовок */}
      <div style={{
        textAlign: "center",
        lineHeight: 1.05,
        marginTop: "-20vh",
      }}>
        <div style={{
          fontSize: "clamp(44px, 6.5vw, 105px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          color: "#3b0f9e",
          letterSpacing: "-0.5px",
          textShadow: "0 3px 0 rgba(255,255,255,0.4)",
          marginBottom: "-0.05em",
        }}>
          Воздушные
        </div>
        <div style={{
          fontSize: "clamp(60px, 8.5vw, 136px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.5px",
          lineHeight: 0.9,
          background: "linear-gradient(105deg, #5b21b6 0%, #7c3aed 25%, #db2777 60%, #f97316 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
        }}>
          шарики
        </div>
      </div>

      {/* Кнопка "Смотреть каталог" */}
      <button
        onClick={() => navigate("/catalog")}
        style={{
          marginTop: "clamp(20px, 3vh, 40px)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "linear-gradient(160deg, #ff6a00 0%, #e63000 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          padding: "clamp(14px, 2vh, 22px) clamp(40px, 5vw, 80px)",
          fontSize: "clamp(16px, 1.8vw, 26px)",
          fontWeight: 700,
          fontFamily: "'Montserrat', sans-serif",
          cursor: "pointer",
          boxShadow: "0 6px 32px rgba(230,90,0,0.45)",
          transition: "transform 0.2s, box-shadow 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 44px rgba(230,90,0,0.65)"
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(230,90,0,0.45)"
        }}
      >
        Смотреть каталог →
      </button>

    </section>
  )
}

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/14cfdc07-c8b3-464d-acc0-c6a7ecde14e1.png"

export function Hero() {
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
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Заголовок по центру */}
      <div style={{
        textAlign: "center",
        lineHeight: 1,
      }}>
        <div style={{
          fontSize: "clamp(48px, 7vw, 110px)",
          fontWeight: 900,
          color: "#4c1d95",
          letterSpacing: "-1px",
          textShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          Воздушные
        </div>
        <div style={{
          fontSize: "clamp(56px, 8.5vw, 130px)",
          fontWeight: 900,
          letterSpacing: "-1px",
          background: "linear-gradient(100deg, #6d28d9 30%, #ec4899 60%, #f97316 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          шарики
        </div>
      </div>
    </section>
  )
}

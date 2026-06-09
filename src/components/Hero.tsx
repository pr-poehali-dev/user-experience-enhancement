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
      <div style={{
        textAlign: "center",
        lineHeight: 1.05,
        marginTop: "-12vh",
      }}>
        <div style={{
          fontSize: "clamp(44px, 6.5vw, 105px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          color: "#3b0f9e",
          letterSpacing: "-0.5px",
          textShadow: "0 3px 0 rgba(255,255,255,0.4)",
          marginBottom: "0.05em",
        }}>
          Воздушные
        </div>
        <div style={{
          fontSize: "clamp(56px, 8vw, 128px)",
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.5px",
          background: "linear-gradient(105deg, #5b21b6 0%, #7c3aed 25%, #db2777 60%, #f97316 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
        }}>
          шарики
        </div>
      </div>
    </section>
  )
}
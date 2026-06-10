import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fda3455-48ed-4479-b42c-5dac5056af85.png"

const PARTICLES = [
  { emoji: "🎁", x: 8, y: 12, size: 28, dur: 7, delay: 0 },
  { emoji: "⭐", x: 18, y: 6, size: 20, dur: 6, delay: 1 },
  { emoji: "🎉", x: 75, y: 10, size: 26, dur: 8, delay: 0.5 },
  { emoji: "✨", x: 85, y: 20, size: 18, dur: 5, delay: 2 },
  { emoji: "🎁", x: 90, y: 55, size: 24, dur: 9, delay: 1.5 },
  { emoji: "⭐", x: 5, y: 50, size: 22, dur: 7, delay: 3 },
  { emoji: "🎊", x: 60, y: 5, size: 20, dur: 6, delay: 0.8 },
  { emoji: "✨", x: 30, y: 8, size: 16, dur: 5, delay: 2.5 },
  { emoji: "🎁", x: 50, y: 15, size: 22, dur: 8, delay: 1.2 },
  { emoji: "⭐", x: 95, y: 35, size: 18, dur: 6, delay: 0.3 },
  { emoji: "🎉", x: 12, y: 80, size: 20, dur: 7, delay: 2 },
  { emoji: "🌟", x: 70, y: 75, size: 22, dur: 9, delay: 0.7 },
  { emoji: "✨", x: 40, y: 88, size: 16, dur: 5, delay: 3.5 },
  { emoji: "🎁", x: 22, y: 35, size: 18, dur: 7, delay: 1.8 },
  { emoji: "⭐", x: 82, y: 88, size: 20, dur: 6, delay: 2.2 },
]

export function Hero() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const confetti: Array<{
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; rotation: number; rotSpeed: number
    }> = []

    const colors = ["#f97316", "#7c3aed", "#ec4899", "#facc15", "#34d399", "#60a5fa", "#f43f5e"]

    for (let i = 0; i < 60; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      confetti.forEach((c) => {
        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.rotate(c.rotation)
        ctx.fillStyle = c.color
        ctx.globalAlpha = 0.75
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.5)
        ctx.restore()
        c.x += c.vx
        c.y += c.vy
        c.rotation += c.rotSpeed
        if (c.y > canvas.height + 20) {
          c.y = -20
          c.x = Math.random() * canvas.width
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

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
      overflow: "hidden",
    }}>
      {/* Конфетти canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Плавающие эмодзи */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            zIndex: 2,
            pointerEvents: "none",
            animation: `floatParticle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.18))",
            opacity: 0.85,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Заголовок */}
      <div style={{ textAlign: "center", lineHeight: 1.05, marginTop: "-8vh", position: "relative", zIndex: 3 }}>
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
        position: "relative",
        zIndex: 3,
      }}>
        <div>Стильные композиции</div>
        <div>из шаров <span style={{ color: "#e63000", fontWeight: 700 }}>с доставкой</span></div>
      </div>

      {/* Кнопка */}
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
          position: "relative",
          zIndex: 3,
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

        {/* СЛЕВА: Работаем + Адрес */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,32px)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#fff", flexShrink: 0,
            }}>🕐</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(13px,1.2vw,17px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>Работаем 24/7</div>
              <div style={{ fontSize: "clamp(11px,1vw,14px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>без выходных</div>
            </div>
          </div>

          <div style={{ width: 2, height: 44, background: "rgba(124,58,237,0.25)", borderRadius: 2, flexShrink: 0 }} className="hidden sm:block" />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#fff", flexShrink: 0,
            }}>📍</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "clamp(13px,1.2vw,17px)", color: "#1e1b4b", fontFamily: "'Montserrat',sans-serif" }}>ул. Героя Яцкова, 19к3</div>
              <div style={{ fontSize: "clamp(11px,1vw,14px)", color: "#6b7280", fontFamily: "'Montserrat',sans-serif" }}>г. Краснодар</div>
            </div>
          </div>
        </div>

        {/* СПРАВА: Соцсети */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1.2vw,16px)", flexWrap: "wrap" }}>
          {[
            { label: "WhatsApp",  href: "https://wa.me/79885973303", bg: "#25D366",
              icon: <svg width="22" height="22" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4c-2.18 0-4.22-.6-5.96-1.64l-.42-.26-4.42 1.04 1.06-4.3-.28-.44A11.38 11.38 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.26-8.54c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
            { label: "Telegram",  href: "https://t.me/sharovik_krd", bg: "#229ED9",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.85c-.7 0-.91-.56-2.16-1.81-1.09-1.05-1.57-.93-1.57.22v1.65c0 .39-.13.62-1.18.62-1.74 0-3.67-1.05-5.03-3.01C4.42 10.5 4 8.5 4 8.5s0-.23.25-.23h1.85c.68 0 .94.31 1.19 1.04.65 1.9 1.74 3.57 2.19 3.57.17 0 .25-.08.25-.5V10.1c-.06-1.06-.62-1.15-.62-1.53 0-.21.17-.42.45-.42h2.9c.38 0 .51.21.51.66v3.12c0 .38.17.51.28.51.17 0 .31-.13.62-.44 1.07-1.2 1.83-3.06 1.83-3.06.1-.23.3-.44.68-.44h1.85c.56 0 .68.29.56.67-.23.97-2.42 4.14-2.42 4.14-.19.31-.26.45 0 .79.19.26.8.79 1.21 1.27.74.84 1.31 1.55 1.46 2.04.17.49-.08.74-.57.74z"/></svg> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: s.bg,
                borderRadius: 999,
                padding: "clamp(8px,1vh,12px) clamp(12px,1.4vw,22px)",
                fontWeight: 700,
                fontSize: "clamp(13px,1.05vw,15px)",
                fontFamily: "'Montserrat',sans-serif",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                transition: "transform 0.15s, box-shadow 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.05)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(0,0,0,0.28)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 3px 10px rgba(0,0,0,0.18)"
              }}
            >
              {s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          33% { transform: translateY(-18px) rotate(8deg); opacity: 1; }
          66% { transform: translateY(-8px) rotate(-6deg); opacity: 0.9; }
        }
      `}</style>
    </section>
  )
}
import { useState } from "react"

const SOCIALS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/79885973303",
    bg: "#25D366",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.26 19.86c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/sharovik_krd",
    bg: "#229ED9",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "Max",
    href: "https://vk.com/sharovik_krd",
    bg: "#1e3a5f",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="Arial">M</text>
      </svg>
    ),
  },
]

export function FloatingSocials() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
      {open && (
        <>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="flex items-center gap-2 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-110 animate-in fade-in slide-in-from-bottom-2 duration-200"
              style={{ background: s.bg, boxShadow: "0 4px 16px rgba(0,0,0,0.22)" }}
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          padding: open ? "0" : "10px 10px 10px 20px",
          width: open ? 64 : "auto",
          height: 64,
          justifyContent: "center",
          background: open ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "linear-gradient(135deg,#7c3aed,#a855f7)",
          boxShadow: "0 6px 28px rgba(124,58,237,0.45)",
          transition: "all 0.25s ease",
          animation: open ? "none" : "phonePulse 2.5s ease-in-out infinite",
        }}
        aria-label={open ? "Закрыть" : "Напишите нам"}
      >
        {!open && (
          <span style={{
            color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
            fontSize: 14, whiteSpace: "nowrap",
          }}>
            Напишите нам
          </span>
        )}
        <span
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 44, height: 44, background: "rgba(255,255,255,0.16)" }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 4h16v12H5.17L4 17.17V4zm2 5h12v2H6zm0-3h12v2H6zm0 6h8v2H6z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}
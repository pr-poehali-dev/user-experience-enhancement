import { useState } from "react"
import Icon from "@/components/ui/icon"

const contacts = [
  {
    label: "Max",
    href: "#",
    icon: "Flame",
    bg: "#1e3a5f",
  },
  {
    label: "Telegram",
    href: "#",
    icon: "Send",
    bg: "linear-gradient(135deg, #60a5fa, #3b82f6)",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "Instagram",
    bg: "linear-gradient(135deg, #ec4899, #9333ea)",
  },
  {
    label: "ВКонтакте",
    href: "#",
    icon: "MessageCircle",
    bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/79885973303",
    icon: "MessageSquare",
    bg: "linear-gradient(135deg, #4ade80, #16a34a)",
  },
  {
    label: "8 988 597 33 03",
    href: "tel:+79885973303",
    icon: "Phone",
    bg: "linear-gradient(135deg, #fb7185, #e11d48)",
  },
]

export function ContactFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      {/* Contact items */}
      {open && (
        <div className="flex flex-col items-end gap-2 mb-1">
          {contacts.slice().reverse().map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-lg text-white font-semibold text-sm sm:text-base hover:scale-105 transition-transform"
              style={{ background: c.bg }}
            >
              <Icon name={c.icon} size={16} />
              {c.label}
            </a>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full text-primary-foreground shadow-2xl transition-all flex items-center justify-center hover:scale-105 mb-12 sm:mb-14"
        style={{ background: "hsl(var(--primary))" }}
        aria-label="Связаться с нами"
      >
        <Icon name={open ? "X" : "MessageCircle"} size={26} />
      </button>

      {/* «Свяжитесь с нами» */}
      {!open && (
        <span
          className="absolute bottom-0 right-0 text-background font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl whitespace-nowrap shadow-xl pointer-events-none"
          style={{ background: "hsl(var(--foreground))", fontSize: "0.85rem" }}
        >
          Напишите нам
        </span>
      )}
    </div>
  )
}
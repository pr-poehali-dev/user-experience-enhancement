import { useState } from "react"
import Icon from "@/components/ui/icon"

const contacts = [
  {
    label: "Telegram",
    href: "#",
    icon: "Send",
    bg: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/79885973303",
    icon: "MessageSquare",
    bg: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    label: "Max",
    href: "#",
    icon: "Flame",
    bg: "bg-gradient-to-r from-orange-400 to-red-500",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "Instagram",
    bg: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    label: "ВКонтакте",
    href: "#",
    icon: "MessageCircle",
    bg: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    label: "8 988 597 33 03",
    href: "tel:+79885973303",
    icon: "Phone",
    bg: "bg-gradient-to-r from-rose-400 to-pink-600",
  },
]

export function ContactFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact items */}
      {open && (
        <div className="flex flex-col items-end gap-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-white font-semibold text-sm ${c.bg} hover:scale-105 transition-transform`}
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
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center"
        aria-label="Связаться с нами"
      >
        <Icon name={open ? "X" : "MessageCircle"} size={26} />
      </button>

      {!open && (
        <span className="absolute bottom-16 right-0 bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap shadow pointer-events-none">
          Свяжитесь с нами
        </span>
      )}
    </div>
  )
}

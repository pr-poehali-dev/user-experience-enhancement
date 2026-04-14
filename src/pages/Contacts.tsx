import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const phones = [
  { number: "8 988 597 33 03", href: "tel:+79885973303" },
  { number: "8 918 245 72 04", href: "tel:+79182457204" },
]

const socials = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", icon: "MessageSquare", gradient: "from-green-400 to-green-600", desc: "Ответим быстро" },
  { label: "Telegram", href: "#", icon: "Send", gradient: "from-blue-400 to-blue-600", desc: "Напишите нам" },
  { label: "ВКонтакте", href: "#", icon: "MessageCircle", gradient: "from-blue-600 to-blue-800", desc: "Мы во ВКонтакте" },
  { label: "Instagram", href: "#", icon: "Instagram", gradient: "from-pink-500 to-purple-600", desc: "Наши работы" },
  { label: "Max", href: "#", icon: "Flame", gradient: "from-slate-700 to-slate-900", desc: "Мы в Max" },
]

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-background">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon name="Phone" size={30} className="text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light mb-2">Связаться</h1>
          <p className="text-muted-foreground text-base">Ответим на любой вопрос</p>
        </div>

        {/* Phones */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">Телефоны</p>
          <div className="space-y-2">
            {phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-border shadow-sm hover:border-primary/40 hover:bg-rose-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-primary" />
                  </div>
                  <span className="font-bold text-lg text-foreground">{p.number}</span>
                </div>
                <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">Мессенджеры и соцсети</p>
          <div className="space-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r ${s.gradient} text-white shadow-sm hover:opacity-90 transition-opacity group`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={s.icon} size={20} />
                  <div>
                    <p className="font-bold leading-none">{s.label}</p>
                    <p className="text-xs opacity-75 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={18} className="opacity-70" />
              </a>
            ))}
          </div>
        </div>

        {/* Work hours */}
        <div className="bg-white rounded-3xl border border-border p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Clock" size={22} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground">Работаем круглосуточно</p>
            <p className="text-sm text-muted-foreground">24/7 — без выходных и праздников</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

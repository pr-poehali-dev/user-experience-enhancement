import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const socials = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", icon: "MessageSquare", bg: "bg-green-500", text: "Написать в WhatsApp" },
  { label: "Telegram", href: "#", icon: "Send", bg: "bg-blue-500", text: "Написать в Telegram" },
  { label: "ВКонтакте", href: "#", icon: "MessageCircle", bg: "bg-blue-700", text: "Написать ВКонтакте" },
  { label: "Instagram", href: "#", icon: "Instagram", bg: "bg-gradient-to-r from-pink-500 to-purple-600", text: "Написать в Instagram" },
  { label: "Max", href: "#", icon: "Flame", color: "#1e3a5f", text: "Написать в Max" },
]

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <h1 className="text-4xl sm:text-5xl font-light text-center mb-2">Свяжитесь с нами</h1>
        <p className="text-muted-foreground text-center mb-12 text-lg">Ответим быстро в любом мессенджере</p>

        {/* Phones */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6 mb-6 space-y-3">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="Phone" size={20} className="text-primary" /> Телефоны
          </h2>
          <a href="tel:+79885973303" className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl hover:bg-rose-100 transition-colors">
            <span className="font-bold text-lg">8 988 597 33 03</span>
            <Icon name="Phone" size={18} className="text-primary" />
          </a>
          <a href="tel:+79182457204" className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl hover:bg-rose-100 transition-colors">
            <span className="font-bold text-lg">8 918 245 72 04</span>
            <Icon name="Phone" size={18} className="text-primary" />
          </a>
        </div>

        {/* Socials */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6 mb-6 space-y-3">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="MessageCircle" size={20} className="text-primary" /> Мессенджеры и соцсети
          </h2>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-4 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity ${s.bg ?? ""}`}
              style={s.color ? { backgroundColor: s.color } : undefined}
            >
              <Icon name={s.icon} size={20} />
              {s.text}
            </a>
          ))}
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Icon name="Truck" size={20} className="text-primary" /> Доставка
          </h2>
          <div className="flex items-start gap-3 text-muted-foreground">
            <Icon name="Clock" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <p><span className="text-foreground font-medium">Работаем круглосуточно, без выходных</span> — доставляем по всему Краснодару и Краснодарскому краю</p>
          </div>
          <div className="flex items-start gap-3 text-muted-foreground">
            <Icon name="Gift" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <p><span className="text-foreground font-medium">Бесплатная доставка</span> — условия уточняйте у менеджера</p>
          </div>
        </div>

        {/* Pickup */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={20} className="text-primary" /> Самовывоз
          </h2>
          <p className="text-muted-foreground mb-2">Забрать заказ можно по адресу:</p>
          <p className="text-xl font-bold text-foreground">ул. Героя Яцкова 19к3</p>
          <p className="text-sm text-muted-foreground mt-1">г. Краснодар</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

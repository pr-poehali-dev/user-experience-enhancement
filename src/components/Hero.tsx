import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const floatingItems = [
  { emoji: "🎈", size: "text-6xl", left: "3%", delay: "0s", duration: "8s" },
  { emoji: "🎀", size: "text-4xl", left: "10%", delay: "1.2s", duration: "10s" },
  { emoji: "🎈", size: "text-7xl", left: "18%", delay: "0.5s", duration: "7s" },
  { emoji: "🎊", size: "text-5xl", left: "26%", delay: "2s", duration: "11s" },
  { emoji: "🧸", size: "text-4xl", left: "32%", delay: "3.2s", duration: "9s" },
  { emoji: "🎈", size: "text-5xl", left: "40%", delay: "0.8s", duration: "8.5s" },
  { emoji: "🎉", size: "text-6xl", left: "50%", delay: "1.5s", duration: "10s" },
  { emoji: "🎈", size: "text-8xl", left: "64%", delay: "0.3s", duration: "7s" },
  { emoji: "🎀", size: "text-5xl", left: "72%", delay: "2.5s", duration: "11s" },
  { emoji: "🎁", size: "text-4xl", left: "79%", delay: "1.8s", duration: "9s" },
  { emoji: "🎈", size: "text-5xl", left: "86%", delay: "1s", duration: "8s" },
  { emoji: "🎊", size: "text-6xl", left: "92%", delay: "0.6s", duration: "11s" },
  { emoji: "🪆", size: "text-4xl", left: "7%", delay: "3s", duration: "10s" },
  { emoji: "🎈", size: "text-7xl", left: "48%", delay: "3.5s", duration: "8s" },
  { emoji: "🧨", size: "text-4xl", left: "22%", delay: "4.5s", duration: "12s" },
  { emoji: "🎠", size: "text-5xl", left: "88%", delay: "2.8s", duration: "9s" },
  { emoji: "🪅", size: "text-4xl", left: "55%", delay: "5s", duration: "13s" },
]

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-background">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(-4deg); opacity: 0; }
          8% { opacity: 0.75; }
          88% { opacity: 0.45; }
          100% { transform: translateY(-130vh) rotate(4deg); opacity: 0; }
        }
        .item-float {
          animation: floatUp linear infinite;
          position: absolute;
          pointer-events: none;
        }
      `}</style>

      {/* Floating festive items */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {floatingItems.map((b, i) => (
          <div
            key={i}
            className={`item-float ${b.size}`}
            style={{
              left: b.left,
              bottom: "-10vh",
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>

      {/* Content — равномерно на весь экран */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-evenly px-4 sm:px-6 lg:px-8 text-center py-24">

        <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-balance">
          Воздушные
          <span className="block font-semibold mt-1 sm:mt-2 text-primary">шарики</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
          Стильные композиции из шаров для любого праздника{" "}
          <span
            className="font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #fb7185)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            по низким ценам
          </span>
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 border-2 border-primary/30 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3">
          <Icon name="Truck" className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <span className="text-base sm:text-xl md:text-2xl font-bold text-primary">
            Доставка по Краснодару 24/7
          </span>
        </div>

        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 sm:px-20 group shadow-xl"
          style={{ height: "4.5rem", fontSize: "1.6rem", fontWeight: 600 }}
          onClick={() => navigate("/catalog")}
        >
          Смотреть каталог
          <Icon name="ArrowRight" className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" className="h-4 w-4 text-primary flex-shrink-0" />
              <span>ул. Героя Яцкова 19к3</span>
            </div>
            <span className="hidden sm:block text-foreground/20">·</span>
            <div className="flex items-center gap-2">
              <Icon name="Clock" className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Работаем 24/7</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <a href="tel:+79885973303" className="flex items-center gap-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <Icon name="Phone" className="h-4 w-4 text-primary flex-shrink-0" />
              8 988 597 33 03
            </a>
            <span className="hidden sm:block text-muted-foreground/30">·</span>
            <a href="tel:+79182457204" className="flex items-center gap-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <Icon name="Phone" className="h-4 w-4 text-primary flex-shrink-0" />
              8 918 245 72 04
            </a>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-md">
              <Icon name="MessageSquare" size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-md">
              <Icon name="Send" size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors shadow-md">
              <Icon name="MessageCircle" size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md" style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
              <Icon name="Instagram" size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
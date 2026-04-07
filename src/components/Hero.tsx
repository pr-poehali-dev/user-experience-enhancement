import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const floatingItems = [
  { emoji: "🎈", size: "text-6xl", left: "3%", delay: "0s", duration: "6s" },
  { emoji: "🎀", size: "text-4xl", left: "10%", delay: "1.2s", duration: "7s" },
  { emoji: "🎈", size: "text-7xl", left: "18%", delay: "0.5s", duration: "5.5s" },
  { emoji: "🎊", size: "text-5xl", left: "26%", delay: "2s", duration: "8s" },
  { emoji: "🧸", size: "text-4xl", left: "32%", delay: "3.2s", duration: "7.5s" },
  { emoji: "🎈", size: "text-5xl", left: "40%", delay: "0.8s", duration: "6.5s" },
  { emoji: "🎉", size: "text-6xl", left: "50%", delay: "1.5s", duration: "7.5s" },
  { emoji: "🪀", size: "text-4xl", left: "57%", delay: "4s", duration: "9s" },
  { emoji: "🎈", size: "text-8xl", left: "64%", delay: "0.3s", duration: "5s" },
  { emoji: "🎀", size: "text-5xl", left: "72%", delay: "2.5s", duration: "9s" },
  { emoji: "🎁", size: "text-4xl", left: "79%", delay: "1.8s", duration: "7s" },
  { emoji: "🎈", size: "text-5xl", left: "86%", delay: "1s", duration: "6s" },
  { emoji: "🎊", size: "text-6xl", left: "92%", delay: "0.6s", duration: "8.5s" },
  { emoji: "🪆", size: "text-4xl", left: "7%", delay: "3s", duration: "8.5s" },
  { emoji: "🎈", size: "text-7xl", left: "48%", delay: "3.5s", duration: "6s" },
  { emoji: "🧨", size: "text-4xl", left: "22%", delay: "4.5s", duration: "9s" },
  { emoji: "🎠", size: "text-5xl", left: "88%", delay: "2.8s", duration: "7s" },
  { emoji: "🪅", size: "text-4xl", left: "55%", delay: "5s", duration: "10s" },
]

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-background">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(-5deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-20vh) rotate(5deg); opacity: 0; }
        }
        .item-float {
          animation: floatUp linear infinite;
          position: absolute;
          bottom: -100px;
          pointer-events: none;
        }
        .phone-elegant {
          font-family: Georgia, 'Times New Roman', serif;
          letter-spacing: 0.03em;
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
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
        <div className="space-y-5">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance">
            Воздушные
            <span className="block font-semibold mt-2 text-primary">шарики</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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

          {/* Delivery highlight */}
          <div className="inline-flex items-center gap-3 bg-primary/10 border-2 border-primary/30 rounded-2xl px-6 py-3">
            <Icon name="Truck" className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="text-xl md:text-2xl font-bold text-primary">
              Доставка по Краснодару 24/7
            </span>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-16 group shadow-lg"
              style={{ height: "4.5rem", fontSize: "1.25rem" }}
              onClick={() => navigate("/catalog")}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Phone numbers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-10 border-t border-border/50">
          <a
            href="tel:+79885973303"
            className="phone-elegant flex items-center gap-2 text-base text-foreground/75 hover:text-primary transition-colors font-normal"
          >
            <Icon name="Phone" className="h-4 w-4 text-primary flex-shrink-0" />
            8 988 597 33 03
          </a>
          <span className="hidden sm:block text-muted-foreground/30 text-xl">·</span>
          <a
            href="tel:+79182457204"
            className="phone-elegant flex items-center gap-2 text-base text-foreground/75 hover:text-primary transition-colors font-normal"
          >
            <Icon name="Phone" className="h-4 w-4 text-primary flex-shrink-0" />
            8 918 245 72 04
          </a>
        </div>

        {/* Address */}
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Icon name="MapPin" className="h-4 w-4 text-primary" />
          Мы находимся по адресу:{" "}
          <span className="font-semibold text-foreground">ул. Героя Яцкова 19к3</span>
        </div>
      </div>
    </section>
  )
}

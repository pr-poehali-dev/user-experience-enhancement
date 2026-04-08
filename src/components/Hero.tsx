import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const floatingItems = [
  { emoji: "🎈", size: "text-6xl", left: "3%", delay: "0s", duration: "8s", startY: "110vh" },
  { emoji: "🎀", size: "text-4xl", left: "10%", delay: "1.2s", duration: "10s", startY: "110vh" },
  { emoji: "🎈", size: "text-7xl", left: "18%", delay: "0.5s", duration: "7s", startY: "110vh" },
  { emoji: "🎊", size: "text-5xl", left: "26%", delay: "2s", duration: "11s", startY: "110vh" },
  { emoji: "🧸", size: "text-4xl", left: "32%", delay: "3.2s", duration: "9s", startY: "110vh" },
  { emoji: "🎈", size: "text-5xl", left: "40%", delay: "0.8s", duration: "8.5s", startY: "110vh" },
  { emoji: "🎉", size: "text-6xl", left: "50%", delay: "1.5s", duration: "10s", startY: "110vh" },
  { emoji: "🪀", size: "text-4xl", left: "57%", delay: "4s", duration: "12s", startY: "110vh" },
  { emoji: "🎈", size: "text-8xl", left: "64%", delay: "0.3s", duration: "7s", startY: "110vh" },
  { emoji: "🎀", size: "text-5xl", left: "72%", delay: "2.5s", duration: "11s", startY: "110vh" },
  { emoji: "🎁", size: "text-4xl", left: "79%", delay: "1.8s", duration: "9s", startY: "110vh" },
  { emoji: "🎈", size: "text-5xl", left: "86%", delay: "1s", duration: "8s", startY: "110vh" },
  { emoji: "🎊", size: "text-6xl", left: "92%", delay: "0.6s", duration: "11s", startY: "110vh" },
  { emoji: "🪆", size: "text-4xl", left: "7%", delay: "3s", duration: "10s", startY: "110vh" },
  { emoji: "🎈", size: "text-7xl", left: "48%", delay: "3.5s", duration: "8s", startY: "110vh" },
  { emoji: "🧨", size: "text-4xl", left: "22%", delay: "4.5s", duration: "12s", startY: "110vh" },
  { emoji: "🎠", size: "text-5xl", left: "88%", delay: "2.8s", duration: "9s", startY: "110vh" },
  { emoji: "🪅", size: "text-4xl", left: "55%", delay: "5s", duration: "13s", startY: "110vh" },
  { emoji: "🎈", size: "text-5xl", left: "15%", delay: "6s", duration: "9s", startY: "60vh" },
  { emoji: "🎁", size: "text-5xl", left: "35%", delay: "0s", duration: "10s", startY: "70vh" },
  { emoji: "🎉", size: "text-4xl", left: "60%", delay: "7s", duration: "8s", startY: "50vh" },
  { emoji: "🎊", size: "text-4xl", left: "75%", delay: "2s", duration: "11s", startY: "65vh" },
  { emoji: "🎈", size: "text-6xl", left: "44%", delay: "8s", duration: "9s", startY: "80vh" },
  { emoji: "🧸", size: "text-3xl", left: "95%", delay: "1s", duration: "12s", startY: "55vh" },
  { emoji: "🎀", size: "text-3xl", left: "2%", delay: "9s", duration: "10s", startY: "40vh" },
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
              bottom: b.startY,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
        <div className="space-y-4 sm:space-y-5">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-balance">
            Воздушные
            <span className="block font-semibold mt-1 sm:mt-2 text-primary">шарики</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 border-2 border-primary/30 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3">
            <Icon name="Truck" className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <span className="text-base sm:text-xl md:text-2xl font-bold text-primary">
              Доставка по Краснодару 24/7
            </span>
          </div>

          <div className="flex justify-center pt-1 sm:pt-2">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 sm:px-20 group shadow-xl"
              style={{ height: "4.5rem", fontSize: "1.6rem", fontWeight: 600 }}
              onClick={() => navigate("/catalog")}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/50 flex flex-col items-center gap-2">
          <div className="inline-flex flex-col items-center gap-1 bg-green-50 border-2 border-green-200 rounded-2xl px-8 py-4 cursor-pointer hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-2">
              <Icon name="Gift" className="h-6 w-6 text-green-600" />
              <span className="text-xl sm:text-2xl font-bold text-green-700">Бесплатная доставка</span>
            </div>
            <span className="text-sm text-green-600/80">Узнавайте у менеджера</span>
          </div>
        </div>
      </div>
    </section>
  )
}
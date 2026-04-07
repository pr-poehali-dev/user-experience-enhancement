import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const balloons = [
  { emoji: "🎈", size: "text-7xl", left: "5%", delay: "0s", duration: "6s" },
  { emoji: "🎀", size: "text-5xl", left: "12%", delay: "1.2s", duration: "7s" },
  { emoji: "🎈", size: "text-8xl", left: "22%", delay: "0.5s", duration: "5.5s" },
  { emoji: "🎊", size: "text-6xl", left: "33%", delay: "2s", duration: "8s" },
  { emoji: "🎈", size: "text-5xl", left: "45%", delay: "0.8s", duration: "6.5s" },
  { emoji: "🎉", size: "text-7xl", left: "55%", delay: "1.5s", duration: "7.5s" },
  { emoji: "🎈", size: "text-9xl", left: "65%", delay: "0.3s", duration: "5s" },
  { emoji: "🎀", size: "text-6xl", left: "75%", delay: "2.5s", duration: "9s" },
  { emoji: "🎈", size: "text-5xl", left: "83%", delay: "1s", duration: "6s" },
  { emoji: "🎊", size: "text-7xl", left: "92%", delay: "1.8s", duration: "7s" },
  { emoji: "🎈", size: "text-6xl", left: "8%", delay: "3s", duration: "8.5s" },
  { emoji: "🎈", size: "text-8xl", left: "50%", delay: "3.5s", duration: "6s" },
]

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-background">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(-5deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-20vh) rotate(5deg); opacity: 0; }
        }
        .balloon-float {
          animation: floatUp linear infinite;
          position: absolute;
          bottom: -100px;
          pointer-events: none;
        }
      `}</style>

      {/* Flying balloons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {balloons.map((b, i) => (
          <div
            key={i}
            className={`balloon-float ${b.size}`}
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-32">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance">
            Воздушные
            <span className="block font-semibold mt-2 text-primary">шарики</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Яркие композиции для любого праздника — на день рождения, выписку, для мужчин и женщин, детей
          </p>

          {/* Info badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm">
              <Icon name="MapPin" className="h-4 w-4 text-primary" />
              Краснодар и Краснодарский край
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm">
              <Icon name="Clock" className="h-4 w-4 text-primary" />
              Доставка 24/7
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm">
              <Icon name="ShoppingBag" className="h-4 w-4 text-primary" />
              Самовывоз: ул. Героя Яцкова 19к3
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-16 group shadow-lg"
              style={{height: '4.5rem', fontSize: '1.25rem'}}
              onClick={() => navigate('/catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Social Links — горизонтальные */}
        <div className="flex items-center justify-center gap-6 md:gap-10 max-w-3xl mx-auto mt-24 pt-16 border-t border-border/50">
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className="w-32 h-14 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center gap-2 shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="Send" className="h-6 w-6 text-white" />
              <span className="text-white font-semibold text-sm">Telegram</span>
            </div>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className="w-32 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center gap-2 shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="Instagram" className="h-6 w-6 text-white" />
              <span className="text-white font-semibold text-sm">Instagram</span>
            </div>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className="w-32 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center gap-2 shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="MessageCircle" className="h-6 w-6 text-white" />
              <span className="text-white font-semibold text-sm">ВКонтакте</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
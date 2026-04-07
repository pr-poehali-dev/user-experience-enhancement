import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background: 'linear-gradient(135deg, #fde8d8 0%, #f9d9e3 40%, #ecddf5 100%)'}}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-8xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}>🎈</div>
        <div className="absolute top-40 right-20 text-6xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>🎀</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-10 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>🎊</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-bounce" style={{animationDuration: '2.5s', animationDelay: '1.5s'}}>🎉</div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-32">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance">
            Воздушные
            <span className="block font-semibold mt-2 text-primary">шарики</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Яркие букеты и композиции для любого праздника — на день рождения, выписку, для мужчин и женщин, детей
          </p>

          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 h-16 text-lg group"
              onClick={() => document.getElementById('categories')?.scrollIntoView({behavior: 'smooth'})}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 md:gap-12 max-w-3xl mx-auto mt-24 pt-16 border-t border-border/50">
          <a
            href="#"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon name="Instagram" className="h-7 w-7 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Instagram</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon name="Send" className="h-7 w-7 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Telegram</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon name="MessageCircle" className="h-7 w-7 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">ВКонтакте</span>
          </a>
        </div>
      </div>
    </section>
  )
}
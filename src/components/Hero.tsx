import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 to-background">
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto mt-24 pt-16 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">3 000+</div>
            <div className="text-sm text-muted-foreground">Готовых композиций</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">5 000+</div>
            <div className="text-sm text-muted-foreground">Довольных клиентов</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">4.9</div>
            <div className="text-sm text-muted-foreground">Средний рейтинг</div>
          </div>
        </div>
      </div>
    </section>
  )
}
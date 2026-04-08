import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const floatingItems = [
  { emoji: "🎈", size: "text-6xl", left: "3%", delay: "0s", duration: "8s", startY: "110vh" },
  { emoji: "🎀", size: "text-4xl", left: "10%", delay: "1.2s", duration: "10s", startY: "110vh" },
  { emoji: "🎊", size: "text-5xl", left: "26%", delay: "2s", duration: "11s", startY: "110vh" },
  { emoji: "🧸", size: "text-4xl", left: "32%", delay: "3.2s", duration: "9s", startY: "110vh" },
  { emoji: "🎉", size: "text-6xl", left: "50%", delay: "1.5s", duration: "10s", startY: "110vh" },
  { emoji: "🎈", size: "text-8xl", left: "64%", delay: "0.3s", duration: "7s", startY: "110vh" },
  { emoji: "🎀", size: "text-5xl", left: "72%", delay: "2.5s", duration: "11s", startY: "110vh" },
  { emoji: "🎁", size: "text-4xl", left: "79%", delay: "1.8s", duration: "9s", startY: "110vh" },
  { emoji: "🎊", size: "text-6xl", left: "92%", delay: "0.6s", duration: "11s", startY: "110vh" },
  { emoji: "🪆", size: "text-4xl", left: "7%", delay: "3s", duration: "10s", startY: "110vh" },
  { emoji: "🧨", size: "text-4xl", left: "22%", delay: "4.5s", duration: "12s", startY: "110vh" },
  { emoji: "🎠", size: "text-5xl", left: "88%", delay: "2.8s", duration: "9s", startY: "110vh" },
  { emoji: "🪅", size: "text-4xl", left: "55%", delay: "5s", duration: "13s", startY: "110vh" },
  { emoji: "🎈", size: "text-5xl", left: "15%", delay: "6s", duration: "9s", startY: "60vh" },
  { emoji: "🎉", size: "text-4xl", left: "60%", delay: "7s", duration: "8s", startY: "50vh" },
  { emoji: "🎊", size: "text-4xl", left: "75%", delay: "2s", duration: "11s", startY: "65vh" },
  { emoji: "🧸", size: "text-3xl", left: "95%", delay: "1s", duration: "12s", startY: "55vh" },
  { emoji: "🎀", size: "text-3xl", left: "2%", delay: "9s", duration: "10s", startY: "40vh" },
]

const sidePhotos = {
  left: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6dc788aa-110e-4d80-a876-8ed8d7083487.jpg",
  right: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/d10af886-e42f-408a-bc4d-c49c5bde68ee.jpg",
}

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

      {/* Three-column layout */}
      <div className="relative z-10 w-full min-h-screen flex items-stretch">

        {/* Left photo panel */}
        <div className="hidden lg:flex flex-1 items-end justify-end pb-0 pr-4 overflow-hidden">
          <img
            src={sidePhotos.left}
            alt="Шары для девушки"
            className="h-[85vh] w-auto object-cover object-top rounded-t-[2.5rem] shadow-2xl opacity-90"
            style={{ maxWidth: "320px" }}
          />
        </div>

        {/* Center card */}
        <div className="flex-shrink-0 w-full lg:w-[480px] xl:w-[520px] flex items-center justify-center px-4 lg:px-0 py-16">
          <div className="w-full bg-white/75 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 px-8 py-10 text-center space-y-6">

            <h1 className="text-5xl md:text-6xl font-normal tracking-tight leading-tight">
              Воздушные
              <span className="block font-semibold text-primary mt-1">шарики</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
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

            {/* Delivery */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-2xl px-5 py-2.5">
              <Icon name="Truck" className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-base font-bold text-primary">Доставка по Краснодару 24/7</span>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl group shadow-lg"
              style={{ height: "3.75rem", fontSize: "1.1rem" }}
              onClick={() => navigate("/catalog")}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Divider */}
            <div className="border-t border-border/40 pt-4 space-y-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+79885973303"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  <Icon name="Phone" className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  8 988 597 33 03
                </a>
                <span className="hidden sm:block text-muted-foreground/30">·</span>
                <a
                  href="tel:+79182457204"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  <Icon name="Phone" className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  8 918 245 72 04
                </a>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="MapPin" className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                ул. Героя Яцкова 19к3
              </div>
            </div>

          </div>
        </div>

        {/* Right photo panel */}
        <div className="hidden lg:flex flex-1 items-end justify-start pb-0 pl-4 overflow-hidden">
          <img
            src={sidePhotos.right}
            alt="Шары для мальчика"
            className="h-[85vh] w-auto object-cover object-top rounded-t-[2.5rem] shadow-2xl opacity-90"
            style={{ maxWidth: "320px" }}
          />
        </div>

      </div>
    </section>
  )
}

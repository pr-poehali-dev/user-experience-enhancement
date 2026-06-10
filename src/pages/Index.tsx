import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

function CatalogCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-violet-200 via-orange-50 to-orange-100 text-center px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <span className="text-6xl sm:text-7xl">🎈</span>
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
          Готовы выбрать<br />
          <span className="text-primary">шарики?</span>
        </h2>
        <p className="text-base sm:text-xl text-muted-foreground">
          Более 2000 композиций — доставка 24/7 по Краснодару
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/catalog")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 sm:px-16 shadow-xl w-full sm:w-auto"
          style={{ height: "4rem", fontSize: "1.35rem", fontWeight: 700 }}
        >
          Каталог
          <Icon name="ArrowRight" className="ml-3 h-6 w-6" />
        </Button>

      </div>
    </section>
  )
}

export default function Index() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PopularPackages />
      <Reviews />
      <CatalogCTA />
      <Footer />
    </main>
  )
}
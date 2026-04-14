import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { PopularPackages } from "@/components/PopularPackages"
import { Newsletter } from "@/components/Newsletter"
import { Footer } from "@/components/Footer"
import { ContactFloat } from "@/components/ContactFloat"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

function CatalogCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 text-center px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <span className="text-6xl sm:text-7xl">🎈</span>
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
          Готовы выбрать<br />
          <span className="text-primary">шарики?</span>
        </h2>
        <p className="text-base sm:text-xl text-muted-foreground">
          Более 100 композиций — доставка 24/7 по Краснодару
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
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
          <a href="tel:+79885973303" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icon name="Phone" className="h-4 w-4 text-primary" /> 8 988 597 33 03
          </a>
          <a href="tel:+79182457204" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icon name="Phone" className="h-4 w-4 text-primary" /> 8 918 245 72 04
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <PopularPackages />
      <Newsletter />
      <CatalogCTA />
      <Footer />
      <ContactFloat />
    </main>
  )
}
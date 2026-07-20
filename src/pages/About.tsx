import { Navbar } from "@/components/Navbar"
import { AboutUs } from "@/components/AboutUs"
import { Footer } from "@/components/Footer"
import SEO from "@/components/SEO"

export default function About() {
  return (
    <main className="min-h-screen">
      <SEO
        title="О нас | Victoria Balloons"
        description="Студия аэродизайна Victoria Balloons — создаём яркие моменты с воздушными шарами для любого праздника с 2018 года."
        path="/about"
      />
      <div className="pt-[clamp(72px,10vw,120px)]">
        <AboutUs />
      </div>
      <Footer />
    </main>
  )
}
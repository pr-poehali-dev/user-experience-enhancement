import { Navbar } from "@/components/Navbar"
import { AboutUs } from "@/components/AboutUs"
import { Footer } from "@/components/Footer"

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="pt-[clamp(72px,10vw,120px)]">
        <AboutUs />
      </div>
      <Footer />
    </main>
  )
}
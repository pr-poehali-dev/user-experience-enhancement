import { Navbar } from "@/components/Navbar"
import { AboutUs } from "@/components/AboutUs"
import { Footer } from "@/components/Footer"

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 sm:pt-24">
        <AboutUs />
      </div>
      <Footer />
    </main>
  )
}

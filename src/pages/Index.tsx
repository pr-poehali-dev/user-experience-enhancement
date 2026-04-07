import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { PopularPackages } from "@/components/PopularPackages"
import { Newsletter } from "@/components/Newsletter"
import { Footer } from "@/components/Footer"
import { ContactFloat } from "@/components/ContactFloat"

export default function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <PopularPackages />
      <Newsletter />
      <Footer />
      <ContactFloat />
    </main>
  )
}
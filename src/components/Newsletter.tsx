import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-32 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-5xl mb-4">🎈</div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
              Скидки и <span className="font-semibold text-primary">акции</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Подпишитесь и получайте эксклюзивные предложения, новые наборы и сезонные скидки первыми
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-full border-2 px-6"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shrink-0"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground">
            Подписываясь, вы соглашаетесь с Политикой конфиденциальности и даёте согласие на получение рассылки
          </p>
        </div>
      </div>
    </section>
  )
}

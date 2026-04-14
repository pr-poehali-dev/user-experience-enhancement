import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon name="Truck" size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light mb-3">Доставка</h1>
          <p className="text-muted-foreground text-lg">Привезём шарики прямо к вашему празднику</p>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="MapPin" size={22} className="text-primary" /> Зона доставки
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50">
              <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Весь Краснодар</p>
                <p className="text-sm text-muted-foreground">Доставляем в любой район города</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50">
              <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Краснодарский край</p>
                <p className="text-sm text-muted-foreground">Выезжаем за город — уточняйте стоимость</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Clock" size={22} className="text-primary" /> График работы
          </h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-xl text-foreground">Круглосуточно, 24/7</p>
              <p className="text-sm text-muted-foreground">Без выходных и праздников</p>
            </div>
          </div>
        </div>

        {/* Cost */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Tag" size={22} className="text-primary" /> Стоимость доставки
          </h2>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-green-50">
            <Icon name="Gift" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Бесплатная доставка</p>
              <p className="text-sm text-muted-foreground">Точные условия уточняйте у менеджера при заказе</p>
            </div>
          </div>
        </div>

        {/* Pickup */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-8">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Store" size={22} className="text-primary" /> Самовывоз
          </h2>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 mb-4">
            <Icon name="MapPin" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Адрес:</p>
              <p className="font-bold text-xl text-foreground">ул. Героя Яцкова 19к3</p>
              <p className="text-sm text-muted-foreground">г. Краснодар</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50">
            <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Режим работы точки:</span> круглосуточно, 24/7</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Есть вопросы по доставке?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/79885973303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md"
            >
              <Icon name="MessageSquare" size={18} /> Написать в WhatsApp
            </a>
            <a
              href="tel:+79885973303"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Icon name="Phone" size={18} /> 8 988 597 33 03
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

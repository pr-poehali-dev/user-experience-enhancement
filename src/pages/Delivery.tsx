import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const MAP_URL = "https://2gis.ru/search/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%93%D0%B5%D1%80%D0%BE%D1%8F%20%D0%AF%D1%86%D0%BA%D0%BE%D0%B2%D0%B0%2019%D0%BA3"

export default function Delivery() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero с картой на фоне */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Карта Краснодара как фон */}
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=38.9769%2C45.0448&z=12&l=map"
          className="absolute inset-0 w-full h-full border-0 opacity-30"
          title="Карта Краснодара"
          loading="lazy"
        />
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/90 via-white/80 to-white/95" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 backdrop-blur mb-4 shadow-lg">
            <Icon name="Truck" size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light mb-3">Доставка</h1>
          <p className="text-muted-foreground text-lg">Привезём шарики прямо к вашей двери</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20 -mt-4">

        {/* Самовывоз — первым */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Store" size={22} className="text-primary" /> Самовывоз
          </h2>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors mb-4 group"
          >
            <Icon name="MapPin" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Адрес:</p>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors underline underline-offset-2">ул. Героя Яцкова 19к3</p>
              <p className="text-sm text-muted-foreground">г. Краснодар</p>
            </div>
            <Icon name="ExternalLink" size={16} className="text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
          </a>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50">
            <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground text-sm">Режим работы:</span> круглосуточно, 24/7</p>
          </div>
        </div>

        {/* Зона доставки */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="MapPin" size={22} className="text-primary" /> Зона доставки
          </h2>
          <div className="space-y-3">
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

        {/* Стоимость */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-5">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Tag" size={22} className="text-primary" /> Стоимость доставки
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50">
              <Icon name="Truck" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">от 300 ₽</p>
                <p className="text-sm text-muted-foreground">Стоимость зависит от района и времени доставки</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-green-50">
              <Icon name="Gift" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Бесплатно при заказе от 5 000 ₽</p>
                <p className="text-sm text-muted-foreground">Доставка в подарок при заказе на нужную сумму</p>
              </div>
            </div>
          </div>
        </div>

        {/* График работы */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-7 mb-8">
          <h2 className="font-semibold text-xl mb-5 flex items-center gap-2">
            <Icon name="Clock" size={22} className="text-primary" /> График работы
          </h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Круглосуточно, 24/7</p>
              <p className="text-sm text-muted-foreground">Без выходных и праздников</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4 font-medium">Есть вопросы по доставке? Позвоните нам:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+79885973303"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Icon name="Phone" size={18} /> 8 988 597 33 03
            </a>
            <a
              href="tel:+79182457204"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Icon name="Phone" size={18} /> 8 918 245 72 04
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
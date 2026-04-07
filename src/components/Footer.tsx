import Icon from "@/components/ui/icon"

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">🎈 ШарикоFF</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Создаём яркие моменты с воздушными шариками для любого праздника с 2018 года
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Send" size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#categories" className="hover:text-foreground transition-colors">Для девушки</a></li>
              <li><a href="#categories" className="hover:text-foreground transition-colors">Для мужчины</a></li>
              <li><a href="#categories" className="hover:text-foreground transition-colors">Для мальчика</a></li>
              <li><a href="#categories" className="hover:text-foreground transition-colors">Для девочки</a></li>
              <li><a href="#categories" className="hover:text-foreground transition-colors">Для выписки</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Как мы работаем</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Портфолио</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Как заказать</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Связаться с нами</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>2025 ШарикоFF. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

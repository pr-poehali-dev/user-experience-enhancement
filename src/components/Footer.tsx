import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Horizon Voyages</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Создаём незабываемые путешествия по всему миру с 2010 года
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold mb-4">Направления</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Европа
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Азия
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Африка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Америка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Океания
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Вакансии
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Пресса
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Партнёры
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Центр помощи
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Связаться с нами
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Правила отмены
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>2025 Horizon Voyages. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

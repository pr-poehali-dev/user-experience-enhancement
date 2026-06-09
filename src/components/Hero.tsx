import { useNavigate } from "react-router-dom"

// Фон — картинка без верхнего меню
const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/61d08530-2a08-4c66-a266-998c2b9d942c.png"

export function Hero() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full" style={{ aspectRatio: "1456/816" }}>
      <img
        src={BG}
        alt="Шаровик Затейник"
        className="w-full h-full object-cover block"
        draggable={false}
      />

      {/* Логотип — левый верхний угол */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "0%", left: "0%", width: "13%", height: "22%" }}
        aria-label="На главную"
      />

      {/* О нас — ~20% слева, ~5% сверху */}
      <button
        onClick={() => navigate("/about")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "3%", left: "19%", width: "8%", height: "10%" }}
        aria-label="О нас"
      />

      {/* Прайс */}
      <button
        onClick={() => navigate("/contacts")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "3%", left: "29%", width: "7%", height: "10%" }}
        aria-label="Прайс"
      />

      {/* Каталог */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "3%", left: "40%", width: "8%", height: "10%" }}
        aria-label="Каталог"
      />

      {/* Отзывы */}
      <button
        onClick={() => scrollTo("popular")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "3%", left: "51%", width: "8%", height: "10%" }}
        aria-label="Отзывы"
      />

      {/* Доставка */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "3%", left: "62%", width: "8%", height: "10%" }}
        aria-label="Доставка"
      />

      {/* Телефон — кнопка фиолетовая правый верх */}
      <a
        href="tel:+79880653700"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "2%", left: "73%", width: "25%", height: "12%" }}
        aria-label="Позвонить +7 988 065 37 00"
      />

      {/* Смотреть каталог — большая оранжевая кнопка по центру */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "58%", left: "35%", width: "22%", height: "10%" }}
        aria-label="Смотреть каталог"
      />

      {/* Доставка по Краснодару и краю 24/7 */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "70%", left: "32%", width: "27%", height: "9%" }}
        aria-label="Доставка по Краснодару"
      />

      {/* Работаем 24/7 (часы) */}
      <div
        className="absolute"
        style={{ top: "83%", left: "5%", width: "18%", height: "14%" }}
      />

      {/* Адрес */}
      <div
        className="absolute"
        style={{ top: "83%", left: "25%", width: "18%", height: "14%" }}
      />

      {/* WhatsApp */}
      <a
        href="https://wa.me/79885973303"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "84%", left: "41%", width: "10%", height: "12%" }}
        aria-label="WhatsApp"
      />

      {/* Telegram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "84%", left: "52%", width: "10%", height: "12%" }}
        aria-label="Telegram"
      />

      {/* ВКонтакте */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "84%", left: "63%", width: "10%", height: "12%" }}
        aria-label="ВКонтакте"
      />

      {/* Instagram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "84%", left: "74%", width: "10%", height: "12%" }}
        aria-label="Instagram"
      />

      {/* Max */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "84%", left: "85%", width: "9%", height: "12%" }}
        aria-label="Max"
      />
    </section>
  )
}

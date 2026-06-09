import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1bab2356-274e-4dba-857a-73ed5e1a8c61.png"

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

      {/* Логотип */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "0%", left: "0%", width: "14%", height: "18%" }}
        aria-label="На главную"
      />

      {/* О нас */}
      <button
        onClick={() => navigate("/about")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "20%", width: "8%", height: "10%" }}
        aria-label="О нас"
      />

      {/* Прайс */}
      <button
        onClick={() => navigate("/contacts")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "30%", width: "8%", height: "10%" }}
        aria-label="Прайс"
      />

      {/* Каталог */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "41.5%", width: "8%", height: "10%" }}
        aria-label="Каталог"
      />

      {/* Отзывы */}
      <button
        onClick={() => scrollTo("popular")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "52%", width: "8%", height: "10%" }}
        aria-label="Отзывы"
      />

      {/* Доставка */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "63%", width: "8%", height: "10%" }}
        aria-label="Доставка"
      />

      {/* Телефон */}
      <a
        href="tel:+79880653700"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "1%", left: "75%", width: "23%", height: "11%" }}
        aria-label="Позвонить"
      />

      {/* Смотреть каталог */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "57%", left: "34%", width: "23%", height: "11%" }}
        aria-label="Смотреть каталог"
      />

      {/* Доставка по Краснодару 24/7 */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "70%", left: "31%", width: "27%", height: "9%" }}
        aria-label="Доставка по Краснодару"
      />

      {/* WhatsApp */}
      <a
        href="https://wa.me/79885973303"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "86%", left: "41%", width: "10%", height: "12%" }}
        aria-label="WhatsApp"
      />

      {/* Telegram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "86%", left: "52%", width: "10%", height: "12%" }}
        aria-label="Telegram"
      />

      {/* ВКонтакте */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "86%", left: "63%", width: "10%", height: "12%" }}
        aria-label="ВКонтакте"
      />

      {/* Instagram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "86%", left: "74%", width: "10%", height: "12%" }}
        aria-label="Instagram"
      />

      {/* Max */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer"
        style={{ top: "86%", left: "85%", width: "9%", height: "12%" }}
        aria-label="Max"
      />
    </section>
  )
}
import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1e04c8a9-4efc-4c40-9620-2478e28757d8.png"

export function Hero() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "1456/816" }}>
      {/* Фоновое фото */}
      <img
        src={BG}
        alt="Шаровик Затейник"
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Прозрачные кнопки поверх фото */}

      {/* Навигация: О нас */}
      <button
        onClick={() => navigate("/about")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-lg transition-colors"
        style={{ top: "5%", left: "20%", width: "7%", height: "7%" }}
        aria-label="О нас"
      />

      {/* Навигация: Прайс */}
      <button
        onClick={() => navigate("/contacts")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-lg transition-colors"
        style={{ top: "5%", left: "30%", width: "7%", height: "7%" }}
        aria-label="Прайс"
      />

      {/* Навигация: Каталог */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-lg transition-colors"
        style={{ top: "5%", left: "43%", width: "7%", height: "7%" }}
        aria-label="Каталог"
      />

      {/* Навигация: Отзывы */}
      <button
        onClick={() => scrollTo("popular")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-lg transition-colors"
        style={{ top: "5%", left: "55%", width: "7%", height: "7%" }}
        aria-label="Отзывы"
      />

      {/* Навигация: Доставка */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-lg transition-colors"
        style={{ top: "5%", left: "67%", width: "7%", height: "7%" }}
        aria-label="Доставка"
      />

      {/* Кнопка телефона */}
      <a
        href="tel:+79880653700"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "3%", left: "78%", width: "19%", height: "10%" }}
        aria-label="Позвонить"
      />

      {/* Кнопка "Смотреть каталог" */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-full transition-colors"
        style={{ top: "57%", left: "34%", width: "22%", height: "11%" }}
        aria-label="Смотреть каталог"
      />

      {/* Кнопка "Доставка по Краснодару 24/7" */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute cursor-pointer bg-transparent border-none hover:bg-white/10 rounded-full transition-colors"
        style={{ top: "70%", left: "32%", width: "26%", height: "9%" }}
        aria-label="Доставка по Краснодару"
      />

      {/* WhatsApp */}
      <a
        href="https://wa.me/79885973303"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "86%", left: "41%", width: "10%", height: "10%" }}
        aria-label="WhatsApp"
      />

      {/* Telegram */}
      <a
        href="#"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "86%", left: "52%", width: "10%", height: "10%" }}
        aria-label="Telegram"
      />

      {/* ВКонтакте */}
      <a
        href="#"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "86%", left: "63%", width: "10%", height: "10%" }}
        aria-label="ВКонтакте"
      />

      {/* Instagram */}
      <a
        href="#"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "86%", left: "74%", width: "10%", height: "10%" }}
        aria-label="Instagram"
      />

      {/* Max */}
      <a
        href="#"
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: "86%", left: "85%", width: "9%", height: "10%" }}
        aria-label="Max"
      />
    </section>
  )
}

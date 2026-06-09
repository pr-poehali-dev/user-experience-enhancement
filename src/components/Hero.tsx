import { useNavigate } from "react-router-dom"

const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/61d08530-2a08-4c66-a266-998c2b9d942c.png"

export function Hero() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative w-full"
      style={{
        height: "100vh",
        minHeight: "500px",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Логотип — левый верхний угол */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "0%", left: "0%", width: "13%", height: "20%" }}
        aria-label="На главную"
      />

      {/* О нас */}
      <button
        onClick={() => navigate("/about")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "2%", left: "19%", width: "8%", height: "11%" }}
        aria-label="О нас"
      />

      {/* Прайс */}
      <button
        onClick={() => navigate("/contacts")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "2%", left: "29%", width: "7%", height: "11%" }}
        aria-label="Прайс"
      />

      {/* Каталог */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "2%", left: "39%", width: "8%", height: "11%" }}
        aria-label="Каталог"
      />

      {/* Отзывы */}
      <button
        onClick={() => scrollTo("popular")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "2%", left: "50%", width: "8%", height: "11%" }}
        aria-label="Отзывы"
      />

      {/* Доставка */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "2%", left: "61%", width: "8%", height: "11%" }}
        aria-label="Доставка"
      />

      {/* Телефон */}
      <a
        href="tel:+79880653700"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "1.5%", left: "72%", width: "26%", height: "13%" }}
        aria-label="Позвонить"
      />

      {/* Смотреть каталог — оранжевая кнопка */}
      <button
        onClick={() => navigate("/catalog")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "58%", left: "35%", width: "22%", height: "10%" }}
        aria-label="Смотреть каталог"
      />

      {/* Доставка по Краснодару 24/7 */}
      <button
        onClick={() => navigate("/delivery")}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "70%", left: "32%", width: "27%", height: "9%" }}
        aria-label="Доставка по Краснодару"
      />

      {/* WhatsApp */}
      <a
        href="https://wa.me/79885973303"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85%", left: "40%", width: "11%", height: "12%" }}
        aria-label="WhatsApp"
      />

      {/* Telegram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85%", left: "52%", width: "10%", height: "12%" }}
        aria-label="Telegram"
      />

      {/* ВКонтакте */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85%", left: "63%", width: "10%", height: "12%" }}
        aria-label="ВКонтакте"
      />

      {/* Instagram */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85%", left: "74%", width: "10%", height: "12%" }}
        aria-label="Instagram"
      />

      {/* Max */}
      <a
        href="#"
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85%", left: "85%", width: "9%", height: "12%" }}
        aria-label="Max"
      />
    </section>
  )
}

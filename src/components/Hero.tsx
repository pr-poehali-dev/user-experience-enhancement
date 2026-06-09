import { useNavigate } from "react-router-dom"

// Фото с навигацией, соцсетями и всеми кнопками
const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4595ed1f-afa5-4363-9a13-fd28e3814395.png"

export function Hero() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // Стиль для всех прозрачных кнопок
  const btn: React.CSSProperties = {
    position: "absolute",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
  }

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 560,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >

      {/* ── ЛОГОТИП (левый верх) ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ ...btn, top: "0%", left: "0%", width: "13%", height: "22%" }}
        aria-label="На главную" />

      {/* ── НАВИГАЦИЯ (верхняя строка) ── */}
      {/* О нас */}
      <button onClick={() => navigate("/about")}
        style={{ ...btn, top: "1%", left: "19%", width: "8%", height: "11%" }}
        aria-label="О нас" />

      {/* Прайс */}
      <button onClick={() => navigate("/contacts")}
        style={{ ...btn, top: "1%", left: "29%", width: "7%", height: "11%" }}
        aria-label="Прайс" />

      {/* Каталог */}
      <button onClick={() => navigate("/catalog")}
        style={{ ...btn, top: "1%", left: "39%", width: "8%", height: "11%" }}
        aria-label="Каталог" />

      {/* Отзывы */}
      <button onClick={() => scrollTo("popular")}
        style={{ ...btn, top: "1%", left: "50%", width: "8%", height: "11%" }}
        aria-label="Отзывы" />

      {/* Доставка */}
      <button onClick={() => navigate("/delivery")}
        style={{ ...btn, top: "1%", left: "61%", width: "8%", height: "11%" }}
        aria-label="Доставка" />

      {/* Телефон */}
      <a href="tel:+79880653700"
        style={{ ...btn, top: "1%", left: "72%", width: "26%", height: "13%" }}
        aria-label="Позвонить" />

      {/* ── ЦЕНТРАЛЬНЫЕ КНОПКИ ── */}
      {/* Смотреть каталог — большая оранжевая */}
      <button onClick={() => navigate("/catalog")}
        style={{ ...btn, top: "57%", left: "35%", width: "22%", height: "10%" }}
        aria-label="Смотреть каталог" />

      {/* Доставка по Краснодару 24/7 */}
      <button onClick={() => navigate("/delivery")}
        style={{ ...btn, top: "69%", left: "33%", width: "26%", height: "9%" }}
        aria-label="Доставка по Краснодару" />

      {/* ── СОЦСЕТИ (нижняя строка) ── */}
      {/* WhatsApp */}
      <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer"
        style={{ ...btn, top: "85%", left: "40%", width: "10%", height: "13%" }}
        aria-label="WhatsApp" />

      {/* Telegram */}
      <a href="#"
        style={{ ...btn, top: "85%", left: "51%", width: "10%", height: "13%" }}
        aria-label="Telegram" />

      {/* ВКонтакте */}
      <a href="#"
        style={{ ...btn, top: "85%", left: "62%", width: "10%", height: "13%" }}
        aria-label="ВКонтакте" />

      {/* Instagram */}
      <a href="#"
        style={{ ...btn, top: "85%", left: "73%", width: "10%", height: "13%" }}
        aria-label="Instagram" />

      {/* Max */}
      <a href="#"
        style={{ ...btn, top: "85%", left: "84%", width: "10%", height: "13%" }}
        aria-label="Max" />

    </section>
  )
}

// Замените ссылки на скриншоты отзывов из соцсетей — просто вставьте свои картинки в этот массив
const reviewImages: string[] = [
  // "https://cdn.poehali.dev/projects/.../review1.jpg",
  // "https://cdn.poehali.dev/projects/.../review2.jpg",
]

export function Reviews() {
  return (
    <section id="reviews" className="py-10 sm:py-28 bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(30px, 4.2vw, 54px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Отзывы{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              клиентов
            </span>
          </h2>
        </div>

        {reviewImages.length === 0 ? (
          <div
            className="text-center py-16 sm:py-24 rounded-3xl"
            style={{ background: "rgba(124,58,237,0.04)", border: "1px dashed #d8c8fa" }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#8a7d9c", fontSize: 15 }}>
              Здесь скоро появятся отзывы наших клиентов
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
            {reviewImages.map((src, i) => (
              <div
                key={i}
                className="mb-4 sm:mb-5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 break-inside-avoid"
              >
                <img src={src} alt={`Отзыв клиента ${i + 1}`} className="w-full h-auto block" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

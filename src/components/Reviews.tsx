import Icon from "@/components/ui/icon"

const AVITO_REVIEWS_URL = "https://www.avito.ru/brands/e3b2779c65bbfbebf0c6f8cc9b83560d/all/predlozheniya_uslug?src=search_seller_info&iid=7996058774&sellerId=e8acc862640907c79b11468f828a14e2"

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

        <div className="text-center">
          <a
            href={AVITO_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff", borderRadius: 999, padding: "16px 32px",
              fontWeight: 700, fontSize: "clamp(14px,1.6vw,17px)",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
            }}
          >
            <Icon name="Star" size={20} />
            Наши живые отзывы с Авито
            <Icon name="ArrowUpRight" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

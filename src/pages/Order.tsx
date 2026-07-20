import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Icon from "@/components/ui/icon"

type ContactMethod = "call" | "write"
type Messenger = "whatsapp" | "telegram" | "max"

export default function Order() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const compositionTitle = searchParams.get("title") || ""
  const mode = searchParams.get("mode") || "order" // "order" | "details"

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [contactMethod, setContactMethod] = useState<ContactMethod>("call")
  const [messenger, setMessenger] = useState<Messenger | null>(null)
  const [question, setQuestion] = useState("")
  const [sent, setSent] = useState(false)

  const isDetails = mode === "details"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    fetch("https://functions.poehali.dev/66e742c0-31e9-409c-974a-d8afec3cec4c", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        compositionTitle,
        question,
        contactMethod,
        messenger: messenger || "",
        mode,
      }),
    }).catch(() => {})

    // Сразу открываем Max
    window.open("https://max.ru/u/f9LHodD0cOKm_43mHsBxiHB-ltwQ262aSmSr15u7zLF1RPvCCQ7PLmlM4DU", "_blank")
    setSent(true)
  }

  if (sent) {
    return (
      <main className="min-h-screen pt-[clamp(60px,7.5vw,86px)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-3">Заявка отправлена!</h2>
          <p className="text-muted-foreground text-lg mb-2">Мы свяжемся с вами в течение 15 минут для уточнения деталей.</p>

          <button
            onClick={() => navigate("/catalog")}
            className="px-8 py-3 rounded-full text-white font-semibold text-lg transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            Вернуться в каталог
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-[clamp(60px,7.5vw,86px)]">
      <div className="max-w-lg mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <Icon name="ArrowLeft" size={16} /> Назад
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {isDetails ? "Уточнить детали" : "Оформить заказ"}
          </h1>
          {compositionTitle && (
            <div className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", color: "#7c3aed" }}>
              <Icon name="Sparkles" size={14} />
              {compositionTitle}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Имя */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground/70">Ваше имя *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Например, Анастасия"
              required
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Телефон */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground/70">Номер телефона *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Вопрос / комментарий */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground/70">
              {isDetails ? "Ваш вопрос" : "Пожелания по заказу"}
            </label>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={isDetails ? "Опишите ваш вопрос..." : "Цвета, дата, особые пожелания..."}
              rows={3}
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Способ связи */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-foreground/70">Как вам будет удобнее, чтобы мы с Вами связались?</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setContactMethod("call"); setMessenger(null) }}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl border-2 font-semibold transition-all"
                style={{
                  borderColor: contactMethod === "call" ? "#7c3aed" : "#e5e7eb",
                  background: contactMethod === "call" ? "linear-gradient(135deg,#f5f3ff,#ede9fe)" : "#fff",
                  color: contactMethod === "call" ? "#7c3aed" : "#6b7280",
                }}
              >
                <span className="text-2xl">📞</span>
                <span className="text-sm">Позвонить по номеру</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("write")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl border-2 font-semibold transition-all"
                style={{
                  borderColor: contactMethod === "write" ? "#7c3aed" : "#e5e7eb",
                  background: contactMethod === "write" ? "linear-gradient(135deg,#f5f3ff,#ede9fe)" : "#fff",
                  color: contactMethod === "write" ? "#7c3aed" : "#6b7280",
                }}
              >
                <span className="text-2xl">💬</span>
                <span className="text-sm">Написать</span>
              </button>
            </div>

            {/* Выбор мессенджера */}
            {contactMethod === "write" && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Выберите мессенджер</label>
                <div className="flex gap-3">
                  {([
                    { id: "whatsapp" as Messenger, label: "WhatsApp", emoji: "💬", color: "#25D366" },
                    { id: "telegram" as Messenger, label: "Telegram", emoji: "✈️", color: "#229ED9" },
                    { id: "max" as Messenger, label: "Max", emoji: "🔵", color: "#1e3a5f" },
                  ]).map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMessenger(m.id)}
                      className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 font-semibold text-sm transition-all"
                      style={{
                        borderColor: messenger === m.id ? m.color : "#e5e7eb",
                        background: messenger === m.id ? m.color : "#fff",
                        color: messenger === m.id ? "#fff" : "#6b7280",
                      }}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Инфо */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)" }}>
            <span className="text-xl flex-shrink-0">⏱️</span>
            <p className="text-sm text-green-800 font-medium">
              Мы свяжемся с вами в течение <strong>15 минут</strong> для уточнения деталей.
            </p>
          </div>

          {/* Подсказка если мессенджер не выбран */}
          {contactMethod === "write" && !messenger && (
            <p className="text-sm text-amber-600 font-medium text-center -mb-1">
              ⚠️ Выберите мессенджер для продолжения
            </p>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={!name.trim() || !phone.trim() || (contactMethod === "write" && !messenger)}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg,#f97316,#e63000)",
              boxShadow: "0 6px 20px rgba(249,115,22,0.4)",
            }}
          >
            {isDetails ? "Уточнить детали 📩" : "Оформить заказ 🎈"}
          </button>
        </form>
      </div>
    </main>
  )
}
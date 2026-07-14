import { useEffect, useState, useMemo } from "react"
import Icon from "@/components/ui/icon"

const API_URL = "https://functions.poehali.dev/59327913-bd5b-4b52-a0d6-3fc28ff5acb4"

type PriceItem = {
  id: number
  subcategory: string
  title: string
  price: number
}

const CATEGORY_LABELS: Record<string, string> = {
  girl: "Для девушки",
  man: "Для мужчины",
  boy: "Для мальчика",
  "kid-girl": "Для девочки",
  "boy-discharge": "Выписка мальчика",
  "girl-discharge": "Выписка девочки",
  "bubbles-box": "Баблс-бокс",
  "surprise-box": "Коробка-сюрприз",
  "first-year": "1 годик",
  ceiling: "Шарики под потолок",
  numbers: "Цифра",
  cartoon: "Фигурка",
}

export default function AdminPrices() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [items, setItems] = useState<PriceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [edited, setEdited] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_prices_pw")
    if (saved) {
      setPassword(saved)
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) loadItems()
  }, [authed])

  const loadItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setLoginError("")
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ updates: [] }),
      })
      if (res.status === 401) {
        setLoginError("Неверный пароль")
        return
      }
      sessionStorage.setItem("admin_prices_pw", password)
      setAuthed(true)
    } catch (e) {
      setLoginError("Ошибка соединения")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_prices_pw")
    setAuthed(false)
    setPassword("")
  }

  const key = (it: PriceItem) => `${it.subcategory}|${it.id}`

  const handlePriceChange = (it: PriceItem, value: string) => {
    const num = value === "" ? 0 : parseInt(value.replace(/\D/g, ""), 10)
    setEdited(prev => ({ ...prev, [key(it)]: num }))
  }

  const editedCount = Object.keys(edited).length

  const handleSaveAll = async () => {
    if (editedCount === 0) return
    setSaving(true)
    setSaveMsg("")
    try {
      const updates = Object.entries(edited).map(([k, price]) => {
        const [subcategory, idStr] = k.split("|")
        return { id: parseInt(idStr, 10), subcategory, price }
      })
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ updates }),
      })
      if (res.status === 401) {
        setLoginError("Сессия истекла, войдите снова")
        setAuthed(false)
        return
      }
      const data = await res.json()
      if (data.success) {
        setItems(prev =>
          prev.map(it => {
            const k = key(it)
            return k in edited ? { ...it, price: edited[k] } : it
          })
        )
        setEdited({})
        setSaveMsg(`Сохранено: ${data.updated} набор(ов)`)
        setTimeout(() => setSaveMsg(""), 3000)
      }
    } catch (e) {
      setSaveMsg("Ошибка сохранения")
    } finally {
      setSaving(false)
    }
  }

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.subcategory))
    return Array.from(set)
  }, [items])

  const filtered = useMemo(() => {
    return items.filter(it => {
      if (category !== "all" && it.subcategory !== category) return false
      if (search && !it.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [items, category, search])

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-violet-50/30 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon name="Lock" className="text-primary" size={28} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center mb-1">Управление ценами</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Введите пароль администратора</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Пароль"
            className="w-full border border-border rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-primary/40"
            autoFocus
          />
          {loginError && <p className="text-sm text-red-500 mb-3">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white font-bold rounded-xl py-3 hover:opacity-90 transition-opacity"
          >
            Войти
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-violet-50/30">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Управление ценами</h1>
            <p className="text-sm text-muted-foreground">Всего наборов: {items.length}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl border border-border"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию..."
            className="flex-1 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/40"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/40 bg-white"
          >
            <option value="all">Все категории</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c] || c}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Загрузка...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Название</th>
                  <th className="px-4 py-3 font-semibold">Категория</th>
                  <th className="px-4 py-3 font-semibold w-40">Цена, ₽</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(it => {
                  const k = key(it)
                  const value = k in edited ? edited[k] : it.price
                  const changed = k in edited
                  return (
                    <tr key={k} className={`border-t border-border ${changed ? "bg-amber-50" : ""}`}>
                      <td className="px-4 py-2.5">{it.title}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{CATEGORY_LABELS[it.subcategory] || it.subcategory}</td>
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={value}
                          onChange={e => handlePriceChange(it, e.target.value)}
                          className={`w-28 border rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary/40 ${changed ? "border-amber-400 font-bold" : "border-border"}`}
                        />
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-10 text-center text-muted-foreground">
                      Ничего не найдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl px-4 py-3 flex items-center justify-between z-50">
          <span className="text-sm font-medium">
            Изменено наборов: <span className="text-primary font-bold">{editedCount}</span>
          </span>
          <div className="flex items-center gap-3">
            {saveMsg && <span className="text-sm text-green-600 font-medium">{saveMsg}</span>}
            <button
              onClick={() => setEdited({})}
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border"
            >
              Отменить
            </button>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-primary hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

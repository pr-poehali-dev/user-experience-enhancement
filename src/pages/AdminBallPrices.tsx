import { useEffect, useState, useMemo } from "react"
import Icon from "@/components/ui/icon"

const API_URL = "https://functions.poehali.dev/38b2859e-51ca-4afd-bfc2-bff28426596a"

type BallType = {
  id: number
  name: string
  price_per_unit: number
  is_figure: boolean
}

export default function AdminBallPrices() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [items, setItems] = useState<BallType[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [showFigures, setShowFigures] = useState(true)
  const [edited, setEdited] = useState<Record<number, number>>({})
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

  const handlePriceChange = (it: BallType, value: string) => {
    const num = value === "" ? 0 : parseInt(value.replace(/\D/g, ""), 10)
    setEdited(prev => ({ ...prev, [it.id]: num }))
  }

  const editedCount = Object.keys(edited).length

  const handleSaveAll = async () => {
    if (editedCount === 0) return
    setSaving(true)
    setSaveMsg("")
    try {
      const updates = Object.entries(edited).map(([id, price_per_unit]) => ({
        id: parseInt(id, 10),
        price_per_unit,
      }))
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
          prev.map(it => (it.id in edited ? { ...it, price_per_unit: edited[it.id] } : it))
        )
        setEdited({})
        setSaveMsg(`Сохранено. Пересчитано наборов: ${data.recalculated_compositions}`)
        setTimeout(() => setSaveMsg(""), 4000)
      }
    } catch (e) {
      setSaveMsg("Ошибка сохранения")
    } finally {
      setSaving(false)
    }
  }

  const filtered = useMemo(() => {
    return items.filter(it => {
      if (!showFigures && it.is_figure) return false
      if (search && !it.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [items, search, showFigures])

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-violet-50/30 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon name="Lock" className="text-primary" size={28} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center mb-1">Калькулятор цен на шары</h1>
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
      <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Калькулятор цен на шары</h1>
            <p className="text-sm text-muted-foreground">Всего видов: {items.length}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl border border-border"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 flex gap-2 items-start">
          <Icon name="Info" size={18} className="text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            Укажи актуальную цену за штуку для каждого вида шара или фигурки. После сохранения цены всех наборов на сайте пересчитаются автоматически как сумма (кол-во × цена за штуку).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию..."
            className="flex-1 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={() => setShowFigures(v => !v)}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border transition-colors ${
              showFigures ? "border-primary/40 bg-primary/5 text-primary" : "border-border text-muted-foreground"
            }`}
          >
            <Icon name={showFigures ? "Eye" : "EyeOff"} size={16} />
            Фигурки
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Загрузка...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Название</th>
                  <th className="px-4 py-3 font-semibold w-24">Тип</th>
                  <th className="px-4 py-3 font-semibold w-36">Цена за шт, ₽</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(it => {
                  const value = it.id in edited ? edited[it.id] : it.price_per_unit
                  const changed = it.id in edited
                  return (
                    <tr key={it.id} className={`border-t border-border ${changed ? "bg-amber-50" : ""}`}>
                      <td className="px-4 py-2.5">{it.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">
                        {it.is_figure ? "Фигурка" : "Шары"}
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={value}
                          onChange={e => handlePriceChange(it, e.target.value)}
                          className={`w-full border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/40 ${
                            changed ? "border-amber-400" : "border-border"
                          }`}
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm font-medium">Изменено видов: {editedCount}</p>
            <div className="flex items-center gap-3">
              {saveMsg && <p className="text-sm text-green-600">{saveMsg}</p>}
              <button
                onClick={() => setEdited({})}
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl border border-border"
              >
                Отменить
              </button>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="bg-primary text-white font-bold rounded-xl px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Сохранение..." : "Сохранить и пересчитать"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

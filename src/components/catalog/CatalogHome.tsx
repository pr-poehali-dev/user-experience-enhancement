import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function CatalogHome() {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm"
      >
        <Icon name="ArrowLeft" size={16} /> На главную
      </button>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight mb-2 sm:mb-3">
        Каталог <span className="font-semibold">шариков</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10">Выберите повод для праздника</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-8">
        <button
          onClick={() => navigate("/catalog?section=birthday")}
          className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 min-h-[180px] sm:min-h-[400px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <span className="relative text-5xl sm:text-8xl">🎂</span>
          <div className="relative text-center">
            <h2 className="text-white text-lg sm:text-4xl font-bold mb-1 sm:mb-2 leading-tight">На день рождения</h2>
            <p className="text-white/80 text-xs sm:text-lg hidden sm:block">Для девушки, мужчины, мальчика и девочки</p>
          </div>
          <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
            Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
            <span className="hidden sm:inline">все композиции</span>
            <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
          </div>
        </button>
        <button
          onClick={() => navigate("/catalog?section=discharge")}
          className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 min-h-[180px] sm:min-h-[400px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <span className="relative text-5xl sm:text-8xl">👶</span>
          <div className="relative text-center">
            <h2 className="text-white text-lg sm:text-4xl font-bold mb-1 sm:mb-2 leading-tight">На выписку</h2>
            <p className="text-white/80 text-xs sm:text-lg hidden sm:block">Встречаем малыша из роддома</p>
          </div>
          <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
            Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
            <span className="hidden sm:inline">все композиции</span>
            <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
          </div>
        </button>
        <button
          onClick={() => navigate("/catalog?section=other")}
          className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 min-h-[180px] sm:min-h-[320px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <span className="relative text-5xl sm:text-7xl">🎉</span>
          <div className="relative text-center">
            <h2 className="text-white text-lg sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight">Другое мероприятие</h2>
            <p className="text-white/80 text-xs sm:text-base hidden sm:block">Гендер пати, выпускной, девичник</p>
          </div>
          <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
            Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
            <span className="hidden sm:inline">варианты</span>
            <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
          </div>
        </button>
        <button
          onClick={() => navigate("/catalog?section=custom")}
          className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 min-h-[180px] sm:min-h-[320px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <span className="relative text-5xl sm:text-7xl">✨</span>
          <div className="relative text-center">
            <h2 className="text-white text-lg sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight">Собрать свою композицию</h2>
            <p className="text-white/80 text-xs sm:text-base hidden sm:block">Цифры, баблс, фигуры, хром, пастель</p>
          </div>
          <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
            Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
            <span className="hidden sm:inline">элементы</span>
            <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
          </div>
        </button>
      </div>
    </div>
  )
}

import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Composition } from "@/data/catalogData"
import CompositionGrid from "@/components/catalog/CompositionGrid"

type SectionConfig = {
  emoji: string
  title: string
  subtitle: string
  items?: Composition[]
  showSubcategoryBadge?: boolean
  showDischargeBadge?: boolean
  comingSoon?: boolean
  comingSoonText?: string
}

const SECTION_MAP: Record<string, Omit<SectionConfig, "items">> = {
  birthday: {
    emoji: "🎂",
    title: "На день рождения",
    subtitle: "Для девушки, мужчины, мальчика, девочки и другие",
    showSubcategoryBadge: true,
  },
  discharge: {
    emoji: "👶",
    title: "На выписку",
    subtitle: "Встречаем малыша из роддома",
    showDischargeBadge: true,
  },
  other: {
    emoji: "🎉",
    title: "Другое мероприятие",
    subtitle: "Гендер пати, выпускной, девичник, признание в любви",
    comingSoon: true,
    comingSoonText: "Пока можете заказать любую композицию через мессенджер",
  },
  custom: {
    emoji: "✨",
    title: "Собрать свою композицию",
    subtitle: "Цифры, баблс, фигуры, хром, пастель",
    comingSoon: true,
    comingSoonText: "Опишите желаемую композицию в мессенджере — подберём под вас",
  },
}

type Props = {
  section: string
  items: Composition[]
}

export default function CatalogSection({ section, items }: Props) {
  const navigate = useNavigate()
  const config = SECTION_MAP[section]
  if (!config) return null

  const handleBack = () => {
    localStorage.removeItem("catalog_section")
    navigate("/catalog")
  }

  const isFirstSection = section === "birthday"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
      <div className={isFirstSection ? "flex items-center gap-4 mb-3" : undefined}>
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm mb-3"
        >
          <Icon name="ArrowLeft" size={16} /> Назад
        </button>
      </div>
      <div className={`flex items-center gap-3 ${config.comingSoon ? "mb-6 sm:mb-10" : "mb-4 sm:mb-6"}`}>
        <span className="text-3xl sm:text-4xl">{config.emoji}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{config.title}</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">{config.subtitle}</p>
        </div>
      </div>

      {config.comingSoon ? (
        <div className="text-center py-24 text-muted-foreground">
          <span className="text-6xl mb-6 block">{config.emoji}</span>
          <p className="text-xl font-medium mb-2">Раздел скоро появится</p>
          <p className="text-sm">{config.comingSoonText}</p>
          <a
            href="https://wa.me/message/SIGCSZPAMQ34J1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md"
          >
            <Icon name="MessageSquare" size={18} /> Написать в WhatsApp
          </a>
        </div>
      ) : (
        <CompositionGrid
          key={section}
          items={items}
          showSubcategoryBadge={config.showSubcategoryBadge}
          showDischargeBadge={config.showDischargeBadge}
        />
      )}
    </div>
  )
}
import { Component, ReactNode } from "react"

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error("App crashed:", error)
  }

  handleReload = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100svh", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 16, padding: 24,
            textAlign: "center", background: "#fdfbff",
          }}
        >
          <svg width="48" height="62" viewBox="0 0 40 52" fill="none">
            <ellipse cx="20" cy="20" rx="18" ry="20" fill="#7c3aed" />
            <path d="M20 40 L17 46 L23 46 Z" fill="#7c3aed" />
            <line x1="20" y1="46" x2="20" y2="52" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1024" }}>
            Что-то пошло не так
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#8a7d9c", fontSize: 14, maxWidth: 320 }}>
            Страница не смогла загрузиться. Попробуйте обновить её.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: "#6d28d9", color: "#fff", fontWeight: 700, fontSize: 14,
              border: "none", borderRadius: 999, padding: "12px 28px", cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Обновить страницу
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
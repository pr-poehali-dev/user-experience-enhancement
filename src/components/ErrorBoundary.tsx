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
          <div style={{ fontSize: 56 }}>🎈</div>
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

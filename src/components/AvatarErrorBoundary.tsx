import { Component, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class AvatarErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Avatar scene failed to render, showing fallback.', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

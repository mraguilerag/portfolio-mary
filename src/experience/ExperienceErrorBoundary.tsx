import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ExperienceErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ExperienceErrorBoundaryState {
  hasError: boolean
}

export default class ExperienceErrorBoundary extends Component<
  ExperienceErrorBoundaryProps,
  ExperienceErrorBoundaryState
> {
  state: ExperienceErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ExperienceErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('The portfolio 3D experience failed to render.', error, info)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

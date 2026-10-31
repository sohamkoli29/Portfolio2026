import { Component } from 'react';

// Catches errors while drawing part of the page so one failure cannot blank the whole site.
// `fallback` is shown instead of the broken part (null shows nothing).
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('ErrorBoundary caught an error:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
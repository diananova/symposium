import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="splash-wordmark">Symposium</div>
          <p className="empty-note">
            Something went wrong. Your progress is safe — it lives on this device.
          </p>
          <button
            className="status-btn"
            onClick={() => {
              window.location.hash = '#/';
              window.location.reload();
            }}
          >
            Return to the curriculum
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

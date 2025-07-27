import { Component, type ErrorInfo } from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};
class ErrorBoundary extends Component<Props, State> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>
            Something went wrong, please reset this page by clicking the reset
            button!
          </p>
          <button onClick={() => this.setState({ error: null })}>
            Reset Button
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

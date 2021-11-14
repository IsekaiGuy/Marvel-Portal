import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log((error, errorInfo));
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <aside>
          <h2>Something went wrong!</h2>
          <ErrorMessage />
        </aside>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

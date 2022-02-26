import { Component } from "react";
// eslint-disable-next-line import/namespace,import/named
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary", error, errorInfo);
    setTimeout(() => this.setState({ redirect: true }), 5000);

  }

  render() {
    if (this.state.redirect)  {
      return (<Redirect to="/" />);
    }
    if (this.state.hasError) {
      return (
        <h1>This listing has Error.
          <Link to="/">Click here</Link> to go back to home page or wait for 5 seconds
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

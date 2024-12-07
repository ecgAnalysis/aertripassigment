import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // Catch errors using try/catch inside useEffect
  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("Error caught in ErrorBoundary:", error, errorInfo);
      setHasError(true);
    };

    // You could also use window.onerror or other global handlers
    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return children;
};

export default ErrorBoundary;

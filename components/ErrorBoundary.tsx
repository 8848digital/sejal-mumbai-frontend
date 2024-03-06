import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }: any) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (event: ErrorEvent) => {
      console.error('Error caught by error boundary:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    return (
      <div className="text-center mt-5">
        <i
          className="fa-solid fa-ghost text-secondary"
          style={{ fontSize: 50 }}
        ></i>
        <h1>Something Went Wrong!!</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;

import { useState, useEffect } from 'react';
import { useAdminAuth } from './auth';
import './AuthGate.css';

export default function AuthGate({ children }) {
  const { loading, isAuthorized, error } = useAdminAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="ag-auth-gate-container ag-loading-state">
        <div className="ag-loading-content">
          <div className="ag-spinner-container">
            <div className="ag-spinner-ring ag-ring-1"></div>
            <div className="ag-spinner-ring ag-ring-2"></div>
            <div className="ag-spinner-ring ag-ring-3"></div>
            <div className="ag-spinner-core"></div>
          </div>
          <div className="ag-loading-text">Verifying Access</div>
          <div className="ag-loading-subtext">Authenticating credentials...</div>
        </div>
      </div>
    );
  }

  if (!isAuthorized()) {
    return (
      <div className="ag-auth-gate-container ag-unauthorized-state">
        <div className="ag-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="ag-particle"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="ag-unauthorized-content">
          <div className="ag-warning-icon-container">
            <div className="ag-warning-circle"></div>
            <div className="ag-warning-symbol">⚠</div>
          </div>

          <div className="ag-error-code">403</div>
          <div className="ag-error-title">Access Denied</div>
          <div className="ag-error-message">
            You are not authorized to access this application. This area is restricted to authorized personnel only.
          </div>

          {error && (
            <div className="ag-error-details">
              <div className="ag-error-details-title">Error Details</div>
              <div className="ag-error-details-content">{error}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {children}
    </div>
  );
}
import  { useState, useEffect } from 'react';
import { useAdminAuth } from './auth';
import './AuthGate.css'
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
      <div className="auth-gate-container loading-state">
        <style>{`
        
        `}</style>

        <div className="loading-content">
          <div className="spinner-container">
            <div className="spinner-ring ring-1"></div>
            <div className="spinner-ring ring-2"></div>
            <div className="spinner-ring ring-3"></div>
            <div className="spinner-core"></div>
          </div>
          <div className="loading-text">Verifying Access</div>
          <div className="loading-subtext">Authenticating credentials...</div>
        </div>
      </div>
    );
  }

  if (!isAuthorized()) {
    return (
      <div className="auth-gate-container unauthorized-state">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
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

        <div className="unauthorized-content">
          <div className="warning-icon-container">
            <div className="warning-circle"></div>
            <div className="warning-symbol">⚠</div>
          </div>

          <div className="error-code">403</div>
          <div className="error-title">Access Denied</div>
          <div className="error-message">
            You are not authorized to access this application. This area is restricted to authorized personnel only.
          </div>

          {error && (
            <div className="error-details">
              <div className="error-details-title">Error Details</div>
              <div className="error-details-content">{error}</div>
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
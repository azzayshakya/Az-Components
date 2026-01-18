import { createRoot } from 'react-dom/client';
import './index.css';
import '../src/css/CustomTable.css';
import '../src/css/FieldSet.css';
import '../src/css/AntForm.css';

import App from './App.jsx';
import AuthGate from './admin/authContext/AdminGate';
import { AdminAuthProvider } from './admin/authContext/auth';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <>
    <AdminAuthProvider>
      <AuthGate>
        <App />
      </AuthGate>
    </AdminAuthProvider>
    <Toaster
      position="top-right"
      reverseOrder={true}
      gutter={8}
      containerClassName="toast-container"
      toastOptions={{
        duration: 3500,

        style: {
          borderRadius: '8px',
          fontSize: '14px',
          maxWidth: '420px',
          padding: '10px 14px',
        },

        success: {
          duration: 3000,
          iconTheme: {
            primary: '#22c55e',
            secondary: '#ecfdf5',
          },
        },

        error: {
          duration: 4500,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fee2e2',
          },
        },

        loading: {
          duration: Infinity,
        },
      }}
    />
  </>
);

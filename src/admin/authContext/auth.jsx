import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://api.elmech.live', 
  ENDPOINTS: {
    VERIFY_ADMIN: '/admin/verify',     
    REFRESH_TOKEN: '/admin/refresh',   
    LOGOUT: '/admin/logout'             
  },
  TIMEOUT: 10000,
  USE_DUMMY_DATA: true
};

const STORAGE_KEYS = {
  ADMIN_USER: 'admin_user_data',
  ADMIN_TOKEN: 'admin_token'
};

const REDIRECT_URL = 'https://www.elmech.live';



const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Outgoing API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      timestamp: new Date().toISOString()
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Incoming API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      timestamp: new Date().toISOString()
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Interceptor Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      url: error.config?.url,
      timestamp: new Date().toISOString()
    });
    return Promise.reject(error);
  }
);

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🚀 AdminAuthProvider: Component mounted');
    console.log('AdminAuthProvider authentication started');
    verifyAdminAccess();
  }, []);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const verifyAdminAccess = async () => {
    setLoading(true);
    setError(null);

    console.log('🔐 AUTHENTICATION FLOW: STARTED');

    try {
      
      console.log('📦 STEP 1: Checking local storage cache...');
      const cachedUser = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
      const cachedToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

      if (cachedUser) {
        console.log('✅ Cache HIT: Found cached admin data');
        const parsedUser = JSON.parse(cachedUser);
        console.log('👤 Cached User Details:', {
          id: parsedUser.id,
          name: parsedUser.name,
          role: parsedUser.role,
          email: parsedUser.email
        });
      } else {
        console.log('⚠️  Cache MISS: No cached admin data found');
      }

      if (cachedToken) {
        console.log('🔑 Found cached token (first 20 chars):', cachedToken.substring(0, 20) + '...');
      } else {
        console.log('⚠️  No cached token found');
      }

      // ──────────────────────────────────────────────────────
      // STEP 2: Authenticate with Server
      // ──────────────────────────────────────────────────────
      console.log('\n⏳ STEP 2: Authenticating with server...');
      console.log('🔄 Validating cookies (Access Token & Refresh Token)...');

      let authenticatedUser;

      // ============================================================
      // 🚧 API INTEGRATION POINT 🚧
      // ============================================================
      if (API_CONFIG.USE_DUMMY_DATA) {
        // ────────────────────────────────────────────────────
        // DUMMY DATA MODE (Development)
        // ────────────────────────────────────────────────────
        console.log('🔧 Using DUMMY DATA (API_CONFIG.USE_DUMMY_DATA = true)');
        
        console.log('⏱️  Simulating network delay (2000ms)...');
        await delay(2000);

        const dummyAdmin = {
          id: 1,
          name: "Ajay Admin",
          role: "Admin",
          email: "admin@elmech.live",
          designation: "Software Developer",
          permissions: ["read", "write", "delete", "manage_users"],
          department: "Engineering",
          lastLogin: new Date().toISOString(),
          profileImage: null
        };

        console.log('🎭 Dummy Admin Data Loaded:');
        console.log('   ├─ ID:', dummyAdmin.id);
        console.log('   ├─ Name:', dummyAdmin.name);
        console.log('   ├─ Role:', dummyAdmin.role);
        console.log('   ├─ Email:', dummyAdmin.email);
        console.log('   ├─ Designation:', dummyAdmin.designation);
        console.log('   └─ Permissions:', dummyAdmin.permissions.join(', '));

        authenticatedUser = dummyAdmin;

      } else {
    
        console.log('🌐 Making REAL API call to verify admin...');
        console.log('📡 Endpoint:', API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.VERIFY_ADMIN);

        try {
          const response = await apiClient.post(API_CONFIG.ENDPOINTS.VERIFY_ADMIN, {
            // Add any request payload if needed
            timestamp: new Date().toISOString()
          });

          console.log('✅ API Response received');
          console.log('📊 Response status:', response.status);

          if (response.data && response.data.success) {
            const { user, accessToken, refreshToken } = response.data;

            console.log('🎉 Authentication successful!');
            console.log('👤 User data received from API:', {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email
            });

            // Store tokens if provided
            if (accessToken) {
              console.log('🔑 New Access Token received and stored');
              localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, accessToken);
            }

            if (refreshToken) {
              console.log('🔄 Refresh Token received');
            }

            authenticatedUser = user;

          } else {
            console.error('❌ API returned success=false');
            throw new Error(response.data.message || 'Authentication failed');
          }

        } catch (apiError) {
          console.error('❌ API Call Failed');
          console.error('🔍 Error Details:', {
            message: apiError.message,
            status: apiError.response?.status,
            statusText: apiError.response?.statusText,
            data: apiError.response?.data
          });

          // Handle specific HTTP error codes
          if (apiError.response?.status === 401) {
            console.error('🚫 401 Unauthorized: Invalid or expired credentials');
            throw new Error('Session expired. Please login again.');
          } else if (apiError.response?.status === 403) {
            console.error('🚫 403 Forbidden: Insufficient permissions');
            throw new Error('Access denied: You do not have admin permissions');
          } else if (apiError.response?.status === 404) {
            console.error('🚫 404 Not Found: API endpoint not found');
            throw new Error('Authentication service not found');
          } else if (apiError.response?.status >= 500) {
            console.error('🚫 5xx Server Error: Backend is down');
            throw new Error('Authentication service is temporarily unavailable');
          } else {
            throw new Error('Authentication failed: ' + apiError.message);
          }
        }
      }
      // ============================================================

      // ──────────────────────────────────────────────────────
      // STEP 3: Validate User Role
      // ──────────────────────────────────────────────────────
      console.log('\n🔍 STEP 3: Validating user role...');
      console.log('👤 User role detected:', authenticatedUser.role);

      const allowedRoles = ['Admin', 'CEO', 'Manager'];
      console.log('✅ Allowed roles:', allowedRoles.join(', '));

      if (!allowedRoles.includes(authenticatedUser.role)) {
        console.error('❌ Role validation FAILED');
        console.error('🚫 User role "' + authenticatedUser.role + '" is not authorized');
        throw new Error('Access denied: User does not have admin-level role');
      }

      console.log('✅ Role validation PASSED: User has "' + authenticatedUser.role + '" role');

      // ──────────────────────────────────────────────────────
      // STEP 4: Store User Data
      // ──────────────────────────────────────────────────────
      console.log('\n💾 STEP 4: Storing authenticated user data...');
      
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(authenticatedUser));
      console.log('✅ User data saved to localStorage');
      
      setAdminUser(authenticatedUser);
      console.log('✅ User data set in React state');
      
      setError(null);
      console.log('✅ Error state cleared');

      // ──────────────────────────────────────────────────────
      // SUCCESS
      // ──────────────────────────────────────────────────────
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 AUTHENTICATION SUCCESSFUL');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✨ Admin access GRANTED');
      console.log('👤 Welcome, ' + authenticatedUser.name + '!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (err) {
      // ──────────────────────────────────────────────────────
      // ERROR HANDLING
      // ──────────────────────────────────────────────────────
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ AUTHENTICATION FAILED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('🚫 Error message:', err.message);
      console.error('📋 Full error:', err);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      setError(err.message || 'Access denied: Authentication failed');
      clearAdminData();

      console.log('🧹 Admin data cleared from storage');
      console.log('⚠️  User will see "Access Denied" screen');
      console.log('⏱️  Auto-redirect to marketing site in 5 seconds');

    } finally {
      setLoading(false);
      console.log('🔓 Authentication flow COMPLETED');
      console.log('⏹️  Loading state set to FALSE\n');
    }
  };

 
  const clearAdminData = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    setAdminUser(null);
    console.log('✅ Admin data cleared successfully');
  };


  const logout = async () => {
   
    console.log('🚪 LOGOUT INITIATED');


    try {
      
      if (API_CONFIG.USE_DUMMY_DATA) {
        console.log('🔧 Dummy mode: Simulating logout API call...');
        await delay(500);
        console.log('✅ Logout API simulated (dummy mode)');
      } else {
        console.log('📡 Calling logout API...');
        console.log('🔗 Endpoint:', API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGOUT);
        
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
        
        console.log('✅ Server-side logout successful');
        console.log('📊 Response status:', response.status);
      }
      // ============================================================

    } catch (err) {
      console.error('❌ Logout API error:', err.message);
      console.log('⚠️  Continuing with client-side logout...');
    } finally {
      clearAdminData();
      
      console.log('🔄 Redirecting to marketing site...');
      console.log('🔗 Redirect URL:', REDIRECT_URL);
      console.log('👋 Goodbye!\n');

      // Redirect to marketing site
      window.location.href = REDIRECT_URL;
    }
  };


  const isAuthorized = () => {
    const authorized = adminUser !== null && !error;
    
    console.log('🔐 Authorization check:', {
      hasUser: adminUser !== null,
      hasError: error !== null,
      isAuthorized: authorized
    });
    
    return authorized;
  };
  // const  = async () => {
  //   console.log('🔄 Refresh requested: Re-verifying admin access...');
  //   await verifyAdminAccess();
  // };

  // ──────────────────────────────────────────────────────────
  // Context Value
  // ──refreshAdminData────────────────────────────────────────────────────────
  const value = {
    adminUser,
    loading,
    error,
    isAuthorized,
    logout,
    // refreshAdminData
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

/**
 * ============================================================
 * CUSTOM HOOK: useAdminAuth
 * ============================================================
 * 
 * Hook to access admin auth context from any component
 * 
 * Usage:
 * const { adminUser, loading, error, isAuthorized, logout } = useAdminAuth();
 */
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  
  return context;
};


export { API_CONFIG };
import { createContext, useContext, useState, useEffect } from 'react';
import { getApiBaseUrl, STORAGE_KEYS } from '../advanceApi/apiConfig';
import apiService from '../advanceApi/apiService';

const AdminAuthContext = createContext(null);
const useDummyData = true;
export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🚀 AdminAuthProvider: Component mounted');
    console.log('AdminAuthProvider authentication started');
    verifyAdminAccess();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
          email: parsedUser.email,
        });
      } else {
        console.log('⚠️  Cache MISS: No cached admin data found');
      }

      if (cachedToken) {
        console.log(
          '🔑 Found cached token (first 20 chars):',
          cachedToken.substring(0, 20) + '...'
        );
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
      if (useDummyData) {
        // ────────────────────────────────────────────────────
        // DUMMY DATA MODE (Development)
        // ────────────────────────────────────────────────────
        console.log('🔧 Using DUMMY DATA (useDummyData = true)');

        console.log('⏱️  Simulating network delay (2000ms)...');
        await delay(2000);

        const dummyAdmin = {
          id: 1,
          name: 'Ajay Admin',
          role: 'Admin',
          email: 'admin@elmech.live',
          designation: 'Software Developer',
          permissions: ['read', 'write', 'delete', 'manage_users'],
          department: 'Engineering',
          lastLogin: new Date().toISOString(),
          profileImage: null,
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
        console.log('📡 Endpoint:', getApiBaseUrl() + apiService.verifyAdminDashboardUser());

        try {
          const response = apiService.verifyAdminDashboardUser();

          console.log('✅ API Response received');
          console.log('📊 Response status:', response.status);

          if (response.data && response.data.success) {
            const { user, accessToken, refreshToken } = response.data;

            console.log('🎉 Authentication successful!');
            console.log('👤 User data received from API:', {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email,
            });

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
            data: apiError.response?.data,
          });
          throw apiError;
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

  const logout = async () => {};

  const isAuthorized = () => {
    const authorized = adminUser !== null && !error;
    console.log('🔐 Authorization check:', {
      hasUser: adminUser !== null,
      hasError: error !== null,
      isAuthorized: authorized,
    });

    return authorized;
  };
  const value = {
    adminUser,
    loading,
    error,
    isAuthorized,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }

  return context;
};

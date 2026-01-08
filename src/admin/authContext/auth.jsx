import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify admin access on app load
  useEffect(() => {
    verifyAdminAccess();
  }, []);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


             const verifyAdminAccess = async () => {
  setLoading(true);
  setError(null);

  const dummyAdmin = {
    id: 1,
    name: "Ajay Admin",
    role: "Admin",
    email: "admin@test.com",
    designation: "Software Developer",
  };

  try {
    console.log("🔐 Verifying admin access...");

    // ⏳ Simulate API delay (2 seconds)
    await delay(2000);

    // Fast UI from cache
    const cachedUser = localStorage.getItem("admin_user_data");
    if (cachedUser) {
      console.log("⚡ Using cached admin");
      setAdminUser(JSON.parse(cachedUser));
    }

    // Simulate success
    if (dummyAdmin.role==="Admin") {
      localStorage.setItem("admin_user_data", JSON.stringify(dummyAdmin));
      setAdminUser(dummyAdmin);
      setError(null);

      console.log("✅ Admin verified:", dummyAdmin);
    } else {
      throw new Error("Not authorized");
    }
  } catch (err) {
    console.error("❌ Auth failed", err);
    setError("Access denied");
    clearAdminData();
  } finally {
    setLoading(false);
    console.log("🔓 Auth check completed");
  }
};


  const clearAdminData = () => {
    localStorage.removeItem('admin_user_data');
    localStorage.removeItem('admin_token');
    setAdminUser(null);
  };

  const logout = async () => {
    try {
      // Optional: call backend to clear cookie
      await fetch('YOUR_API/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAdminData();
      window.location.href = 'https://www.elmech.live/';
    }
  };

  const isAuthorized = () => {
    return adminUser !== null && !error;
  };

  const refreshAdminData = async () => {
    await verifyAdminAccess();
  };

  const value = {
    adminUser,
    loading,
    error,
    isAuthorized,
    logout,
    refreshAdminData
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
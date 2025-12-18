/**
 * Example Usage Scenarios
 * Demonstrates various ways to use the admin sidebar system
 */

import AdminMain from './managment-hook/AdminMain';
import PropTypes from 'prop-types';
// ============================================
// Example 1: Admin User with Full Access
// ============================================
export const AdminExample = () => {
  const adminUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: USER_ROLES.ADMIN,
  };

  return (
    <AdminMain 
      userRole={USER_ROLES.ADMIN}
      userData={adminUser}
    />
  );
};

// ============================================
// Example 2: Manager with Limited Access
// ============================================
export const ManagerExample = () => {
  const managerUser = {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    role: USER_ROLES.MANAGER,
  };

  return (
    <AdminMain 
      userRole={USER_ROLES.MANAGER}
      userData={managerUser}
    />
  );
};

// ============================================
// Example 3: Regular User with Basic Access
// ============================================
export const UserExample = () => {
  const regularUser = {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    role: USER_ROLES.USER,
  };

  return (
    <AdminMain 
      userRole={USER_ROLES.USER}
      userData={regularUser}
    />
  );
};

// ============================================
// Example 4: Dynamic Role Based on Auth
// ============================================
export const DynamicRoleExample = () => {
  // Simulate getting user from auth context/API
  const getCurrentUser = () => {
    // This would typically come from your auth system
    return {
      id: '4',
      name: 'Dynamic User',
      email: 'dynamic@example.com',
      role: USER_ROLES.ADMIN, // This would be dynamic
    };
  };

  const currentUser = getCurrentUser();

  return (
    <AdminMain 
      userRole={currentUser.role}
      userData={currentUser}
    />
  );
};

// ============================================
// Example 5: With React Router Integration
// ============================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const RouterIntegratedExample = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/*" element={<AdminMain userRole={USER_ROLES.ADMIN} />} />
      </Routes>
    </BrowserRouter>
  );
};

// ============================================
// Example 6: With Authentication Guard
// ============================================
import { useState, useEffect } from 'react';

export const AuthenticatedExample = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        // Replace with your actual auth check
        const response = await fetch('/api/auth/me');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Redirect to login
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <AdminMain 
      userRole={user.role}
      userData={user}
    />
  );
};

// ============================================
// Example 7: Testing Different Permissions
// ============================================


export const PermissionTestExample = () => {
  // Test what each role can see
  const adminMenuItems = buildMenuItems(MENU_CONFIG, USER_ROLES.ADMIN);
  const managerMenuItems = buildMenuItems(MENU_CONFIG, USER_ROLES.MANAGER);
  const userMenuItems = buildMenuItems(MENU_CONFIG, USER_ROLES.USER);

  console.log('Admin can see:', adminMenuItems.length, 'top-level items');
  console.log('Manager can see:', managerMenuItems.length, 'top-level items');
  console.log('User can see:', userMenuItems.length, 'top-level items');

  return (
    <AdminMain 
      userRole={USER_ROLES.ADMIN}
      userData={{ name: 'Test User' }}
    />
  );
};

// ============================================
// Example 8: Custom Theme Integration
// ============================================
import { ConfigProvider } from 'antd';

export const CustomThemeExample = () => {
  const customTheme = {
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#1890ff',
      borderRadius: 6,
      fontSize: 14,
    },
    components: {
      Menu: {
        itemBg: 'transparent',
        itemSelectedBg: 'rgba(24, 144, 255, 0.1)',
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <AdminMain 
        userRole={USER_ROLES.ADMIN}
        userData={{ name: 'Themed User' }}
      />
    </ConfigProvider>
  );
};

// ============================================
// Example 9: Multi-tenant Setup
// ============================================
export const MultiTenantExample = () => {
  const [tenant, setTenant] = useState('tenant-1');

  const getTenantUser = (tenantId) => {
    // Different users/roles per tenant
    const tenantUsers = {
      'tenant-1': {
        id: '1',
        name: 'Tenant 1 Admin',
        role: USER_ROLES.ADMIN,
        tenant: 'tenant-1',
      },
      'tenant-2': {
        id: '2',
        name: 'Tenant 2 Manager',
        role: USER_ROLES.MANAGER,
        tenant: 'tenant-2',
      },
    };

    return tenantUsers[tenantId];
  };

  const currentUser = getTenantUser(tenant);

  return (
    <div>
      {/* Tenant Selector */}
      <select 
        value={tenant} 
        onChange={(e) => setTenant(e.target.value)}
        style={{ margin: '10px' }}
      >
        <option value="tenant-1">Tenant 1</option>
        <option value="tenant-2">Tenant 2</option>
      </select>

      <AdminMain 
        userRole={currentUser.role}
        userData={currentUser}
      />
    </div>
  );
};

// ============================================
// Example 10: With State Management (Redux/Context)
// ============================================
import { createContext, useContext } from 'react';
import { USER_ROLES } from './constants/Permission';
import { buildMenuItems } from './utilities/MenuBuilder';
import MENU_CONFIG from './control/MenuConfig';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Context User',
    role: USER_ROLES.ADMIN,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const ContextExample = () => {
  const { user } = useContext(UserContext);

  return (
    <AdminMain 
      userRole={user.role}
      userData={user}
    />
  );
};

// To use:
// <UserProvider>
//   <ContextExample />
// </UserProvider>

export default {
  AdminExample,
  ManagerExample,
  UserExample,
  DynamicRoleExample,
  RouterIntegratedExample,
  AuthenticatedExample,
  PermissionTestExample,
  CustomThemeExample,
  MultiTenantExample,
  ContextExample,
};
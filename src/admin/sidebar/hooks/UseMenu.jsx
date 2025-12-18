
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoute } from '../control/RouteConfiguration';
import MENU_CONFIG from '../control/MenuConfig';
import { getParentKeys } from '../utilities/MenuBuilder';


export const useMenu = ({ defaultSelectedKey = 'dashboard', persistState = true } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for selected keys
  const [selectedKeys, setSelectedKeys] = useState(() => {
    if (persistState) {
      const saved = localStorage.getItem('selectedMenuKey');
      return saved ? [saved] : [defaultSelectedKey];
    }
    return [defaultSelectedKey];
  });

  // State for open submenu keys
  const [openKeys, setOpenKeys] = useState(() => {
    if (persistState) {
      const saved = localStorage.getItem('openMenuKeys');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Handle menu item click
  const handleMenuClick = useCallback(
    ({ key }) => {
      setSelectedKeys([key]);

      // Persist selected key
      if (persistState) {
        localStorage.setItem('selectedMenuKey', key);
      }

      // Navigate to route
      const route = getRoute(key);
      if (route) {
        navigate(route);
      }
    },
    [navigate, persistState]
  );

  // Handle submenu open/close
  const handleOpenChange = useCallback(
    (keys) => {
      setOpenKeys(keys);

      // Persist open keys
      if (persistState) {
        localStorage.setItem('openMenuKeys', JSON.stringify(keys));
      }
    },
    [persistState]
  );

  // Sync menu with route changes
  useEffect(() => {
    // Find menu key that matches current route
    const currentPath = location.pathname;
    console.log(currentPath)
    // You can implement route-to-key mapping here
    // For now, we'll keep the current selected key
  }, [location.pathname]);

  // Auto-open parent menus for selected item
  useEffect(() => {
    if (selectedKeys.length > 0) {
      const parents = getParentKeys(MENU_CONFIG, selectedKeys[0]);
      if (parents.length > 0 && !openKeys.some(key => parents.includes(key))) {
        setOpenKeys(prev => [...new Set([...prev, ...parents])]);
      }
    }
  }, [selectedKeys, openKeys]);

  return {
    selectedKeys,
    openKeys,
    setSelectedKeys,
    setOpenKeys,
    handleMenuClick,
    handleOpenChange,
  };
};

export default useMenu;
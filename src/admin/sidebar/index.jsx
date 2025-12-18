/**
 * JSDoc Type Definitions for JavaScript Project
 * Provides IntelliSense and type hints in VS Code and other IDEs
 * 
 * Usage in your files:
 * @type {import('./types').MenuItem}
 */

// ============================================
// Menu Types
// ============================================

/**
 * @typedef {Object} MenuItem
 * @property {string} key - Unique identifier for the menu item
 * @property {string} label - Display text for the menu item
 * @property {React.ComponentType} [icon] - Optional icon component
 * @property {MenuItem[]} [children] - Optional nested menu items
 * @property {boolean} [divider] - Show divider after this item
 * @property {boolean} [disabled] - Disable the menu item
 * @property {boolean} [danger] - Show as danger/destructive action
 */

/**
 * @typedef {MenuItem} MenuConfig
 * @property {string} [path] - Route path for the menu item
 * @property {React.ReactNode} [component] - Component to render
 * @property {string[]} [permissions] - Required permissions
 */

// ============================================
// User & Role Types
// ============================================

/**
 * @typedef {'admin' | 'manager' | 'user' | 'guest'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} name - User's display name
 * @property {string} email - User's email address
 * @property {UserRole} role - User's role
 * @property {string} [avatar] - URL to user's avatar image
 * @property {string[]} [permissions] - Additional permissions
 */

// ============================================
// Permission Types
// ============================================

/**
 * @typedef {Object.<string, UserRole[]>} PermissionConfig
 * Maps menu keys to allowed user roles
 */

/**
 * @typedef {Object} Permission
 * @property {string} key - Permission identifier
 * @property {string} label - Display label
 * @property {string} [description] - Permission description
 * @property {UserRole[]} roles - Roles that have this permission
 */

// ============================================
// Route Types
// ============================================

/**
 * @typedef {Object.<string, string>} RouteConfig
 * Maps menu keys to route paths
 */

/**
 * @typedef {Object} Route
 * @property {string} path - URL path
 * @property {string} key - Menu key
 * @property {React.ReactNode} [component] - Component to render
 * @property {UserRole[]} [permissions] - Required permissions
 * @property {boolean} [exact] - Exact path matching
 */

// ============================================
// Breadcrumb Types
// ============================================

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} title - Breadcrumb text
 * @property {string} key - Unique key
 * @property {string} [href] - Optional link
 * @property {React.ReactNode} [icon] - Optional icon
 */

// ============================================
// Menu Hook Types
// ============================================

/**
 * @typedef {Object} UseMenuOptions
 * @property {string} [defaultSelectedKey] - Default selected menu key
 * @property {boolean} [persistState] - Save state to localStorage
 */

/**
 * @typedef {Object} UseMenuReturn
 * @property {string[]} selectedKeys - Currently selected menu keys
 * @property {string[]} openKeys - Currently open submenu keys
 * @property {function(string[]): void} setSelectedKeys - Update selected keys
 * @property {function(string[]): void} setOpenKeys - Update open keys
 * @property {function({key: string}): void} handleMenuClick - Menu click handler
 * @property {function(string[]): void} handleOpenChange - Submenu open handler
 */

// ============================================
// Component Prop Types
// ============================================

/**
 * @typedef {Object} AdminMainProps
 * @property {UserRole} [userRole] - Current user's role
 * @property {User} [userData] - Current user data
 * @property {boolean} [defaultCollapsed] - Start with collapsed sidebar
 * @property {React.ReactNode} [children] - Child components
 */

/**
 * @typedef {Object} SiderProps
 * @property {boolean} collapsed - Is sidebar collapsed
 * @property {function(boolean): void} onCollapse - Collapse handler
 * @property {MenuItem[]} menuItems - Menu items to display
 * @property {string[]} selectedKeys - Selected menu keys
 * @property {string[]} openKeys - Open submenu keys
 * @property {function({key: string}): void} onMenuClick - Menu click handler
 * @property {function(string[]): void} onOpenChange - Open change handler
 */

/**
 * @typedef {Object} HeaderProps
 * @property {boolean} collapsed - Is sidebar collapsed
 * @property {function(): void} onToggle - Toggle sidebar handler
 * @property {User} [userData] - Current user data
 * @property {function({key: string}): void} onUserMenuClick - User menu handler
 */

// ============================================
// Utility Function Types
// ============================================

/**
 * Menu item builder function
 * @callback MenuItemBuilder
 * @param {string} label - Menu label
 * @param {string} key - Menu key
 * @param {React.ComponentType} [icon] - Icon component
 * @param {MenuItem[]} [children] - Child items
 * @param {Object} [extra] - Additional properties
 * @returns {MenuItem}
 */

/**
 * Menu builder function
 * @callback MenuBuilder
 * @param {MenuConfig[]} menuConfig - Menu configuration
 * @param {UserRole} [userRole] - User role for filtering
 * @returns {MenuItem[]}
 */

/**
 * Permission checker function
 * @callback PermissionChecker
 * @param {string} menuKey - Menu key to check
 * @param {UserRole} userRole - User's role
 * @returns {boolean}
 */

/**
 * Breadcrumb builder function
 * @callback BreadcrumbBuilder
 * @param {string} currentKey - Current menu key
 * @param {MenuConfig[]} [menuConfig] - Menu configuration
 * @returns {BreadcrumbItem[]}
 */

/**
 * Route getter function
 * @callback RouteGetter
 * @param {string} key - Menu key
 * @returns {string}
 */

/**
 * Label getter function
 * @callback LabelGetter
 * @param {string} key - Menu key
 * @returns {string}
 */

// ============================================
// State Types
// ============================================

/**
 * @typedef {Object} MenuState
 * @property {string[]} selectedKeys - Selected menu keys
 * @property {string[]} openKeys - Open submenu keys
 */

/**
 * @typedef {Object} AppState
 * @property {User|null} user - Current user
 * @property {boolean} isAuthenticated - Authentication status
 * @property {MenuState} menuState - Menu state
 * @property {'light'|'dark'} theme - UI theme
 */

// ============================================
// Configuration Types
// ============================================

/**
 * @typedef {Object} AppConfig
 * @property {string} apiUrl - API base URL
 * @property {string} authEndpoint - Authentication endpoint
 * @property {MenuConfig[]} menuConfig - Menu configuration
 * @property {RouteConfig} routeConfig - Route configuration
 * @property {PermissionConfig} permissionConfig - Permission configuration
 */

// ============================================
// Event Types
// ============================================

/**
 * @typedef {Object} MenuClickEvent
 * @property {string} key - Clicked menu key
 * @property {string[]} keyPath - Path of keys from root to clicked item
 * @property {*} item - Menu item object
 * @property {Event} domEvent - DOM event
 */

/**
 * @typedef {Object} MenuOpenChangeEvent
 * @property {string[]} keys - Currently open submenu keys
 */

// Export empty object to make this a module
export {};
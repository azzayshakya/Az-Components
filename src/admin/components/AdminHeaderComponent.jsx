import {Avatar, Dropdown, Layout, Space, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,

} from '@ant-design/icons';
const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeaderComponent({ colorBgContainer,setCollapsed,collapsed, userMenuItems,userData,handleUserMenuClick}) {
  return (
    <div><Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '18px',
              cursor: 'pointer',
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* User Menu */}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              {!collapsed && (
                <Text strong>{userData?.name || 'Admin User'}</Text>
              )}
            </Space>
          </Dropdown>
        </Header></div>
  )
}

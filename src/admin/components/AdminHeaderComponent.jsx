import {Avatar, Dropdown, Layout, Space, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';
const { Header } = Layout;

export default function AdminHeaderComponent({ colorBgContainer,setCollapsed,collapsed,userData}) {
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

         
        </Header></div>
  )
}

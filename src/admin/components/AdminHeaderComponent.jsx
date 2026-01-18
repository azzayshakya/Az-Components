import { Breadcrumb, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default function AdminHeaderComponent({
  colorBgContainer,
  setCollapsed,
  collapsed,
  breadcrumbItems,
}) {
  return (
    <div>
      <Header
        style={{
          padding: '0 24px',
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          borderBottom: '2px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {breadcrumbItems.length > 0 && (
            <Breadcrumb items={breadcrumbItems} style={{ margin: 0 }} />
          )}
        </div>
      </Header>
    </div>
  );
}

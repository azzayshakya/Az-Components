import { Breadcrumb, Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;
export default function AdminContentComponent({
  breadcrumbItems,
  colorBgContainer,
  borderRadiusLG,
  userRole,
  selectedKeys,
}) {
  return (
    <div>
      {' '}
      <Content style={{ margin: '24px 16px 0' }}>
        {/* Breadcrumb */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumb style={{ margin: '0 0 16px 0' }} items={breadcrumbItems} />
        )}

        {/* Main Content Area */}
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Typography.Title level={2}>
            {breadcrumbItems[breadcrumbItems.length - 1]?.title || 'Welcome'}
          </Typography.Title>
          <Typography.Paragraph>
            This is a profession l, industry-standard admin layout with dynamic menu generation,
            permission-based access control, and state persistence.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Current User Role: <Text strong>{userRole}</Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Selected Menu: <Text code>{selectedKeys[0]}</Text>
          </Typography.Paragraph>
        </div>
      </Content>
    </div>
  );
}

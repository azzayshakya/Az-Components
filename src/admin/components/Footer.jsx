import { Typography, Space } from "antd";

const { Text } = Typography;

export default function AdminFooterComponent({ colorBgContainer }) {
  return (
    <footer
      style={{
        width: "100%",
        background: colorBgContainer,
        borderTop: "1px solid #f0f0f0",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <Text type="secondary">
        © {new Date().getFullYear()} <strong>Elmech India Engineers</strong>
      </Text>

      <Space size="small">
        <Text type="secondary">Elmech Admin Panel</Text>
        <Text type="secondary">•</Text>
        <Text type="secondary">v1.6</Text>
      </Space>
    </footer>
  );
}

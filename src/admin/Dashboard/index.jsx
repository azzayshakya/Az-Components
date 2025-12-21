import { Card, Col, Row, Typography, Statistic, Avatar } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  BuildOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Dashboard() {
  const userInfo = {
    name: "Ajay Shakya",
    designation: "Admin / Software Developer",
    employeeId: "EMP-001",
  };

  const stats = [
    {
      title: "Total Queries",
      value: 128,
      icon: <QuestionCircleOutlined />,
      color: "#1677ff",
    },
    {
      title: "Total Comments",
      value: 342,
      icon: <MessageOutlined />,
      color: "#52c41a",
    },
    {
      title: "Today's Visitors",
      value: 89,
      icon: <EyeOutlined />,
      color: "#722ed1",
    },
    {
      title: "Active Employees",
      value: 46,
      icon: <TeamOutlined />,
      color: "#faad14",
    },
    {
      title: "Pending Approvals",
      value: 7,
      icon: <ClockCircleOutlined />,
      color: "#f5222d",
    },
    {
      title: "Ongoing Projects",
      value: 12,
      icon: <BuildOutlined />,
      color: "#13c2c2",
    },
  ];

  return (
    <div style={{ padding: 24  ,minHeight:"85vh"}}>
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          background: "linear-gradient(135deg, #1677ff, #69b1ff)",
          color: "#fff",
          
        }}
      >
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col>
            <Title level={4} style={{ color: "#fff", marginBottom: 4 }}>
              Welcome back, {userInfo.name} 👋
            </Title>
            <Text style={{ color: "#e6f4ff" }}>
              {userInfo.designation}
            </Text>
            <br />
            <Text style={{ color: "#e6f4ff" }}>
              Employee ID: <strong>{userInfo.employeeId}</strong>
            </Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    valueStyle={{ fontWeight: 600 }}
                  />
                </Col>
                <Col>
                  <Avatar
                    size={48}
                    style={{
                      backgroundColor: item.color,
                    }}
                    icon={item.icon}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

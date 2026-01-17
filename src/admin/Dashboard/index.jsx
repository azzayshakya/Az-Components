import { Card, Col, Row, Typography, Avatar, Progress, Badge, Space, Tag, Button } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  BuildOutlined,

  CheckCircleOutlined,
  SyncOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./Dashboard.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userInfo = {
    name: "Ajay Shakya",
    designation: "Admin / Software Developer",
    employeeId: "EMP-001",
    lastLogin: "Today, 9:42 AM",
    tasksCompleted: 24,
    totalTasks: 31,
  };

  const stats = [
    {
      title: "Total Queries",
      value: 128,
      icon: <QuestionCircleOutlined />,
      color: "#1677ff",
      trend: "+12.5%",
      trendUp: true,
      suffix: "",
      subtitle: "vs last month",
    },
    {
      title: "Total Comments",
      value: 342,
      icon: <MessageOutlined />,
      color: "#52c41a",
      trend: "+8.3%",
      trendUp: true,
      suffix: "",
      subtitle: "Active discussions",
    },
    {
      title: "Today's Visitors",
      value: 89,
      icon: <EyeOutlined />,
      color: "#722ed1",
      trend: "-3.2%",
      trendUp: false,
      suffix: "",
      subtitle: "Unique views",
    },
    {
      title: "Active Employees",
      value: 46,
      icon: <TeamOutlined />,
      color: "#faad14",
      trend: "+2",
      trendUp: true,
      suffix: "/ 52",
      subtitle: "Currently online",
    },
    {
      title: "Pending Approvals",
      value: 7,
      icon: <ClockCircleOutlined />,
      color: "#f5222d",
      trend: "-4",
      trendUp: true,
      suffix: "",
      subtitle: "Needs attention",
    },
    {
      title: "Ongoing Projects",
      value: 12,
      icon: <BuildOutlined />,
      color: "#13c2c2",
      trend: "+3",
      trendUp: true,
      suffix: "",
      subtitle: "In progress",
    },
  ];

  const quickActions = [
    { title: "Add Employee", icon: <TeamOutlined />, color: "#1677ff" },
    { title: "Process Salary", icon: <ThunderboltOutlined />, color: "#52c41a" },
    { title: "View Reports", icon: <TrophyOutlined />, color: "#722ed1" },
    { title: "Pending Tasks", icon: <ClockCircleOutlined />, color: "#faad14" },
  ];

  const recentActivities = [
    { action: "New employee added", time: "5 min ago", type: "success" },
    { action: "Salary processed", time: "1 hour ago", type: "processing" },
    { action: "Leave approved", time: "2 hours ago", type: "success" },
    { action: "Report generated", time: "3 hours ago", type: "default" },
  ];

  const completionPercentage = Math.round((userInfo.tasksCompleted / userInfo.totalTasks) * 100);

  return (
    <div className="dashboard-container" style={{ padding: 24, minHeight: "85vh" }}>
      {/* Welcome Card with Enhanced Design */}
      <Card
        className={`welcome-card ${mounted ? "" : ""}`}
        style={{
          marginBottom: 24,
          borderRadius: 16,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.25)",
          overflow: "hidden",
          position: "relative",
        }}
      >
         {/* Decorative Background Elements  */}
        <div className="welcome-card-decoration" />
        
        <Row align="middle" justify="space-between" style={{ position: "relative", zIndex: 1 }}>
          <Col>
            <Row align="middle" gutter={20}>
              <Col>
                <Badge count={<CheckCircleOutlined style={{ color: "#52c41a", fontSize: 20 }} />}>
                  <Avatar 
                    size={80} 
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: "#fff",
                      color: "#667eea",
                      border: "4px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                </Badge>
              </Col>
              <Col>
                <Title level={3} style={{ color: "#fff", marginBottom: 4, fontWeight: 700 }}>
                  Welcome back, {userInfo.name}! 👋
                </Title>
                <Space direction="vertical" size={2}>
                  <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 15 }}>
                    {userInfo.designation}
                  </Text>
                  <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 13 }}>
                    ID: <strong>{userInfo.employeeId}</strong> • Last login: {userInfo.lastLogin}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 12,
                minWidth: 200,
              }}
            >
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                <Row justify="space-between">
                  <Text style={{ color: "#fff", fontWeight: 600 }}>Task Progress</Text>
                  <Text style={{ color: "#fff", fontWeight: 700 }}>{completionPercentage}%</Text>
                </Row>
                <Progress
                  percent={completionPercentage}
                  strokeColor={{
                    '0%': '#52c41a',
                    '100%': '#95de64',
                  }}
                  trailColor="rgba(255, 255, 255, 0.2)"
                  showInfo={false}
                  strokeWidth={12}
                  style={{ marginBottom: 0 }}
                />
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 12 }}>
                  {userInfo.tasksCompleted} of {userInfo.totalTasks} tasks completed
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Stats Cards with Enhanced Design */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              className={`stat-card ${mounted ? "slide-up" : ""}`}
              hoverable
              style={{
                borderRadius: 12,
                border: "1px solid #f0f0f0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col flex="1">
                  <Space direction="vertical" size={4} style={{ width: "100%" }}>
                    <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
                      {item.title}
                    </Text>
                    <Space align="center" size={8}>
                      <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
                        {item.value}
                        {item.suffix && (
                          <Text type="secondary" style={{ fontSize: 16, fontWeight: 400 }}>
                            {item.suffix}
                          </Text>
                        )}
                      </Title>
                    </Space>
                    <Space size={4}>
                      <Tag
                        color={item.trendUp ? "success" : "error"}
                        icon={item.trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        style={{ margin: 0, fontSize: 12 }}
                      >
                        {item.trend}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.subtitle}
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col>
                  <div
                    className="stat-icon-wrapper"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ fontSize: 28, color: item.color }}>
                      {item.icon}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions & Recent Activity Section */}
      <Row gutter={[16, 16]}>
        {/* Quick Actions */}
        <Col xs={24} lg={12}>
          <Card
            className={`quick-actions-card ${mounted ? "fade-in" : ""}`}
            title={
              <Space>
                <FireOutlined style={{ color: "#f5222d" }} />
                <Text strong>Quick Actions</Text>
              </Space>
            }
            style={{
              borderRadius: 12,
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
          >
            <Row gutter={[12, 12]}>
              {quickActions.map((action, index) => (
                <Col xs={12} key={index}>
                  <Button
                    className="quick-action-btn"
                    size="large"
                    block
                    style={{
                      height: 110,
                      borderRadius: 10,
                      border: `1px solid ${action.color}20`,
                      background: `${action.color}08`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ fontSize: 24, color: action.color }}>
                      {action.icon}
                    </div>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
                      {action.title}
                    </Text>
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={12}>
          <Card
            className={`activity-card ${mounted ? "fade-in" : ""}`}
            title={
              <Space>
                <SyncOutlined spin style={{ color: "#1677ff" }} />
                <Text strong>Recent Activity</Text>
              </Space>
            }
            style={{
              borderRadius: 12,
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="activity-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: index < recentActivities.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <Space>
                    <Badge status={activity.type} />
                    <Text style={{ fontSize: 14 }}>{activity.action}</Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {activity.time}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
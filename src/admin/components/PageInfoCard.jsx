import { Row, Col, Typography, Space } from 'antd';
import { InfoCircleOutlined, ProjectOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';

const { Title, Text } = Typography;

export default function PageInfoCard({
  title = 'Page Information',
  icon = <ProjectOutlined />,
  description,
  points = [],
}) {
  return (
    <ModeCard
      title={title}
      styles={{
        header: {
          //   background:"red"
          background: 'linear-gradient(135deg, #3e56ddff 0%, #86d0f3ff 100%)',
        },
        body: {
          // padding:"0px" //optional
        },
      }}
    >
      <div
        style={{
          borderRadius: 12,
          padding: '24px',
          background: 'linear-gradient(135deg, #f0f5ff 0%, #ffffff 60%)',
          animation: 'fadeSlideIn 0.6s ease',
        }}
      >
        <Row
          gutter={[24, 16]}
          align="middle"
          style={{
            display: 'flex',
            flexDirection: '',
            justifyContent: 'space-between',
          }}
        >
          {/* Icon Section */}
          <Col xs={24} md={4} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1677ff, #69b1ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
                margin: '0 auto',
                boxShadow: '0 8px 20px rgba(22, 119, 255, 0.3)',
              }}
            >
              {icon}
            </div>
          </Col>

          {/* Content Section */}
          <Col xs={24} md={20}>
            <Title level={4} style={{ marginBottom: 8 }}>
              {description}
            </Title>

            <Space direction="vertical" size={6}>
              {points.map((item, index) => (
                <Text key={index} type="secondary">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  {item}
                </Text>
              ))}
            </Space>
          </Col>
        </Row>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </ModeCard>
  );
}

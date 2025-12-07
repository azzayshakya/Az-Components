import { Button, Col, Form, Input, Row } from "antd";
import ModeCard from "../components/ModeCard";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <ModeCard
        title={"Student Form"}
        extra={<Button type="primary">Close</Button>}
        styles={{
          header: {
            background: "red",
            color: "white",
            fontWeight: "bold",
          },
          body: {
            padding: "20px",
          },
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form  labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="Name" name="name">
                    <Input placeholder="Enter name" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ModeCard>

      <br />

      <ModeCard title="Empty Card" />
    </div>
  );
}

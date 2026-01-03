import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";

export default function AddProject() {
  return (
    <ModeCard title="Add Project" extra={<Button type="primary">Submit</Button>}>
      <Form layout="horizontal" labelCol={{ sm: 8 }} wrapperCol={{ sm: 16 }}>
        <ModeFieldSet title="Project Information">
          <Row gutter={[24, 16]}>
            <Col md={12}>
              <Form.Item label="Project Name" name="projectName">
                <Input placeholder="Enter project name" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Project Code" name="projectCode">
                <Input placeholder="PRJ-XXXX" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Client Name" name="clientName">
                <Input placeholder="Enter client name" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Department" name="department">
                <Select placeholder="Select department">
                  <Select.Option value="civil">Civil</Select.Option>
                  <Select.Option value="electrical">Electrical</Select.Option>
                  <Select.Option value="fire">Fire Fighting</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col md={24}>
              <Form.Item label="Project Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>
      </Form>
    </ModeCard>
  );
}

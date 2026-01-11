import { Button, Col, Form, Input, Row, Select, DatePicker, InputNumber } from "antd";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import {
  ALL_EMPLOYEE_ENUM,
  PROJECT_SERVICES_ENUM,
  PROJECT_STATUS_ENUM,
} from "../../constants/enum";

export default function AddProject() {
  const [form] = Form.useForm();

  const handleEmployeeSelect = (fieldName, empName) => {
    const emp = ALL_EMPLOYEE_ENUM.find((e) => e.value === empName);
    if (emp) {
      form.setFieldsValue({
        [`${fieldName}EmpId`]: emp.empId,
      });
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      services: values.services || [],
    };
console.log(payload)
    // await apiService.addProject(payload);
    form.resetFields();
  };

  return (
    <ModeCard title="Add Project" extra={
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        }>
      <Form
        form={form}
        layout="horizontal" 
        labelCol={{ sm: 8 }}
        wrapperCol={{ sm: 16 }}
        onFinish={handleSubmit}
      >
        <ModeFieldSet title="Project Information"  >
          <Row gutter={[24, 16]}>
            <Col md={12}>
              <Form.Item label="Project Name" name="projectName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Client Name" name="clientName">
                <Input />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Client Contact" name="clientNumber">
                <Input />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Services" name="services">
                <Select mode="multiple" options={PROJECT_SERVICES_ENUM} />
              </Form.Item>
            </Col>

            {/* Project Lead */}
            <Col md={12}>
              <Form.Item label="Project Lead" name="projectLeadName">
                <Select
                  options={ALL_EMPLOYEE_ENUM}
                  onChange={(val) => handleEmployeeSelect("projectLead", val)}
                />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Lead Emp ID" name="projectLeadEmpId">
                <Input disabled />
              </Form.Item>
            </Col>

            {/* Co-Lead */}
            <Col md={12}>
              <Form.Item label="Project Co-Lead" name="projectCoLeadName">
                <Select
                  options={ALL_EMPLOYEE_ENUM}
                  onChange={(val) => handleEmployeeSelect("projectCoLead", val)}
                />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Co-Lead Emp ID" name="projectCoLeadEmpId">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Budget" name="budget">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Status" name="status">
                <Select options={PROJECT_STATUS_ENUM} />
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
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
            </Col>

            <Col md={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

        
        </ModeFieldSet>
      </Form>
    </ModeCard>
  );
}

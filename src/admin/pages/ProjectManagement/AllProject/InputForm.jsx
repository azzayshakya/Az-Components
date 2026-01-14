import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import { useEffect } from "react";

const PROJECT_STATUS = [
  { label: "Planned", value: "planned" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
];

export default function ProjectInputForm({
  type,
  initialData,
  setShowInputForm,
  setType,
}) {
  const [form] = Form.useForm();

  const isView = type === "VIEW";
  const isEdit = type === "EDIT";

  useEffect(() => {
    if ((isView || isEdit) && initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [type, initialData]);

  return (
    <ModeCard
      title={`${isView ? "View" : isEdit ? "Edit" : "Add"} Project`}
      extra={
        isView ? (
          <Button onClick={() => setShowInputForm(false)}>Close</Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              form.submit();
              setShowInputForm(false);
              setType("");
            }}
          >
            Submit
          </Button>
        )
      }
    >
      <Form
        form={form}
        layout="horizontal"
        size="large"
        disabled={isView}
        labelCol={{ xs: 24, sm: 8 }}
        wrapperCol={{ xs: 24, sm: 16 }}
      >
        <ModeFieldSet title="Project Information">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Project ID" name="projectId">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: "Project name is required" }]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Project Lead Name"
                name="projectLeadName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter project lead name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Project Lead Emp ID"
                name="projectLeadEmpId"
                rules={[{ required: true }]}
              >
                <Input placeholder="EMP-XXXX" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Project Status"
                name="projectStatus"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select status" options={PROJECT_STATUS} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Budget"
                name="budget"
                rules={[{ required: true }]}
              >
                <Input prefix="₹" placeholder="Enter project budget" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true }]}
              >
                {/* <DatePicker style={{ width: "100%" }} /> */}
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="End Date" name="endDate">
                {/* <DatePicker style={{ width: "100%" }} /> */}
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>
      </Form>
    </ModeCard>
  );
}

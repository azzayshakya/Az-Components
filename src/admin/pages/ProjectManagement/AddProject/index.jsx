import { Button, Col, Form, Input, Row, Select, DatePicker, InputNumber } from 'antd';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import {
  ALL_EMPLOYEE_ENUM,
  PROJECT_SERVICES_ENUM,
  PROJECT_STATUS_ENUM,
} from '../../constants/enum';
import PageInfoCard from '@/admin/components/PageInfoCard';
import { ProjectOutlined } from '@ant-design/icons';
import apiService from '@/admin/advanceApi/apiService';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function AddProject() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmployeeSelect = (fieldName, empName) => {
    const emp = ALL_EMPLOYEE_ENUM.find((e) => e.value === empName);
    if (emp) {
      form.setFieldsValue({
        [`${fieldName}EmpId`]: emp.empId,
      });
    }
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) return;

    const payload = {
      projectName: values.projectName,
      clientName: values.clientName,
      clientNumber: values.clientNumber,
      services: values.services || [],

      projectLeadName: values.projectLeadName,
      projectLeadEmpId: values.projectLeadEmpId,

      projectCoLeadName: values.projectCoLeadName,
      projectCoLeadEmpId: values.projectCoLeadEmpId,

      budget: values.budget || 0,
      status: values.status,

      startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : null,
      endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : null,

      address: values.address,
      description: values.description,
    };

    console.log('FINAL PAYLOAD:', payload);

    const toastId = toast.loading('Creating project...');

    try {
      await apiService.addProject(payload);

      toast.success('Project created successfully', { id: toastId });
      form.resetFields();
    } catch (error) {
      console.error('API Error:', error);

      toast.error('Project creation failed ', { id: toastId });

      form.resetFields();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ModeCard
      title="Add Project"
      extra={
        <Button
          type="primary"
          onClick={() => form.submit()}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={{ color: 'white', background: '#1677ff' }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      }
    >
      <PageInfoCard
        title="About This Page"
        icon={<ProjectOutlined />}
        description="Create and manage a new project for Elmech India Engineers."
        points={[
          'Fill in basic project and client details.',
          'Assign project lead and co-lead for responsibility tracking.',
          'Select services, budget, and timeline accurately.',
          'Project status helps monitor progress efficiently.',
        ]}
      />
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ sm: 8 }}
        wrapperCol={{ sm: 16 }}
        onFinish={handleSubmit}
      >
        <ModeFieldSet title="Project Information">
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
                  onChange={(val) => handleEmployeeSelect('projectLead', val)}
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
                  onChange={(val) => handleEmployeeSelect('projectCoLead', val)}
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
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Status" name="status">
                <Select options={PROJECT_STATUS_ENUM} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="Address" name="address">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col md={12}>
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

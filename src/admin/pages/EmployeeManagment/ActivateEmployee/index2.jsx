import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import { Button, Col, Form, Input, Row, Select, DatePicker, Upload, message } from 'antd';

import {
  requiredRule,
  onlyLettersRule,
  onlyDigitsRule,
  fixedDigitsRule,
  noFutureDateRule,
  safeAddressRule,
  regexRule,
  digitsWithLengthValidator,
} from '@/admin/pages/constants/FormValidators';
import { addEmployee } from '@/admin/services/employeeService';
import { DEPARTMENT_ENUM, WORK_LOCATION_ENUM, WORK_STATUS_ENUM } from '../../constants/enum';

const toStringPayload = (values) => {
  const payload = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      payload[key] = '';
    } else if (value?.format) {
      payload[key] = value.format('YYYY-MM-DD');
    } else {
      payload[key] = String(value);
    }
  });

  return payload;
};

export default function AddEmployee() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = toStringPayload(values);

      await addEmployee(payload);

      message.success('Employee added successfully');
      form.resetFields();
    } catch (err) {
      if (typeof err === 'string') {
        message.error(err);
      }
    }
  };

  return (
    <div>
      <ModeCard
        title="Add Employee"
        extra={
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        }
      >
        <Form
          form={form}
          layout="horizontal"
          // size="large"
          labelCol={{ xs: 24, sm: 8 }}
          wrapperCol={{ xs: 24, sm: 16 }}
        >
          {/* ================= Personal Info ================= */}
          <ModeFieldSet title="Personal Information">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[requiredRule('First Name'), onlyLettersRule('First Name')]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Last Name" name="lastName" rules={[onlyLettersRule('Last Name')]}>
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Father's Name"
                  name="fatherName"
                  rules={[onlyLettersRule("Father's Name")]}
                >
                  <Input placeholder="Enter father's name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dob"
                  rules={[noFutureDateRule('Date of Birth')]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Gender" name="gender">
                  <Select placeholder="Select gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Mobile Number"
                  name="mobile"
                  rules={[digitsWithLengthValidator('Mobile Number', 10)]}
                >
                  <Input placeholder="Enter mobile number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Email Address" name="email">
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Aadhar Number"
                  name="aadharNumber"
                  rules={[digitsWithLengthValidator('Aadhar Number', 12)]}
                >
                  <Input placeholder="Enter Aadhar number" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Employment Details">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Employee ID" name="employeeId">
                  <Input placeholder="EMP-XXXX" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Joining Date"
                  name="joiningDate"
                  rules={[noFutureDateRule('Joining Date')]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Working Status" name="workingStatus">
                  <Select placeholder="Select status" options={WORK_STATUS_ENUM} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Working Date"
                  name="lastWorkingDate"
                  rules={[noFutureDateRule('Last Working Date')]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Department" name="department">
                  <Select placeholder="Select department" options={DEPARTMENT_ENUM} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Designation" name="designation">
                  <Select placeholder="Select job role" options={[]} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Work Location" name="workLocation">
                  <Select placeholder="Select work mode" options={WORK_LOCATION_ENUM} />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* ================= Address ================= */}
          <ModeFieldSet title="Address Information">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Temporary Address" name="tempAddress" rules={[safeAddressRule()]}>
                  <Input.TextArea rows={3} placeholder="Enter temporary address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Permanent Address"
                  name="permanentAddress"
                  rules={[safeAddressRule()]}
                >
                  <Input.TextArea rows={3} placeholder="Enter permanent address" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* ================= Bank & Salary ================= */}
          <ModeFieldSet title="Bank & Salary Details">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Bank Name" name="bankName">
                  <Input placeholder="Enter bank name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[onlyDigitsRule('Account Number')]}
                >
                  <Input placeholder="Enter account number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="IFSC Code" name="ifscCode">
                  <Input placeholder="Enter IFSC code" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Salary (Monthly)"
                  name="salary"
                  rules={[onlyDigitsRule('Salary')]}
                >
                  <Input prefix="₹" placeholder="Enter salary amount" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* ================= Emergency ================= */}
          <ModeFieldSet title="Emergency Contact">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact No"
                  name="emergencyContactNo"
                  rules={[digitsWithLengthValidator('Contact No', 10)]}
                >
                  <Input placeholder="Enter emergency contact number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Name"
                  name="emergencyContactName"
                  rules={[onlyLettersRule('Contact Name')]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Document Uploads">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Employee Photo" name="photo">
                  <Upload>
                    <Button>Upload Photo</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Aadhar Card" name="aadharDoc">
                  <Upload>
                    <Button>Upload Aadhar</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="PAN Card" name="panDoc">
                  <Upload>
                    <Button>Upload PAN</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Other Documents" name="otherDocs">
                  <Upload>
                    <Button>Upload Documents</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>
        </Form>
      </ModeCard>
    </div>
  );
}

import apiService from "@/admin/advanceApi/apiService";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Form, Input, Row, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyProfile() {
  const [form] = Form.useForm();
  const [profileData,setProfileData]=useState();
  const normalizeProfileData = (data) => ({
    ...data,
    dob: data.dob ? dayjs(data.dob) : null,
    joiningDate: data.joiningDate ? dayjs(data.joiningDate) : null,
    lastWorkingDate: data.lastWorkingDate
      ? dayjs(data.lastWorkingDate)
      : null,
  });

  const getUserProfileData = async () => {
    try {
      const response = await apiService.getProfile();
      const profile = response?.data;
      form.setFieldsValue(normalizeProfileData(profile));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile, using Dummy data");
      form.setFieldsValue(normalizeProfileData(dummyProfile));
    }
  };
  
  useEffect(() => {
    getUserProfileData();
  }, []);
  const dummyProfile = {
    firstName: "Ajay",
    lastName: "Shakya",
    fatherName: "Rajendra Shakya",
    dob: "1999-06-15",
    gender: "male",
    mobile: "9876543210",
    email: "ajay.shakya@elmechindia.com",
    aadharNumber: "1234-5678-9012",

    employeeId: "EMP-001",
    joiningDate: "2022-04-01",
    workingStatus: "working",
    lastWorkingDate: null,
    department: "electrical",
    designation: "senior-engineer",
    workLocation: "site",

    tempAddress: "Delhi, India",
    permanentAddress: "Jhansi, Uttar Pradesh",

    bankName: "State Bank of India",
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",
    salary: 65000,

    emergencyContact: "9123456789",
    emergencyDetails: "Father - Rajendra Shakya",
  };

  return (
    <ModeCard
      title="My Profile"
      // extra={<Button disabled type="primary">Edit</Button>}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ xs: 24, sm: 8 }}
        wrapperCol={{ xs: 24, sm: 16 }}
        // initialValues={{
        //   ...profileData,
        //   dob: dayjs(profileData.dob),
        //   joiningDate: dayjs(profileData.joiningDate),
        //   lastWorkingDate: profileData.lastWorkingDate
        //     ? dayjs(profileData.lastWorkingDate)
        //     : null,
        // }}
      >
        <ModeFieldSet title="Personal Information">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="First Name" name="firstName">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Father's Name" name="fatherName">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Date of Birth" name="dob">
                <DatePicker style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Gender" name="gender">
                <Select disabled>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Mobile Number" name="mobile">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Email Address" name="email">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Aadhar Number" name="aadharNumber">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>

        {/* ================= EMPLOYMENT DETAILS ================= */}
        <ModeFieldSet title="Employment Details">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Employee ID" name="employeeId">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Joining Date" name="joiningDate">
                <DatePicker style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Working Status" name="workingStatus">
                <Select disabled>
                  <Select.Option value="working">Currently Working</Select.Option>
                  <Select.Option value="resigned">Resigned</Select.Option>
                  <Select.Option value="terminated">Terminated</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Last Working Date" name="lastWorkingDate">
                <DatePicker style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Department" name="department">
                <Select disabled>
                  <Select.Option value="civil">Civil Engineering</Select.Option>
                  <Select.Option value="electrical">Electrical Engineering</Select.Option>
                  <Select.Option value="mechanical">Mechanical Engineering</Select.Option>
                  <Select.Option value="firefighting">Fire Fighting</Select.Option>
                  <Select.Option value="site">Site Engineer</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Designation" name="designation">
                <Select disabled>
                  <Select.Option value="junior-engineer">Junior Engineer</Select.Option>
                  <Select.Option value="senior-engineer">Senior Engineer</Select.Option>
                  <Select.Option value="site-supervisor">Site Supervisor</Select.Option>
                  <Select.Option value="project-manager">Project Manager</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Work Location" name="workLocation">
                <Select disabled>
                  <Select.Option value="wfo">Work From Office</Select.Option>
                  <Select.Option value="wfh">Work From Home</Select.Option>
                  <Select.Option value="site">Site Work</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>

        {/* ================= ADDRESS ================= */}
        <ModeFieldSet title="Address Information">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Temporary Address" name="tempAddress">
                <Input.TextArea rows={3} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Permanent Address" name="permanentAddress">
                <Input.TextArea rows={3} disabled />
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>

        {/* ================= BANK & SALARY ================= */}
        <ModeFieldSet title="Bank & Salary Details">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Bank Name" name="bankName">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Account Number" name="accountNumber">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="IFSC Code" name="ifscCode">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Salary (Monthly)" name="salary">
                <Input prefix="₹" disabled />
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>

        {/* ================= EMERGENCY ================= */}
        <ModeFieldSet title="Emergency Contact">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Emergency Contact No" name="emergencyContact">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Contact Person Details" name="emergencyDetails">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>

        {/* ================= DOCUMENTS ================= */}
        <ModeFieldSet title="Document Uploads">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Employee Photo">
                <Upload disabled>
                  <Button disabled>Uploaded</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Aadhar Card">
                <Upload disabled>
                  <Button disabled>Uploaded</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="PAN Card">
                <Upload disabled>
                  <Button disabled>Uploaded</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Other Documents">
                <Upload disabled>
                  <Button disabled>Uploaded</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </ModeFieldSet>
      </Form>
    </ModeCard>
  );
}

import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import ModeCard from "../components/ModeCard";
import CrudTable from "../components/CrudTable";
import { useState } from "react";
import { userMessagesData } from "../components/DummyData";
import ModeFieldSet from "../components/FieldSet";

export default function HomeWithAntdTableAndForm() {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: 0,
    name: "",
    designation: "",
    organization: "",
    email: "",
    phoneNo: "",
    remarks: "",
    sortOrder: "ASC",
  });

  const tableData = [
    {
      id: 1,
      name: "Ajay Shakya",
      email: "ajay@example.com",
      phone: "9876543210",
      designation: "Developer",
      organization: "Aventesia",
    },
    {
      id: 2,
      name: "Rohit Mehra",
      email: "rohit@example.com",
      phone: "9123456789",
      designation: "Manager",
      organization: "Google",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      sorter: true,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: 150,
      sorter: true,
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      width: 150,
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, row) => (
        <Button danger size="small" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const userMessageColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 350,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Student Form with FieldSet */}
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
        <Form layout="vertical">
          {/* Personal Information FieldSet */}
          <ModeFieldSet title="Personal Information" required>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName" required>
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName" required>
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of Birth" name="dob">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="gender">
                  <Select placeholder="Select gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* Contact Details FieldSet */}
          <ModeFieldSet title="Contact Details" className="" required>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email" name="email" required>
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone" name="phone" required>
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Address" name="address">
                  <Input.TextArea rows={2} placeholder="Enter complete address" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* Academic Information FieldSet */}
          <ModeFieldSet title="Academic Information" className="fieldset-info fieldset-bold" size="" borderColor="">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Designation" name="designation">
                  <Input placeholder="Enter designation" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Organization" name="organization">
                  <Input placeholder="Enter organization" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Remarks" name="remarks">
                  <Input.TextArea rows={3} placeholder="Enter any additional remarks" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          {/* Submit Button */}
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="default" style={{ marginRight: 8 }}>
                Reset
              </Button>
              <Button type="primary">Submit</Button>
            </Col>
          </Row>
        </Form>
      </ModeCard>

      <br />

      {/* User Messages Table with FieldSet */}
      <ModeFieldSet title="User Messages" className="fieldset-info fieldset-bold">
        <CrudTable
          tableData={userMessagesData}
          columns={userMessageColumns}
          paramObj={paramObj}
          setParamObj={setParamObj}
          setRefreshCounter={setRefreshCounter}
          enableSorting={true}
          showPagination={true}
        />
      </ModeFieldSet>

      <br />

      {/* Custom Styled Table with FieldSet */}
      <ModeCard title="Employee Management">
        <ModeFieldSet 
          title="Employee Records" 
          className="fieldset-success fieldset-elevated"
          size="large"
        >
          <CrudTable
            tableData={tableData}
            columns={columns}
            paramObj={paramObj}
            setParamObj={setParamObj}
            setRefreshCounter={setRefreshCounter}
            tableClassName="table-bordered table-striped"
            headerStyle={{
              background: "#52c41a",
              color: "#ffffff",
            }}
          />
        </ModeFieldSet>
      </ModeCard>

      <br />

      {/* Statistics Section with Multiple FieldSets */}
      <ModeCard title="Dashboard Statistics">
        <Row gutter={16}>
          <Col span={8}>
            <ModeFieldSet 
              title="Total Users" 
              size="small" 
              className="fieldset-primary"
            >
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <h2 style={{ margin: 0, fontSize: "32px", color: "#1890ff" }}>1,248</h2>
                <p style={{ margin: "8px 0 0", color: "#8c8c8c" }}>Active Users</p>
              </div>
            </ModeFieldSet>
          </Col>
          <Col span={8}>
            <ModeFieldSet 
              title="Messages" 
              size="small" 
              className="fieldset-success"
            >
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <h2 style={{ margin: 0, fontSize: "32px", color: "#52c41a" }}>3,456</h2>
                <p style={{ margin: "8px 0 0", color: "#8c8c8c" }}>Total Messages</p>
              </div>
            </ModeFieldSet>
          </Col>
          <Col span={8}>
            <ModeFieldSet 
              title="Organizations" 
              size="small" 
              className="fieldset-warning"
            >
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <h2 style={{ margin: 0, fontSize: "32px", color: "#faad14" }}>89</h2>
                <p style={{ margin: "8px 0 0", color: "#8c8c8c" }}>Registered Orgs</p>
              </div>
            </ModeFieldSet>
          </Col>
        </Row>
      </ModeCard>

      <br />

      {/* Nested FieldSets Example */}
      <ModeFieldSet title="Advanced Settings" size="large" className="">
        <ModeFieldSet title="Display Preferences" size="small">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Theme" name="theme">
                  <Select placeholder="Select theme">
                    <Select.Option value="light">Light</Select.Option>
                    <Select.Option value="dark">Dark</Select.Option>
                    <Select.Option value="auto">Auto</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Language" name="language">
                  <Select placeholder="Select language">
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="hi">Hindi</Select.Option>
                    <Select.Option value="es">Spanish</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModeFieldSet>

        <ModeFieldSet title="Notification Settings" size="small" className="fieldset-primary">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email Notifications" name="emailNotif">
                  <Select placeholder="Select frequency">
                    <Select.Option value="always">Always</Select.Option>
                    <Select.Option value="daily">Daily Digest</Select.Option>
                    <Select.Option value="never">Never</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="SMS Alerts" name="smsAlerts">
                  <Select placeholder="Select frequency">
                    <Select.Option value="urgent">Urgent Only</Select.Option>
                    <Select.Option value="all">All Messages</Select.Option>
                    <Select.Option value="never">Never</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModeFieldSet>
      </ModeFieldSet>

      <br />

      {/* Empty Card */}
      <ModeCard title="Empty Card" />

      {/* Refresh Counter */}
      <div style={{ marginTop: 20 }}>
        <b>Refresh Count:</b> {refreshCounter}
      </div>
    </div>
  );
}
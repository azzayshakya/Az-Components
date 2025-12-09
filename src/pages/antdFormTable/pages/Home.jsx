import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import ModeCard from "../components/ModeCard";
import CrudTable from "../components/CrudTable";
import { useState } from "react";
import ModeFieldSet from "../components/FieldSet";

export default function HomeWithAntdTableAndForm() {
  const [refreshCounter, setRefreshCounter] = useState(0);
console.log(refreshCounter)
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



  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  return (
    <div style={{ padding: "" }}>
      <ModeCard
        title={"Student Form"}
        extra={<Button type="primary">Close</Button>}
        styles={{
          header: {
         
          },
          body: {
          },
        }}
      >
        <Row gutter={[16, 16]}>
  <Col span={24}>
        
        <Form layout="horizontal" wrapperCol={{span:16}} labelCol={{span:8}}  >
          <ModeFieldSet title="Personal Information" >
           <Row gutter={24}>

          {/* First Name */}
          <Col span={12}>
            <Form.Item
              label="First Name"
              // name="firstName"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              // rules={[{ required: true, message: "First name is required" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>

          {/* Last Name */}
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              // rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>

          {/* Date of Birth */}
          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Gender */}
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select placeholder="Select gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>

        </Row>
          </ModeFieldSet>
        </Form>
         </Col>
          </Row>
      </ModeCard>
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
      </ModeCard>

    
    </div>
  );
}
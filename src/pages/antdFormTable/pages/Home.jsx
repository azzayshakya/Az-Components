import { Button, Col, Form, Input, Row } from "antd";
import ModeCard from "../components/ModeCard";
import CrudTable from "../components/CrudTable";
import { useState } from "react";

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

  // ⭐ ADDED SAMPLE TABLE DATA
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
    }
  ];

  // ⭐ ADDED COLUMNS
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Organization", dataIndex: "organization", key: "organization" },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Button danger size="small">
          Delete
        </Button>
      )
    }
  ];

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
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
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

      <CrudTable
        tableData={tableData}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
      />

      <br />

      <ModeCard title="Empty Card" />

      <div style={{ marginTop: 20 }}>
        <b>Refresh Count:</b> {refreshCounter}
      </div>
    </div>
  );
}

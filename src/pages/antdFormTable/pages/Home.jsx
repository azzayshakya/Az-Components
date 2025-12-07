import { Button, Col, Form, Input, Row } from "antd";
import ModeCard from "../components/ModeCard";
import CrudTable from "../components/CrudTable";
import { useState } from "react";
import { userMessagesData } from "../components/DummyData";

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
        tableData={userMessagesData}
        columns={userMessageColumns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
        enableSorting={true}
        showPagination={true}
      />

      <br />

      <ModeCard title="Custom Styled Table">
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

      <br />

      <ModeCard title="Empty Card" />

      <div style={{ marginTop: 20 }}>
        <b>Refresh Count:</b> {refreshCounter}
      </div>
    </div>
  );
}
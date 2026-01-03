import { Table, Tag, Input, Select, Row, Col, Button } from "antd";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { allUsersResponse } from "@/admin/constants/dummyResponse";
import DynamicAntdStatusTag from "../constants/DynamicAntdStatusTag";

const { Option } = Select;

export default function UserManagement() {
  const columns = [
    { title: "Employee ID", dataIndex: "employeeId" },
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    { title: "Department", dataIndex: "department" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => DynamicAntdStatusTag({
        status,
        size: "medium",
      }),
    },
  ];

  return (
    <ModeCard title="All Users">
      {/* Filters */}
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Input placeholder="Search by name" />
        </Col>
        <Col md={6}>
          <Select placeholder="Role" style={{ width: "100%" }}>
            <Option value="admin">Admin</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Col>
        <Col md={6}>
          <Select placeholder="Department" style={{ width: "100%" }}>
            <Option value="IT">IT</Option>
            <Option value="Civil">Civil</Option>
            <Option value="Electrical">Electrical</Option>
          </Select>
        </Col>
        <Col md={6}>
          <Button type="primary" block>
            Apply Filter
          </Button>
        </Col>
      </Row>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={allUsersResponse.data}
        rowKey="id"
        tableClassName="table-bordered table-striped"
      />
    </ModeCard>
  );
}

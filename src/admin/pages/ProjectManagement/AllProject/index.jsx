import { Table, Input, Select, Row, Col, Button } from "antd";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { allProjectsResponse } from "@/admin/constants/dummyResponse";
import DynamicAntdStatusTag from "../../constants/DynamicAntdStatusTag";

export default function AllProject() {
  const columns = [
    { title: "Project Code", dataIndex: "projectCode" },
    { title: "Project Name", dataIndex: "projectName" },
    { title: "Department", dataIndex: "department" },
    { title: "Client", dataIndex: "clientName" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>DynamicAntdStatusTag({
      status,
      size: "large",
    }),
    },
  ];

  return (
    <ModeCard title="All Projects">
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Input placeholder="Search project" />
        </Col>
        <Col md={6}>
          <Select placeholder="Department" style={{ width: "100%" }}>
            <Select.Option value="civil">Civil</Select.Option>
            <Select.Option value="electrical">Electrical</Select.Option>
          </Select>
        </Col>
        <Col md={6}>
          <Select placeholder="Status" style={{ width: "100%" }}>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
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
        dataSource={allProjectsResponse.data}
        rowKey="id"
      />
    </ModeCard>
  );
}

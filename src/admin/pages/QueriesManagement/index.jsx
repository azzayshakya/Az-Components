import { queryListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row, Select, Tag } from "antd";
import { useState } from "react";

export default function QueriesManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter);
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: queryListResponse.meta.total,
    status: "",
    priority: "",
    search: "",
  });

  const tableData = queryListResponse.data.filter((q) => {
    return (
      (!paramObj.status || q.status === paramObj.status) &&
      (!paramObj.priority || q.priority === paramObj.priority) &&
      (!paramObj.search ||
        q.userName.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        q.subject.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: "Query ID", dataIndex: "id", key: "id", width: 120 },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (val) => (
        <Tag
          color={val === "high" ? "red" : val === "medium" ? "orange" : "blue"}
        >
          {val.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <Tag color={val === "resolved" ? "green" : "gold"}>
          {val.toUpperCase()}
        </Tag>
      ),
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: () => <Button size="small">View</Button>,
    },
  ];

  return (
    <ModeCard title="All Queries">
      <ModeFieldSet title="Filters">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Status"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, status: val })}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="resolved">Resolved</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Priority"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, priority: val })}
            >
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search by user or subject"
              onChange={(e) =>
                setParamObj({ ...paramObj, search: e.target.value })
              }
            />
          </Col>

          <Col xs={24} md={4}>
            <Button
              type="primary"
              block
              onClick={() => setRefreshCounter((p) => p + 1)}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </ModeFieldSet>

      <CrudTable
        tableData={tableData}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
      />
    </ModeCard>
  );
}

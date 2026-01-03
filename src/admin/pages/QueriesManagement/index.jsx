import { queryListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row, Select, Space, Tag, Tooltip } from "antd";
import { useState } from "react";
import DynamicAntdStatusTag from "../constants/DynamicAntdStatusTag";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

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
      render: (status) => DynamicAntdStatusTag({
        status,
        size: "large",
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => DynamicAntdStatusTag({
        status,
        size: "large",
      }),
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      width: 120,
       render: (_, record) => (
        <>
          <Space size="small">
            <Tooltip title="View">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => {
                  // setShowInputForm(true);
                  // setInitialData(record);
                  // setType("VIEW")
                }}
                className="table-action-btn-view"
              />
            </Tooltip>

            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  // setShowInputForm(true);
                  // setInitialData(record);
                  // setType("EDIT")
                }}
                className="table-action-btn-edit"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                // onClick={() => setInitialData(record)}
                className="table-action-btn-delete"
              />
            </Tooltip>
          </Space>
        </>
      ),
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

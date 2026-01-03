import { commentListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row, Select, Rate, Tag, Space, Tooltip } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export default function CommentsManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter);
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: commentListResponse.meta.total,
    approved: "",
    search: "",
  });

  const tableData = commentListResponse.data.filter((c) => {
    return (
      (paramObj.approved === "" || c.isApproved === paramObj.approved) &&
      (!paramObj.search ||
        c.userName.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        c.comment.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: "User Name", dataIndex: "userName", key: "userName" },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      ellipsis: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (val) => <Rate disabled value={val} />,
    },
    {
      title: "Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Approved" : "Pending"}</Tag>
      ),
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      width: 150,
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
    <ModeCard title="All Comments">
      <ModeFieldSet title="Filters">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Approval Status"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, approved: val })}
            >
              <Select.Option value={true}>Approved</Select.Option>
              <Select.Option value={false}>Pending</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={10}>
            <Input
              allowClear
              placeholder="Search by user or comment"
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

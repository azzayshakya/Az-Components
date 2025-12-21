import { employeeListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

export default function AllEmployee() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter);
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: employeeListResponse.meta.total,
    department: "",
    workingStatus: "",
    search: "",
  });

  const tableData = employeeListResponse.data.filter((emp) => {
    return (
      (!paramObj.department || emp.department === paramObj.department) &&
      (!paramObj.workingStatus ||
        emp.workingStatus === paramObj.workingStatus) &&
      (!paramObj.search ||
        emp.name.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        emp.email.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: "Emp ID", dataIndex: "employeeId", key: "employeeId", width: 120 },
    { title: "Name", dataIndex: "name", key: "name", sorter: true },
    { title: "Email", dataIndex: "email", key: "email", width: 220 },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 150 },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Status", dataIndex: "workingStatus", key: "workingStatus" },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: () => (
        <Button danger size="small">
          Delete
        </Button>
      ),
    },
  ];

  return (
    <ModeCard title="All Employees">
      <ModeFieldSet title="Filters">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Department"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, department: val })}
            >
              <Select.Option value="Civil">Civil</Select.Option>
              <Select.Option value="Electrical">Electrical</Select.Option>
              <Select.Option value="Mechanical">Mechanical</Select.Option>
              <Select.Option value="Fire Fighting">Fire Fighting</Select.Option>
              <Select.Option value="IT">IT</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Working Status"
              style={{ width: "100%" }}
              onChange={(val) =>
                setParamObj({ ...paramObj, workingStatus: val })
              }
            >
              <Select.Option value="working">Working</Select.Option>
              <Select.Option value="resigned">Resigned</Select.Option>
              <Select.Option value="terminated">Terminated</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={8}>
            <Input
              placeholder="Search by name or email"
              allowClear
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
        tableClassName="table-bordered table-striped"
        headerStyle={{
          background: "#1677ff",
          color: "#ffffff",
        }}
      />
    </ModeCard>
  );
}

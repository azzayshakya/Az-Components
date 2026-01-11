import { salaryManagementResponse } from "@/admin/constants/dummyResponse";
import { Button, Col, Input, Row, Select, Typography } from "antd";
import { useState } from "react";

import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import SalaryHistoryPopover from "../constants";
import { DEPARTMENT_ENUM, DESIGNATION } from "../constants/enum";



const { Text } = Typography;

export default function SalaryManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
console.log(refreshCounter)
  // Local filter state (before apply)
  const [filters, setFilters] = useState({
    department: "",
    designation: "",
    search: "",
  });

  // Applied params (used by table / API)
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    department: "",
    designation: "",
    search: "",
  });

  // Filter data (mock)
  const tableData = salaryManagementResponse.data.filter((emp) => {
    return (
      (!paramObj.department || emp.department === paramObj.department) &&
      (!paramObj.designation || emp.designation === paramObj.designation) &&
      (!paramObj.search ||
        emp.name.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: "Emp ID", dataIndex: "employeeId", key: "employeeId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    {
      title: "Current Salary",
      dataIndex: "currentSalary",
      key: "currentSalary",
      render: (salary, row) => (
        <SalaryHistoryPopover history={row.salaryHistory}>
          <Text strong style={{ cursor: "pointer", color: "#1677ff" }}>
            ₹{salary.toLocaleString()}
          </Text>
        </SalaryHistoryPopover>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button size="small">Update</Button>,
    },
  ];

  return (
    <ModeCard title="Salary Management">
      {/* Filters */}
      <ModeFieldSet title="Filters">
        <Row gutter={[16, 16]}>
          {/* Department */}
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Department"
              style={{ width: "100%" }}
              value={filters.department || undefined}
              options={DEPARTMENT_ENUM}
              onChange={(val) =>
                setFilters((p) => ({ ...p, department: val }))
              }
            />
          </Col>

          {/* Designation */}
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Designation"
              style={{ width: "100%" }}
              value={filters.designation || undefined}
              options={DESIGNATION}
              onChange={(val) =>
                setFilters((p) => ({ ...p, designation: val }))
              }
            />
          </Col>

          {/* Search */}
          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search by name or emp id"
              value={filters.search}
              onChange={(e) =>
                setFilters((p) => ({ ...p, search: e.target.value }))
              }
            />
          </Col>

          {/* Apply */}
          <Col xs={24} md={2}>
            <Button
              type="primary"
              block
              onClick={() => {
                setParamObj((p) => ({
                  ...p,
                  ...filters,
                  offset: 0,
                }));
                setRefreshCounter((p) => p + 1);
              }}
            >
              Apply
            </Button>
          </Col>

          {/* Close / Reset */}
          <Col xs={24} md={2}>
            <Button
              block
              onClick={() => {
                setFilters({
                  department: "",
                  designation: "",
                  search: "",
                });

                setParamObj((p) => ({
                  ...p,
                  department: "",
                  designation: "",
                  search: "",
                  offset: 0,
                }));

                setRefreshCounter((p) => p + 1);
              }}
            >
              Close
            </Button>
          </Col>
        </Row>
      </ModeFieldSet>

      {/* Table */}
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

import { salaryManagementResponse } from "@/admin/constants/dummyResponse";
import { Button, Col, Input, Row, Select, Typography } from "antd";
import { useState } from "react";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import SalaryHistoryPopover from "../constants";

const { Text } = Typography;

export default function SalaryManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter);
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    // total: salaryManagementResponse.meta.total,
    department: "",
    designation: "",
    search: "",
  });

  const tableData = salaryManagementResponse.data.filter((emp) => {
    return (
      (!paramObj.department || emp.department === paramObj.department) &&
      (!paramObj.designation || emp.designation === paramObj.designation) &&
      (!paramObj.search ||
        emp.name.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });
  console.log("azz", tableData);

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
      <ModeFieldSet title="Filters">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Department"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, department: val })}
            >
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="Civil">Civil</Select.Option>
              <Select.Option value="Electrical">Electrical</Select.Option>
              <Select.Option value="Fire Fighting">Fire Fighting</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Designation"
              style={{ width: "100%" }}
              onChange={(val) => setParamObj({ ...paramObj, designation: val })}
            >
              <Select.Option value="Software Engineer">
                Software Engineer
              </Select.Option>
              <Select.Option value="Civil Engineer">
                Civil Engineer
              </Select.Option>
              <Select.Option value="Electrical Engineer">
                Electrical Engineer
              </Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search by name or emp id"
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

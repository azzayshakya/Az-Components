import { salaryManagementResponse } from "@/admin/constants/dummyResponse";
import { Button, Col, Input, Row, Select, Typography, message } from "antd";
import { useState } from "react";

import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import SalaryHistoryPopover from "../constants";
import { DEPARTMENT_ENUM, DESIGNATION_ENUM } from "../constants/enum";
import SalaryUpdateForm from "./form";

const { Text } = Typography;

export default function SalaryManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [filters, setFilters] = useState({
    department: "",
    designation: "",
    search: "",
  });

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
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

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setSelectedEmployee(null);
  };

  const handleFormSubmit = async (payload) => {
    try {
      // Call the API to update salary
      // const response = await updateEmployeeSalary(payload);
      
      // console.log("Salary update response:", response);
      
      message.success("Salary updated successfully!");
      
      setRefreshCounter((p) => p + 1);
    } catch (error) {
      console.error("Error updating salary:", error);
      message.error(error.message || "Failed to update salary. Please try again.");
    }
  };

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
      render: (_, record) => (
        <Button size="small" onClick={() => handleUpdateClick(record)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <ModeCard title="Salary Management">
      <ModeFieldSet title="Filters">
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} md={5}>
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

          <Col xs={24} sm={12} md={5}>
            <Select
              allowClear
              placeholder="Designation"
              style={{ width: "100%" }}
              value={filters.designation || undefined}
              options={DESIGNATION_ENUM}
              onChange={(val) =>
                setFilters((p) => ({ ...p, designation: val }))
              }
            />
          </Col>

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

          <Col xs={12} md={3}>
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

          <Col xs={12} md={3}>
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

      <CrudTable
        tableData={tableData}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
      />

      <SalaryUpdateForm
        visible={isFormVisible}
        employee={selectedEmployee}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </ModeCard>
  );
}
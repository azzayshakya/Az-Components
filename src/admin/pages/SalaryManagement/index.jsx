import { salaryManagementResponse } from "@/admin/constants/dummyResponse";
import { Button, Col, Input, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";

import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import SalaryHistoryPopover from "../constants";
import { DEPARTMENT_ENUM, DESIGNATION_ENUM } from "../constants/enum";
import SalaryUpdateForm from "./form";

import apiService from "@/admin/advanceApi/apiService";
import toast from "react-hot-toast";

const { Text } = Typography;

export default function SalaryManagement() {


  
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await apiService.deleteComment();
      setTableData(res.data);
      throw new Error("API not implemented");
    } catch (error) {
      console.warn("API failed, using dummy data");

      toast.error(
        error?.response?.data?.message ?? 
          error?.message 
         
      );
toast.success("using dummy data")
      const filtered = salaryManagementResponse.data.filter((emp) => {
        return (
          (!paramObj.department || emp.department === paramObj.department) &&
          (!paramObj.designation ||
            emp.designation === paramObj.designation) &&
          (!paramObj.search ||
            emp.name.toLowerCase().includes(paramObj.search.toLowerCase()) ||
            emp.employeeId
              .toLowerCase()
              .includes(paramObj.search.toLowerCase()))
        );
      });

      setTableData(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
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
      await apiService.updateUserRole(payload);
      toast.success("Salary updated successfully!");
      setRefreshCounter((p) => p + 1);
      handleFormClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to update salary"
      );
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
        <Button
          style={{ background: "#1677ff", color: "white" }}
          onClick={() => handleUpdateClick(record)}
        >
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
        loading={loading}
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

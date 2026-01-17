import { employeeListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import InputForm from "../component/InputForm";
import EmployeeActivationModal from "./EmployeeActivationModal";
import { DynamicStatusTag } from "../../constants/DynamicAntdStatusTag";

export default function UpdateEmployeeDetails() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [, setData] = useState([]);
  const [type, setType] = useState();

  const [initialData, setInitialData] = useState({});
  const [showInputForm, setShowInputForm] = useState(false);
  
  // Activation Modal State
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: employeeListResponse.meta.total,
    department: "",
    workingStatus: "",
    search: "",
  });

  const handleOpenActivationModal = (record) => {
    setSelectedUser(record);
    setShowActivationModal(true);
  };

  const handleCloseActivationModal = () => {
    setShowActivationModal(false);
    setSelectedUser(null);
  };

  const handleActivationSuccess = () => {
    setRefreshCounter((p) => p + 1);
  };

  const tableData = employeeListResponse.data.filter((emp) => {
    return (
      (!paramObj.department || emp.department === paramObj.department) &&
      (!paramObj.workingStatus ||
        emp.workingStatus === paramObj.workingStatus) &&
      (!paramObj.search ||
        emp.fullName.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        emp.email.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: "Emp ID", dataIndex: "employeeId", key: "employeeId", width: 120 },
    { title: "Name", dataIndex: "fullName", key: "fullName", sorter: true },
    { title: "Email", dataIndex: "email", key: "email", width: 220 },
    { title: "Phone", dataIndex: "mobile", key: "mobile", width: 150 },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Status", dataIndex: "workingStatus", key: "workingStatus",render:(status)=>(<DynamicStatusTag type={status}/>) },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 140,
      render: (_, record) => (
        <Button
          // type="primary"
          // size="small"
          
          icon={<CheckCircleOutlined />}
          onClick={() => handleOpenActivationModal(record)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            fontWeight: '500',
            color:"white",
          }}
        >
          Activate
        </Button>
      ),
    },
  ];

  useEffect(() => {
    setData(employeeListResponse.data);
  }, []);

  return (
    <>
      <ModeCard title="Employee Activation">
        <ModeFieldSet title="Filters">
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={18}>
              <Input
                placeholder="Search by name or email"
                allowClear
                value={paramObj.search}
                onChange={(e) =>
                  setParamObj((p) => ({ ...p, search: e.target.value }))
                }
              />
            </Col>

            <Col xs={12} md={3}>
              <Button
                type="primary"
                block
                onClick={() => setRefreshCounter((p) => p + 1)}
              >
                Apply
              </Button>
            </Col>

            <Col xs={12} md={3}>
              <Button
                block
                onClick={() => {
                  setParamObj({
                    ...paramObj,
                    department: "",
                    workingStatus: "",
                    search: "",
                  });
                  setRefreshCounter((p) => p + 1);
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </ModeFieldSet>

        {showInputForm ? (
          <InputForm
            type={type}
            initialData={initialData}
            setInitialData={setInitialData}
            setShowInputForm={setShowInputForm}
            setType={setType}
          />
        ) : (
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
        )}
      </ModeCard>

      {/* Employee Activation Modal */}
      <EmployeeActivationModal
        visible={showActivationModal}
        onClose={handleCloseActivationModal}
        userData={selectedUser}
        onSuccess={handleActivationSuccess}
      />
    </>
  );
}
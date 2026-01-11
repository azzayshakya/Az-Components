import { employeeListResponse } from "@/admin/constants/dummyResponse";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { DEPARTMENT_ENUM, WORK_STATUS } from "../../constants/enum";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import InputForm from "../component/InputForm";


export default function AllEmployee() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [, setData] = useState([]);
  const [type, setType] = useState()

  const [initialData, setInitialData] = useState({})
  const [showInputForm, setShowInputForm] = useState(false)
  console.log(refreshCounter);
  console.log("initial", initialData)
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: employeeListResponse.meta.total,
    department: "",
    workingStatus: "",
    search: "",
  });
  console.log("az intial data 1", initialData)
  console.log("az show form state", showInputForm)
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
    { title: "Status", dataIndex: "workingStatus", key: "workingStatus" },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <>
          <Space size="small">
            <Tooltip title="View">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => {
                  setShowInputForm(true);
                  setInitialData(record);
                  setType("VIEW")
                }}
                className="table-action-btn-view"
              />
            </Tooltip>

            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setShowInputForm(true);
                  setInitialData(record);
                  setType("EDIT")
                }}
                className="table-action-btn-edit"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => setInitialData(record)}
                className="table-action-btn-delete"
              />
            </Tooltip>
          </Space>
        </>
      ),
    }

  ];
  useEffect(() => {
    setData(employeeListResponse.data)
  }, [])
  return (

    <ModeCard title="All Employees">
      <ModeFieldSet
      title="Filters"
     
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={6}>
          <Select
            allowClear
            placeholder="Department"
            options={DEPARTMENT_ENUM}
            style={{ width: "100%" }}
            value={paramObj.department || undefined}
            onChange={(val) =>
              setParamObj((p) => ({ ...p, department: val }))
            }
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            allowClear
            placeholder="Working Status"
            style={{ width: "100%" }}
            options={WORK_STATUS}
            value={paramObj.workingStatus || undefined}
            onChange={(val) =>
              setParamObj((p) => ({ ...p, workingStatus: val }))
            }
          />
        </Col>

        <Col xs={24} md={6}>
          <Input
            placeholder="Search by name or email"
            allowClear
            value={paramObj.search}
            onChange={(e) =>
              setParamObj((p) => ({ ...p, search: e.target.value }))
            }
          />
        </Col>

        {/* Actions */}
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
  
      {showInputForm ? <>
        <InputForm type={type} initialData={initialData} setInitialData={setInitialData} setShowInputForm={setShowInputForm} setType={setType} />
      </> :
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
      }
    </ModeCard>
  );
}

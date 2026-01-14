import { Input, Select, Row, Col, Button, Space, Tooltip } from "antd";
import { useState } from "react";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import { allProjectsResponse } from "@/admin/constants/dummyResponse";
import DynamicAntdStatusTag from "../../constants/DynamicAntdStatusTag";
import { PROJECT_STATUS_ENUM, DEPARTMENT_ENUM } from "../../constants/enum";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
// import InputForm from "../component/InputForm";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import InputForm from "./InputForm";
export default function AllProject() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter)
   const [type, setType] = useState()
  const [initialData, setInitialData] = useState({})
  const [showInputForm, setShowInputForm] = useState(false)
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: allProjectsResponse.meta?.total || 0,
    search: "",
    department: "",
    status: "",
  });

  const handleClear = () => {
    setParamObj({
      ...paramObj,
      search: "",
      department: "",
      status: "",
    });
    setRefreshCounter((p) => p + 1);
  };

  const tableData = allProjectsResponse.data.filter((item) => {
    return (
      (!paramObj.search ||
        item.projectName
          .toLowerCase()
          .includes(paramObj.search.toLowerCase())) &&
      (!paramObj.department || item.department === paramObj.department) &&
      (!paramObj.status || item.status === paramObj.status)
    );
  });

  const columns = [
    { title: "Project Id", dataIndex: "projectId" ,align:"center" },
    { title: "Project Name", dataIndex: "projectName" ,align:"center"  },
    { title: "Project Lead Name", dataIndex: "projectLeadName" ,align:"center" },
    { title: "budget", dataIndex: "budget" ,align:"center" },

    { title: "startDate", dataIndex: "startDate" ,align:"center" },

    { title: "Client", dataIndex: "clientName",align:"center"  },
    {
      title: "Status",
      dataIndex: "projectStatus",
      render: (status) =>
        DynamicAntdStatusTag({
          status,
          size: "large",
        }),
    },
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

  return (
    <ModeCard title="All Projects">
      <ModeFieldSet title="Filters">
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} md={6}>
          <Input
            allowClear
            placeholder="Search project"
            value={paramObj.search}
            onChange={(e) =>
              setParamObj((p) => ({ ...p, search: e.target.value }))
            }
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            allowClear
            placeholder="Department"
            style={{ width: "100%" }}
            options={DEPARTMENT_ENUM}
            value={paramObj.department || undefined}
            onChange={(val) =>
              setParamObj((p) => ({ ...p, department: val }))
            }
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            allowClear
            placeholder="Status"
            style={{ width: "100%" }}
            options={PROJECT_STATUS_ENUM}
            value={paramObj.status || undefined}
            onChange={(val) =>
              setParamObj((p) => ({ ...p, status: val }))
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
          <Button block onClick={handleClear}>
            Clear
          </Button>
        </Col>
      </Row>
</ModeFieldSet>
      {/* Crud Table */}
       {showInputForm ? <>
              <InputForm type={type} initialData={initialData} setInitialData={setInitialData} setShowInputForm={setShowInputForm} setType={setType} />
            </> :
             <CrudTable
        tableData={tableData}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
      />
            }
      {/* <CrudTable
        tableData={tableData}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
      /> */}
    </ModeCard>
  );
}

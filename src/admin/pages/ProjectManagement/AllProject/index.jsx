import { Input, Select, Row, Col, Button, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import CrudTable from "@/pages/antdFormTable/components/CrudTable";
import { allProjectsResponse } from "@/admin/constants/dummyResponse";
import { PROJECT_STATUS_ENUM, DEPARTMENT_ENUM } from "../../constants/enum";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import InputForm from "./InputForm";
import { DynamicStatusTag } from "../../constants/DynamicAntdStatusTag";
import apiService from "@/admin/advanceApi/apiService";
import toast from "react-hot-toast";

export default function AllProject() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [type, setType] = useState();
  const [initialData, setInitialData] = useState({});
  const [showInputForm, setShowInputForm] = useState(false);

  const [projects, setProjects] = useState([]);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: 0,
    search: "",
    department: "",
    status: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiService.getAllProjects();
        setProjects(res.data?.data || []);
        setParamObj((p) => ({
          ...p,
          total: res.data?.meta?.total || 0,
        }));
      } catch (err) {
        toast.error("Failed to fetch projects");
        toast("Using dummy data");

        setProjects(allProjectsResponse.data);
        setParamObj((p) => ({
          ...p,
          total: allProjectsResponse.meta?.total || 0,
        }));
      }
    };

    fetchProjects();
  }, []);

  const handleApply = () => {
    setAppliedFilters(paramObj);
    setRefreshCounter((p) => p + 1);
  };

  const handleClear = () => {
    setParamObj({
      ...paramObj,
      search: "",
      department: "",
      status: "",
    });
    setAppliedFilters({});
    setRefreshCounter((p) => p + 1);
  };

  const tableData = projects.filter((item) => {
    return (
      (!appliedFilters.search ||
        item.projectName
          ?.toLowerCase()
          .includes(appliedFilters.search.toLowerCase())) &&
      (!appliedFilters.department ||
        item.department === appliedFilters.department) &&
      (!appliedFilters.status ||
        item.projectStatus === appliedFilters.status)
    );
  });

  const columns = [
    { title: "Project Id", dataIndex: "projectId", align: "center" },
    { title: "Project Name", dataIndex: "projectName", align: "center" },
    { title: "Project Lead Name", dataIndex: "projectLeadName", align: "center" },
    { title: "Budget", dataIndex: "budget", align: "center" },
    { title: "Start Date", dataIndex: "startDate", align: "center" },
    { title: "Client", dataIndex: "clientName", align: "center" },
    {
      title: "Status",
      dataIndex: "projectStatus",
      render: (status) => <DynamicStatusTag type={status} />,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setShowInputForm(true);
                setInitialData(record);
                setType("VIEW");
              }}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setShowInputForm(true);
                setInitialData(record);
                setType("EDIT");
              }}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ModeCard title="All Projects">
      <ModeFieldSet title="Filters">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={5}>
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

          <Col xs={24} sm={12} md={5}>
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

          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search project"
              value={paramObj.search}
              onChange={(e) =>
                setParamObj((p) => ({ ...p, search: e.target.value }))
              }
            />
          </Col>

          <Col xs={12} md={3}>
            <Button type="primary" block onClick={handleApply}>
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
        />
      )}
    </ModeCard>
  );
}

import { employeeListResponse } from '@/admin/constants/dummyResponse';
import CrudTable from '@/pages/antdFormTable/components/CrudTable';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import { Button, Col, Input, Select, Row } from 'antd';
import { useEffect, useState } from 'react';
import { DEPARTMENT_ENUM, WORK_STATUS_ENUM } from '../../constants/enum';
import InputForm from '../component/InputForm';
import RoleUpdateModal from './RoleUpdateModal';
import { DynamicStatusTag } from '../../constants/DynamicAntdStatusTag';
import toast from 'react-hot-toast';
import apiService from '@/admin/advanceApi/apiService';

export default function RoleManagement() {
  const [, setRefreshCounter] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [showInputForm, setShowInputForm] = useState(false);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: employeeListResponse.meta.total,
    department: '',
    workingStatus: '',
    search: '',
  });

  const [appliedFilters, setAppliedFilters] = useState(paramObj);

  const fetchEmployees = async () => {
    const toastId = toast.loading('Fetching employee details...');
    setLoading(true);
    try {
      const res = await apiService.activateEmployee();
      setEmployeeData(res.data);
      toast.success('Employees loaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to load Employee Data', { id: toastId });
      toast.success('Using Dummy Data');
      setEmployeeData(employeeListResponse.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenRoleModal = (record) => {
    setSelectedUser(record);
    setShowRoleModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  const handleRoleUpdateSuccess = () => {
    setRefreshCounter((p) => p + 1);
  };

  const tableData = employeeData.filter((emp) => {
    return (
      (!appliedFilters.department || emp.department === appliedFilters.department) &&
      (!appliedFilters.workingStatus || emp.workingStatus === appliedFilters.workingStatus) &&
      (!appliedFilters.search ||
        emp.fullName.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        emp.email.toLowerCase().includes(appliedFilters.search.toLowerCase()))
    );
  });

  const columns = [
    { title: 'Emp ID', dataIndex: 'employeeId', width: 120 },
    { title: 'Name', dataIndex: 'fullName', sorter: true },
    { title: 'Email', dataIndex: 'email', width: 220 },
    { title: 'Phone', dataIndex: 'mobile', width: 150 },
    { title: 'Department', dataIndex: 'department' },
    { title: 'Designation', dataIndex: 'designation' },
    {
      title: 'Current Role',
      dataIndex: 'role',
      render: (role) => <DynamicStatusTag type={role} size="large" />,
    },
    {
      title: 'Action',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Button
          style={{
            background: '#1677ff',
            color: 'white',
          }}
          onClick={() => handleOpenRoleModal(record)}
        >
          Update Role
        </Button>
      ),
    },
  ];

  return (
    <>
      <ModeCard title="Role Management">
        <ModeFieldSet title="Filters">
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={12} md={5}>
              <Select
                allowClear
                placeholder="Department"
                options={DEPARTMENT_ENUM}
                style={{ width: '100%' }}
                value={paramObj.department || undefined}
                onChange={(val) => setParamObj((p) => ({ ...p, department: val }))}
              />
            </Col>

            <Col xs={24} sm={12} md={5}>
              <Select
                allowClear
                placeholder="Working Status"
                options={WORK_STATUS_ENUM}
                style={{ width: '100%' }}
                value={paramObj.workingStatus || undefined}
                onChange={(val) => setParamObj((p) => ({ ...p, workingStatus: val }))}
              />
            </Col>

            <Col xs={24} md={8}>
              <Input
                allowClear
                placeholder="Search by name or email"
                value={paramObj.search}
                onChange={(e) => setParamObj((p) => ({ ...p, search: e.target.value }))}
              />
            </Col>

            <Col xs={12} md={3}>
              <Button
                type="primary"
                block
                onClick={() => {
                  setAppliedFilters(paramObj);
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
                  const cleared = {
                    ...paramObj,
                    department: '',
                    workingStatus: '',
                    search: '',
                  };
                  setParamObj(cleared);
                  setAppliedFilters(cleared);
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
            loading={loading}
            tableData={tableData}
            columns={columns}
            paramObj={paramObj}
            setParamObj={setParamObj}
            setRefreshCounter={setRefreshCounter}
          />
        )}
      </ModeCard>

      <RoleUpdateModal
        visible={showRoleModal}
        onClose={handleCloseRoleModal}
        userData={selectedUser}
        onSuccess={handleRoleUpdateSuccess}
      />
    </>
  );
}

import { Input, Select, Row, Col, Button } from 'antd';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import { allUsersResponse } from '@/admin/constants/dummyResponse';

import { useEffect, useState } from 'react';
import CrudTable from '@/pages/antdFormTable/components/CrudTable';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import { DEPARTMENT_ENUM, USER_ROLES_ENUM } from '../constants/enum';
import { DynamicStatusTag } from '../constants/DynamicAntdStatusTag';
import toast from 'react-hot-toast';
import apiService from '@/admin/advanceApi/apiService';

export default function UserManagement() {
  const [loading, setLoading] = useState(false);

  const [refreshCounter, setRefreshCounter] = useState(0);
  console.log(refreshCounter);
  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: allUsersResponse.meta.total,
    role: '',
    department: '',
    name: '',
  });

  const handleClear = () => {
    setParamObj({
      ...paramObj,
      role: '',
      department: '',
      name: '',
    });
    setRefreshCounter((p) => p + 1);
  };
  const tableData = allUsersResponse.data.filter((q) => {
    return (
      (!paramObj.department || q.department === paramObj.department) &&
      (!paramObj.role || q.role === paramObj.role) &&
      (!paramObj.search || q.name.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });
  const columns = [
    { title: 'Employee ID', dataIndex: 'employeeId', align: 'center' },
    { title: 'Name', dataIndex: 'name', align: 'center' },
    { title: 'Role', dataIndex: 'role', align: 'center' },
    { title: 'Department', dataIndex: 'department', align: 'center' },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (status) => <DynamicStatusTag type={status} />,
    },
  ];
  const fetchUsersData = async () => {
    const toastId = toast.loading('Fetching employee details...');
    setLoading(true);

    try {
      const res = await apiService.getAllEmployee();
      setEmployeeData(res?.data || []);
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
    fetchUsersData();
  }, []);
  return (
    <ModeCard title="All Users">
      <ModeFieldSet title="Filters">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={5}>
            <Select
              allowClear
              placeholder="Role"
              value={paramObj.role || undefined}
              style={{ width: '100%' }}
              options={USER_ROLES_ENUM}
              onChange={(val) => setParamObj((p) => ({ ...p, role: val }))}
            />
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Select
              allowClear
              placeholder="Department"
              value={paramObj.department || undefined}
              style={{ width: '100%' }}
              options={DEPARTMENT_ENUM}
              onChange={(val) => setParamObj((p) => ({ ...p, department: val }))}
            />
          </Col>

          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search by name"
              value={paramObj.name}
              onChange={(e) => setParamObj((p) => ({ ...p, name: e.target.value }))}
            />
          </Col>

          <Col xs={12} md={3}>
            <Button type="primary" block onClick={() => setRefreshCounter((p) => p + 1)}>
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

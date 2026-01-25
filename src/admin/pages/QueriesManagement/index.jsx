import { queryListResponse } from '@/admin/constants/dummyResponse';
import CrudTable from '@/pages/antdFormTable/components/CrudTable';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import { Button, Col, Input, Row, Select, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { DynamicStatusTag } from '../constants/DynamicAntdStatusTag';
import toast from 'react-hot-toast';
import apiService from '@/admin/advanceApi/apiService';

export default function QueriesManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [queryData, setQueryData] = useState([]);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: queryListResponse.meta.total,
    status: '',
    priority: '',
    search: '',
  });

  const fetchQueries = async () => {
    const toastId = toast.loading('Fetching queries...');
    setLoading(true);
    try {
      const res = await apiService.getAllQueries();
      setQueryData(res?.data || []);
      toast.success('Queries loaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to load queries', { id: toastId });
      toast.success('Using Dummy Data');
      setQueryData(queryListResponse.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [refreshCounter]);

  const tableData = queryData.filter((q) => {
    return (
      (!paramObj.status || q.status === paramObj.status) &&
      (!paramObj.priority || q.priority === paramObj.priority) &&
      (!paramObj.search ||
        q.userName.toLowerCase().includes(paramObj.search.toLowerCase()) ||
        q.subject.toLowerCase().includes(paramObj.search.toLowerCase()))
    );
  });

  const columns = [
    { title: 'Query ID', dataIndex: 'id', align: 'center' },
    { title: 'User Name', dataIndex: 'userName', align: 'center' },
    { title: 'Subject', dataIndex: 'subject', align: 'center' },
    {
      title: 'Priority',
      dataIndex: 'priority',
      align: 'center',
      render: (val) => <DynamicStatusTag type={val} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (val) => <DynamicStatusTag type={val} />,
    },
    { title: 'Created At', dataIndex: 'createdAt', align: 'center' },
    {
      title: 'Action',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: () => (
        <>
          <Space size="small">
            <Tooltip title="View">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => {
                  // setShowInputForm(true);
                  // setInitialData(record);
                  // setType("VIEW")
                }}
                className="table-action-btn-view"
              />
            </Tooltip>

            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  // setShowInputForm(true);
                  // setInitialData(record);
                  // setType("EDIT")
                }}
                className="table-action-btn-edit"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                // onClick={() => setInitialData(record)}
                className="table-action-btn-delete"
              />
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];

  return (
    <ModeCard title="All Queries">
      <ModeFieldSet title="Filters">
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} md={5}>
            <Select
              allowClear
              placeholder="Status"
              style={{ width: '100%' }}
              onChange={(val) => setParamObj((p) => ({ ...p, status: val }))}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="resolved">Resolved</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Select
              allowClear
              placeholder="Priority"
              style={{ width: '100%' }}
              onChange={(val) => setParamObj((p) => ({ ...p, priority: val }))}
            >
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Col>

          <Col xs={24} md={8}>
            <Input
              allowClear
              placeholder="Search by user or subject"
              onChange={(e) => setParamObj((p) => ({ ...p, search: e.target.value }))}
            />
          </Col>

          <Col xs={12} md={3}>
            <Button type="primary" block onClick={() => setRefreshCounter((p) => p + 1)}>
              Apply
            </Button>
          </Col>

          <Col xs={12} md={3}>
            <Button block onClick={() => setRefreshCounter((p) => p + 1)}>
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
        loading={loading}
      />
    </ModeCard>
  );
}

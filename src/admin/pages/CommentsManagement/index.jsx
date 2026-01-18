import { commentListResponse } from '@/admin/constants/dummyResponse';
import CrudTable from '@/pages/antdFormTable/components/CrudTable';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import { Button, Col, Input, Row, Select, Rate, Tag, Space, Tooltip, DatePicker } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { DynamicStatusTag } from '../constants/DynamicAntdStatusTag';

const { RangePicker } = DatePicker;

export default function CommentsManagement() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: commentListResponse.meta.total,
    showOnUi: '',
    search: '',
    dateRange: [],
  });

  /* ---------------- FILTER LOGIC ---------------- */
  const tableData = commentListResponse.data.filter((c) => {
    const matchesStatus = paramObj.showOnUi === '' || c.showOnUi === paramObj.showOnUi;

    const matchesSearch =
      !paramObj.search ||
      c.userName.toLowerCase().includes(paramObj.search.toLowerCase()) ||
      c.comment.toLowerCase().includes(paramObj.search.toLowerCase());

    const matchesDate =
      !paramObj.dateRange.length ||
      dayjs(c.createdAt).isBetween(paramObj.dateRange[0], paramObj.dateRange[1], 'day', '[]');

    return matchesStatus && matchesSearch && matchesDate;
  });

  const columns = [
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (val) => <Rate disabled value={val} />,
    },
    {
      title: 'Showing On UI',
      dataIndex: 'showOnUi',
      key: 'showOnUi',
      render: (val) => <DynamicStatusTag type={val} />,
    },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: () => (
        <Space size="small">
          <Tooltip title="View">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ModeCard title="All Comments">
      {showFilters && (
        <ModeFieldSet
          title="Filters"
          extra={
            <Button size="small" type="text" onClick={() => setShowFilters(false)}>
              Close
            </Button>
          }
        >
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={12} md={5}>
              <Select
                allowClear
                placeholder="Types"
                value={paramObj.type || undefined}
                style={{ width: '100%' }}
                // options={USER_ROLES_ENUM}
                onChange={(val) => setParamObj((p) => ({ ...p, showOnUi: val }))}
              >
                <Select.Option>True</Select.Option>
                <Select.Option>False</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={5}>
              <RangePicker
                style={{ width: '100%' }}
                value={paramObj.dateRange}
                onChange={(dates) => setParamObj((p) => ({ ...p, dateRange: dates || [] }))}
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
              <Button type="primary" block onClick={() => setRefreshCounter((p) => p + 1)}>
                Apply
              </Button>
            </Col>

            <Col xs={12} md={3}>
              <Button
                block
                onClick={() => {
                  setParamObj({
                    ...paramObj,
                    approved: '',
                    search: '',
                    dateRange: [],
                  });
                  setRefreshCounter((p) => p + 1);
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </ModeFieldSet>
      )}

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

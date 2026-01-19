import { Button, Col, Form, Input, Row, Select, Space, Tooltip, Tag, Modal } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import ModeCard from '@/pages/antdFormTable/components/ModeCard';
import ModeFieldSet from '@/pages/antdFormTable/components/FieldSet';
import CrudTable from '@/pages/antdFormTable/components/CrudTable';
import apiService from '@/admin/advanceApi/apiService';

// import {
//   DASHBOARD_REQUIREMENT_TYPE_ENUM,
//   REQUIREMENT_STATUS_ENUM,
// } from "../../constants/requirementEnums";
import { dummyRequirementsData } from '@/admin/constants/dummyResponse';
import { DASHBOARD_REQUIREMENT_TYPE_ENUM, REQUIREMENT_STATUS_ENUM } from '../constants/enum';

const { TextArea } = Input;

export default function RequirementsManagement() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const [paramObj, setParamObj] = useState({
    limit: 10,
    offset: 0,
    total: 0,
  });

  useEffect(() => {
    fetchRequirements();
  }, [refreshCounter]);

  const fetchRequirements = async () => {
    setTableLoading(true);

    try {
      console.log('📡 Calling API: getAllRequirements');
      const res = await apiService.getAllRequirements();

      const fetchedData = res.data?.data || [];
      setRequirements(fetchedData);
      setParamObj((p) => ({
        ...p,
        total: res.data?.meta?.total || 0,
      }));

      toast.success('Requirements loaded successfully');
    } catch (err) {
      console.error('❌ API Error:', err);
      console.log('⚠️ Using dummy data as fallback');

      toast.error('Failed to fetch requirements from API');
      toast('Using dummy data for demonstration', { icon: 'ℹ️' });

      setRequirements(dummyRequirementsData.data);
      setParamObj((p) => ({
        ...p,
        total: dummyRequirementsData.meta?.total || 0,
      }));
    } finally {
      setTableLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const toastId = toast.loading('Submitting requirement...');

    try {
      const payload = {
        ...values,
        status: 'submitted',
        openedAt: new Date().toISOString(),
        closedAt: null,
        developerThought: null,
      };

      console.log('📦 Payload:', payload);
      console.log('📡 Calling API: addRequirement');

      const res = await apiService.addRequirement(payload);

      console.log('✅ API Success:', res);

      toast.success('Requirement submitted successfully!', { id: toastId });

      form.resetFields();
      console.log('🔄 Form reset');

      setRefreshCounter((p) => p + 1);
      console.log('🔄 Triggering table refresh');
    } catch (err) {
      console.error('❌ Submit Error:', err);
      toast.error(err?.message || 'Failed to submit requirement', {
        id: toastId,
      });

      console.log('⚠️ Adding to local state for demo');
      const newReq = {
        reqId: `REQ_${String(requirements.length + 1).padStart(3, '0')}`,
        ...values,
        status: 'submitted',
        openedAt: new Date().toISOString(),
        closedAt: null,
        developerThought: null,
        employeeName: 'Current User',
        employeeId: 'EMP000',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setRequirements([newReq, ...requirements]);
      form.resetFields();
      toast('Added to local list (API unavailable)', {
        id: toastId,
        icon: 'ℹ️',
      });
    } finally {
      setLoading(false);
      console.log('🏁 Submit complete');
    }
  };

  const handleView = (record) => {
    console.log('👁️ Viewing requirement:', record);
    setSelectedRequirement(record);
    setViewModal(true);
  };

  const handleDelete = async (record) => {
    console.log('🗑️ Deleting requirement:', record.reqId);

    Modal.confirm({
      title: 'Delete Requirement',
      content: `Are you sure you want to delete requirement ${record.reqId}?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        const toastId = toast.loading('Deleting requirement...');

        try {
          console.log('📡 Calling API: deleteRequirement');
          await apiService.deleteRequirement(record.reqId);

          console.log('✅ Delete successful');
          toast.success('Requirement deleted successfully', { id: toastId });

          setRefreshCounter((p) => p + 1);
        } catch (err) {
          console.error('❌ Delete Error:', err);
          toast.error('Failed to delete requirement', { id: toastId });

          console.log('⚠️ Removing from local state for demo');
          setRequirements(requirements.filter((r) => r.reqId !== record.reqId));
          toast('Removed from local list (API unavailable)', {
            id: toastId,
            icon: 'ℹ️',
          });
        }
      },
    });
  };

  const columns = [
    {
      title: 'Req ID',
      dataIndex: 'reqId',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      align: 'left',
      width: 200,
      render: (path) => <code style={{ fontSize: '12px' }}>{path}</code>,
    },
    {
      title: 'Type',
      dataIndex: 'requirementType',
      align: 'center',
      width: 150,
      render: (type) => {
        const typeData = DASHBOARD_REQUIREMENT_TYPE_ENUM.find((t) => t.value === type);
        return <Tag color="blue">{typeData?.label || type}</Tag>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => {
        const statusData = REQUIREMENT_STATUS_ENUM.find((s) => s.value === status);
        return <Tag color={statusData?.color || 'default'}>{statusData?.label || status}</Tag>;
      },
    },
    {
      title: 'Opened Date',
      dataIndex: 'openedAt',
      align: 'center',
      width: 150,
      render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A'),
    },
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      align: 'center',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ModeCard title="Submit New Requirement">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={(changedValues) => {
            console.log('📝 Form values changed:', changedValues);
          }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="path"
                label="Page Path"
                rules={[
                  { required: true, message: 'Please enter the page path' },
                  {
                    pattern: /^\/[a-zA-Z0-9\/-]*$/,
                    message:
                      'Path must start with / and contain only alphanumeric characters, / and -',
                  },
                ]}
              >
                <Input placeholder="e.g., /dashboard or /salary-management" prefix="🔗" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="requirementType"
                label="Requirement Type"
                rules={[{ required: true, message: 'Please select requirement type' }]}
              >
                <Select
                  placeholder="Select type"
                  options={DASHBOARD_REQUIREMENT_TYPE_ENUM}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="&nbsp;">
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<PlusOutlined />}
                  >
                    Submit Requirement
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('🔄 Resetting form');
                      form.resetFields();
                    }}
                  >
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: 'Please provide a description' },
                  {
                    min: 10,
                    message: 'Description must be at least 10 characters',
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the requirement in detail..."
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModeCard>

      {/* <ModeCard
        title="Requirements List"
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              console.log('🔄 Manual refresh triggered');
              setRefreshCounter((p) => p + 1);
            }}
          >
            Refresh
          </Button>
        }
      > */}
      <CrudTable
        tableData={requirements}
        columns={columns}
        paramObj={paramObj}
        setParamObj={setParamObj}
        setRefreshCounter={setRefreshCounter}
        loading={tableLoading}
        scroll={{ x: 1400 }}
      />
      {/* </ModeCard> */}

      <Modal
        title={`Requirement Details - ${selectedRequirement?.reqId}`}
        open={viewModal}
        onCancel={() => {
          console.log('❌ Closing view modal');
          setViewModal(false);
          setSelectedRequirement(null);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setViewModal(false);
              setSelectedRequirement(null);
            }}
          >
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedRequirement && (
          <div style={{ lineHeight: '2' }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <strong>Requirement ID:</strong>
              </Col>
              <Col span={16}>{selectedRequirement.reqId}</Col>

              <Col span={8}>
                <strong>Path:</strong>
              </Col>
              <Col span={16}>
                <code>{selectedRequirement.path}</code>
              </Col>

              <Col span={8}>
                <strong>Type:</strong>
              </Col>
              <Col span={16}>
                <Tag color="blue">
                  {
                    DASHBOARD_REQUIREMENT_TYPE_ENUM.find(
                      (t) => t.value === selectedRequirement.requirementType
                    )?.label
                  }
                </Tag>
              </Col>

              <Col span={8}>
                <strong>Status:</strong>
              </Col>
              <Col span={16}>
                {(() => {
                  const statusData = REQUIREMENT_STATUS_ENUM.find(
                    (s) => s.value === selectedRequirement.status
                  );
                  return <Tag color={statusData?.color}>{statusData?.label}</Tag>;
                })()}
              </Col>

              <Col span={8}>
                <strong>Employee:</strong>
              </Col>
              <Col span={16}>
                {selectedRequirement.employeeName} ({selectedRequirement.employeeId})
              </Col>

              <Col span={8}>
                <strong>Opened Date:</strong>
              </Col>
              <Col span={16}>{new Date(selectedRequirement.openedAt).toLocaleString()}</Col>

              <Col span={8}>
                <strong>Closed Date:</strong>
              </Col>
              <Col span={16}>
                {selectedRequirement.closedAt
                  ? new Date(selectedRequirement.closedAt).toLocaleString()
                  : 'N/A'}
              </Col>

              <Col span={24}>
                <strong>Description:</strong>
                <div
                  style={{
                    marginTop: '8px',
                    padding: '12px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                  }}
                >
                  {selectedRequirement.description}
                </div>
              </Col>

              {selectedRequirement.developerThought && (
                <Col span={24}>
                  <strong>Developer's Thought:</strong>
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '12px',
                      background: '#e6f7ff',
                      borderRadius: '4px',
                      border: '1px solid #91d5ff',
                    }}
                  >
                    {selectedRequirement.developerThought}
                  </div>
                </Col>
              )}
            </Row>
          </div>
        )}
      </Modal>
    </>
  );
}

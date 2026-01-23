import { Modal, Avatar, Card, Descriptions, Select, Button, Space, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import apiService from '@/admin/advanceApi/apiService';
import { USER_ROLES_ENUM } from '../../constants/enum';
import './model.css';

export default function RoleUpdateModal({ visible, onClose, userData, onSuccess }) {
  const [selectedRole, setSelectedRole] = useState(userData?.role);
  const [loading, setLoading] = useState(false);

  const handleUpdateRole = async () => {
    if (!selectedRole || selectedRole === userData?.role) {
      message.warning('Please select a different role to update');
      return;
    }

    try {
      setLoading(true);

      await apiService.updateEmployeeRole({
        userId: userData.id,
        role: selectedRole,
        email: userData.email,
      });

      message.success('User role updated successfully!');

      // Call success callback to refresh parent data
      if (onSuccess) {
        onSuccess();
      }

      // Close modal after short delay to show success animation
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      message.error(err?.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedRole(userData?.role);
    onClose();
  };

  if (!userData) return null;

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      className="role-update-modal"
      destroyOnClose
    >
      <div className="role-modal-content">
        {/* User Avatar Section */}
        <div className="user-avatar-section">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            className="user-avatar"
            style={{
              backgroundColor: '#1677ff',
              boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
            }}
          />
          <h2 className="user-name">{userData.fullName}</h2>
          <p className="user-emp-id">Employee ID: {userData.employeeId}</p>
        </div>

        {/* User Details Card */}
        <Card className="user-details-card" bordered={false}>
          <Descriptions
            column={1}
            labelStyle={{ fontWeight: 600, color: '#666' }}
            contentStyle={{ color: '#333' }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined style={{ color: '#1677ff' }} />
                  Email
                </Space>
              }
            >
              {userData.email}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined style={{ color: '#52c41a' }} />
                  Company Email
                </Space>
              }
            >
              {userData.companyEmail || userData.email}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <PhoneOutlined style={{ color: '#fa8c16' }} />
                  Phone Number
                </Space>
              }
            >
              {userData.mobile}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <IdcardOutlined style={{ color: '#722ed1' }} />
                  Designation
                </Space>
              }
            >
              {userData.designation}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <ApartmentOutlined style={{ color: '#eb2f96' }} />
                  Department
                </Space>
              }
            >
              {userData.department}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <TeamOutlined style={{ color: '#13c2c2' }} />
                  Working Status
                </Space>
              }
            >
              {userData.workingStatus}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Role Selection Section */}
        <div className="role-selection-section">
          <div className="role-label">
            <TeamOutlined style={{ marginRight: 8, color: '#1677ff' }} />
            <span>Select User Role</span>
          </div>
          <Select
            size="large"
            options={USER_ROLES_ENUM}
            value={selectedRole}
            style={{ width: '100%' }}
            onChange={(val) => setSelectedRole(val)}
            placeholder="Select a role"
          />
          {selectedRole !== userData.role && (
            <div className="role-change-notice">
              <span style={{ color: '#fa8c16' }}>
                Role will be changed from <strong>{userData.role}</strong> to{' '}
                <strong>{selectedRole}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <Space size="middle">
            <Button size="large" onClick={handleCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleUpdateRole}
              disabled={!selectedRole || selectedRole === userData.role}
              className="update-btn"
            >
              Update Role
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
}

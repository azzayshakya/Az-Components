import { Modal, Avatar, Button, Space, message, Popconfirm, Alert } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import apiService from '@/admin/advanceApi/apiService';

export default function EmployeeActivationModal({ visible, onClose, userData, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleActivateEmployee = async () => {
    try {
      setLoading(true);

      await apiService.activateEmployee({
        userId: userData.id,
        email: userData.email,
      });

      message.success({
        content: 'Employee activated successfully!',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      });

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 800);
    } catch (err) {
      message.error(err?.message || 'Failed to activate employee');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!userData) return null;

  const modalContentStyle = {
    padding: '24px 12px',
  };

  const userSectionStyle = {
    textAlign: 'center',
    marginBottom: '24px',
    animation: 'fadeIn 0.4s ease-out',
  };

  const avatarStyle = {
    backgroundColor: '#1677ff',
    boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
    marginBottom: '16px',
  };

  const userNameStyle = {
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#1a1a1a',
  };

  const roleTagStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    background: '#f0f0f0',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  };

  const infoCardStyle = {
    background: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px',
    fontSize: '14px',
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '16px',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#666',
    marginRight: '8px',
    minWidth: '70px',
  };

  const valueStyle = {
    color: '#333',
    flex: 1,
  };

  const activationInfoStyle = {
    background: '#e6f7ff',
    border: '1px solid #91d5ff',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  };

  const activationTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: '600',
    color: '#0958d9',
    marginBottom: '12px',
  };

  const benefitListStyle = {
    margin: '0',
    paddingLeft: '20px',
    color: '#333',
  };

  const benefitItemStyle = {
    marginBottom: '6px',
    fontSize: '14px',
  };

  const buttonStyle = {
    minWidth: '120px',
    height: '40px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
  };

  const actionSectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '24px',
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={560}
      centered
      closable={!loading}
      maskClosable={!loading}
    >
      <div style={modalContentStyle}>
        {/* User Info Section */}
        <div style={userSectionStyle}>
          <Avatar size={90} icon={<UserOutlined />} style={avatarStyle} />
          <h2 style={userNameStyle}>{userData.fullName}</h2>
          <span style={roleTagStyle}>Current Role: {userData.role || 'User'}</span>
        </div>

        {/* User Details Card */}
        <div style={infoCardStyle}>
          <div style={infoRowStyle}>
            <MailOutlined style={{ ...iconStyle, color: '#1677ff' }} />
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{userData.email}</span>
          </div>

          <div style={infoRowStyle}>
            <PhoneOutlined style={{ ...iconStyle, color: '#52c41a' }} />
            <span style={labelStyle}>Phone:</span>
            <span style={valueStyle}>{userData.mobile}</span>
          </div>

          <div style={{ ...infoRowStyle, marginBottom: 0 }}>
            <TeamOutlined style={{ ...iconStyle, color: '#722ed1' }} />
            <span style={labelStyle}>Status:</span>
            <span style={valueStyle}>{userData.workingStatus || 'Inactive'}</span>
          </div>
        </div>

        {/* Activation Benefits */}
        <div style={activationInfoStyle}>
          <div style={activationTitleStyle}>
            <CheckCircleOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
            What happens after activation?
          </div>
          <ul style={benefitListStyle}>
            <li style={benefitItemStyle}>
              User will be promoted from <strong>User</strong> to <strong>Employee</strong>
            </li>
            <li style={benefitItemStyle}>Access to company dashboard and employee portal</li>
            <li style={benefitItemStyle}>Ability to view and manage work-related data</li>
            <li style={benefitItemStyle}>Full employee privileges and permissions</li>
          </ul>
        </div>

        {/* Warning Alert */}
        <Alert
          message="Important Security Notice"
          description={
            <div>
              <p style={{ margin: '8px 0 4px 0', fontSize: '14px' }}>
                ⚠️ This user will gain access to <strong>sensitive company information</strong>{' '}
                including:
              </p>
              <ul
                style={{
                  margin: '8px 0',
                  paddingLeft: '20px',
                  fontSize: '13px',
                }}
              >
                <li>Internal documents and reports</li>
                <li>Employee and financial data</li>
                <li>Company policies and procedures</li>
              </ul>
              <p
                style={{
                  margin: '4px 0 0 0',
                  fontSize: '13px',
                  color: '#d46b08',
                }}
              >
                <strong>Please ensure this user is trustworthy and authorized.</strong> Unauthorized
                access may create security risks.
              </p>
            </div>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          style={{ marginBottom: '20px' }}
        />

        {/* Action Buttons */}
        <div style={actionSectionStyle}>
          <Button
            size="large"
            onClick={handleCancel}
            disabled={loading}
            style={{
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontWeight: '600',
            }}
          >
            Cancel
          </Button>

          <Popconfirm
            title="Confirm Employee Activation"
            description={
              <div style={{ maxWidth: '280px' }}>
                Are you sure you want to activate <strong>{userData.fullName}</strong> as an
                employee? This action will grant them full employee access.
              </div>
            }
            onConfirm={handleActivateEmployee}
            okText="Yes, Activate"
            cancelText="No, Cancel"
            okButtonProps={{
              danger: false,
              type: 'primary',
              loading: loading,
            }}
            disabled={loading}
          >
            <Button
              type="primary"
              size="large"
              loading={loading}
              style={buttonStyle}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.currentTarget.style, buttonHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, buttonStyle);
              }}
            >
              {loading ? 'Activating...' : 'Activate Employee'}
            </Button>
          </Popconfirm>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </Modal>
  );
}

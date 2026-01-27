import { Tag } from 'antd';
import {
  InfoCircleOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  PlayCircleOutlined,
  ExclamationCircleOutlined,
  FireOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import './DynamicAntdStatusTag.css';
export const DynamicStatusTag = ({
  type = 'NA',
  returnType = 'Tag',
  size = 'medium',
  showIcon = true,
}) => {
  console.log('azazaz dynamic data tag recieve this data', type, returnType, size, showIcon);
  const statusKey = String(type).trim().toLowerCase();

  let color = 'green';
  let statusText = String(type);
  let icon = null;

  switch (statusKey) {
    case 'on':
    case 'yes':
    case 'true':
    case 'active':
      color = 'green';
      statusText = statusKey.toUpperCase();
      icon = <CheckCircleOutlined />;
      break;

    case 'off':
    case 'no':
    case 'false':
    case 'inactive':
      color = 'red';
      statusText = statusKey.toUpperCase();
      icon = <CloseCircleOutlined />;
      break;
    //project status
    case 'planned':
      color = 'blue';
      statusText = 'PLANNED';
      icon = <ProjectOutlined />;
      break;

    case 'ongoing':
      color = 'green';
      statusText = 'ONGOING';
      icon = <PlayCircleOutlined />;
      break;

    case 'on_hold':
    case 'on hold':
      color = 'gold';
      statusText = 'ON HOLD';
      icon = <PauseCircleOutlined />;
      break;

    case 'completed':
      color = 'green';
      statusText = 'COMPLETED';
      icon = <CheckCircleOutlined />;
      break;

    case 'cancelled':
      color = 'red';
      statusText = 'CANCELLED';
      icon = <StopOutlined />;
      break;
    //priority
    case 'high':
      color = 'red';
      statusText = 'HIGH';
      icon = <FireOutlined />;
      break;

    case 'medium':
      color = 'gold';
      statusText = 'MEDIUM';
      icon = <ExclamationCircleOutlined />;
      break;

    case 'low':
      color = 'green';
      statusText = 'LOW';
      icon = <InfoCircleOutlined />;
      break;
    //status
    case 'pending':
      color = 'orange';
      statusText = 'PENDING';
      icon = <ClockCircleOutlined />;
      break;

    case 'approved':
      color = 'green';
      statusText = 'APPROVED';
      icon = <CheckCircleOutlined />;
      break;

    case 'rejected':
      color = 'red';
      statusText = 'REJECTED';
      icon = <CloseCircleOutlined />;
      break;

    //working status
    case 'working':
      color = 'green';
      statusText = 'WORKING';
      icon = <UserOutlined />;
      break;

    case 'notice_period':
    case 'notice period':
      color = 'gold';
      statusText = 'NOTICE PERIOD';
      icon = <UserSwitchOutlined />;
      break;

    case 'resigned':
      color = 'orange';
      statusText = 'RESIGNED';
      icon = <FallOutlined />;
      break;

    case 'terminated':
      color = 'red';
      statusText = 'TERMINATED';
      icon = <UserDeleteOutlined />;
      break;

    case 'retired':
      color = 'blue';
      statusText = 'RETIRED';
      icon = <RiseOutlined />;
      break;

    case 'contract_completed':
    case 'contract completed':
      color = 'green';
      statusText = 'CONTRACT COMPLETED';
      icon = <CheckCircleOutlined />;
      break;

    //user roles

    case 'admin':
      color = 'magenta';
      statusText = 'ADMIN';
      icon = <UserSwitchOutlined />;
      break;

    case 'ceo':
      color = 'purple';
      statusText = 'CEO';
      icon = <RiseOutlined />;
      break;

    case 'cto':
      color = 'geekblue';
      statusText = 'CTO';
      icon = <ProjectOutlined />;
      break;

    case 'cfo':
      color = 'gold';
      statusText = 'CFO';
      icon = <RiseOutlined />;
      break;

    case 'project_manager':
    case 'project manager':
      color = 'blue';
      statusText = 'PROJECT MANAGER';
      icon = <ProjectOutlined />;
      break;

    case 'finance_manager':
    case 'finance manager':
      color = 'cyan';
      statusText = 'FINANCE MANAGER';
      icon = <RiseOutlined />;
      break;

    case 'employee':
      color = 'green';
      statusText = 'EMPLOYEE';
      icon = <UserOutlined />;
      break;

    case 'user':
      color = 'default';
      statusText = 'USER';
      icon = <UserOutlined />;
      break;

    default:
      color = 'blue';
      statusText = String(type).toUpperCase();
      icon = <InfoCircleOutlined />;
  }

  const sizeMap = {
    small: { minWidth: '4rem', fontSize: '0.7rem', padding: '1px 1px' },
    medium: { minWidth: '6rem', fontSize: '0.7rem', padding: '2px 2px' },
    large: { minWidth: '8rem', fontSize: '0.7rem', padding: '2px 2px' },
  };

  const tagSize = size && sizeMap[size] ? size : 'medium';
  const styleOverride = sizeMap[tagSize];

  const finalIcon = showIcon !== false ? icon : null;

  if (returnType === 'Tag') {
    return (
      <Tag className="status-tag" color={color} icon={finalIcon} style={styleOverride}>
        {statusText}
      </Tag>
    );
  }

  return { color, status: statusText };
};

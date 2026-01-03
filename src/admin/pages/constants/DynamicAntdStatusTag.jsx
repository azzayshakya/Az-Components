import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

import "./DynamicAntdStatusTag.css";

const STATUS_CONFIG = {
  active: {
    label: "Active",
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  inactive: {
    label: "Inactive",
    color: "default",
    icon: <MinusOutlined />,
  },
  pending: {
    label: "Pending",
    color: "orange",
    icon: <ClockCircleOutlined />,
  },
  rejected: {
    label: "Rejected",
    color: "red",
    icon: <CloseCircleOutlined />,
  },
  completed: {
    label: "Completed",
    color: "blue",
    icon: <CheckCircleOutlined />,
  },
  resolved: {
    label: "Resolved",
    color: "success",
    icon: <CheckCircleOutlined />,
  },

  // Priority based
  high: {
    label: "High",
    color: "red",
    icon: <ArrowUpOutlined />,
  },
  medium: {
    label: "Medium",
    color: "orange",
    icon: <ExclamationCircleOutlined />,
  },
  low: {
    label: "Low",
    color: "blue",
    icon: <ArrowDownOutlined />,
  },
};

const sizeMap = {
  small: "status-sm",
  medium: "status-md",
  large: "status-lg",
};

export const DynamicAntdStatusTag = ({
  status,
  size = "medium",
  returnType = "tag",
  pulse = false,
  show = true, 
}) => {
  if (!show || !status) return null;

  const key = status.toLowerCase();
  const config = STATUS_CONFIG[key];

  if (!config) {
    return returnType === "tag" ? <Tag>{status}</Tag> : status;
  }

  const className = `
    status-tag
    ${sizeMap[size]}
    ${pulse ? "status-pulse" : ""}
  `;

  if (returnType === "text") {
    return config.label;
  }

  return (
    <Tag
      color={config.color}
      className={className}
      icon={config.icon}
    >
      {config.label}
    </Tag>
  );
};

export default DynamicAntdStatusTag;

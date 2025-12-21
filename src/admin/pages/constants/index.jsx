import {  Tag } from "antd";

const SalaryHistoryPopover = ({ history }) => {
  return (
    <div style={{ minWidth: 220 }}>
      {history.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span>
            {item.from} → {item.to}
          </span>
          <span>
            ₹{item.salary.toLocaleString()}
            {item.isActive && (
              <Tag color="green" style={{ marginLeft: 6 }}>
                Current
              </Tag>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SalaryHistoryPopover;

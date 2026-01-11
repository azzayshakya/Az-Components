import { Button, Col, DatePicker, Form, InputNumber, Modal, Row, Space, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function SalaryUpdateForm({ visible, employee, onClose, onSubmit }) {
  const [form] = Form.useForm();
  const [salaryHistory, setSalaryHistory] = useState([]);

  useEffect(() => {
    if (employee && visible) {
      const history = employee.salaryHistory || [];
      setSalaryHistory(
        history.map((item, index) => ({
          id: index,
          from: item.from,
          to: item.to,
          salary: item.salary,
          isActive: item.isActive || false,
        }))
      );

      form.setFieldsValue({
        employeeId: employee.employeeId,
        name: employee.fullName || employee.name,
        designation: employee.designation,
      });
    }
  }, [employee, visible, form]);

  const handleAddRow = () => {
    const updatedHistory = salaryHistory.map((item) => ({
      ...item,
      isActive: false,
      to: item.to === "Present" ? dayjs().format("YYYY-MM") : item.to,
    }));

    // Add new row
    const newRow = {
      id: Date.now(),
      from: dayjs().format("YYYY-MM"),
      to: "Present",
      salary: 0,
      isActive: true,
    };

    setSalaryHistory([...updatedHistory, newRow]);
  };

  const handleDeleteRow = (id) => {
    const filteredHistory = salaryHistory.filter((item) => item.id !== id);
    
    if (filteredHistory.length > 0) {
      const hasActive = filteredHistory.some((item) => item.isActive);
      if (!hasActive) {
        filteredHistory[filteredHistory.length - 1].isActive = true;
        filteredHistory[filteredHistory.length - 1].to = "Present";
      }
    }
    
    setSalaryHistory(filteredHistory);
  };

  const handleSalaryChange = (id, field, value) => {
    setSalaryHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      if (salaryHistory.length === 0) {
        Modal.error({ content: "Please add at least one salary record" });
        return;
      }

      const formattedHistory = salaryHistory.map((item) => ({
        from: item.from,
        to: item.to,
        salary: item.salary,
        isActive: item.isActive,
      }));

      const currentSalary = salaryHistory.find((item) => item.isActive)?.salary || 0;

      const payload = {
        empId: employee.empId,
        employeeId: employee.employeeId,
        salary: currentSalary,
        salaryHistory: formattedHistory,
      };

      
      console.log("Payload to submit:", payload);

      onSubmit(payload);
      handleClose();
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setSalaryHistory([]);
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ fontSize: "18px", fontWeight: "600" }}>
          Update Salary - {employee?.employeeId}
        </div>
      }
      open={visible}
      onCancel={handleClose}
      width={900}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Update Salary
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Employee ID" name="employeeId">
              <Text strong>{employee?.employeeId}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Name" name="name">
              <Text strong>{employee?.fullName || employee?.name}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Designation" name="designation">
              <Text strong>{employee?.designation}</Text>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text strong style={{ fontSize: "16px" }}>
              Salary History
            </Text>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddRow}
            >
              Add New Salary
            </Button>
          </div>

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {salaryHistory.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#999",
                }}
              >
                No salary history. Click "Add New Salary" to begin.
              </div>
            ) : (
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                {salaryHistory.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      border: item.isActive ? "2px solid #1677ff" : "1px solid #d9d9d9",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: item.isActive ? "#f0f7ff" : "#fafafa",
                      position: "relative",
                    }}
                  >
                    {item.isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: -10,
                          left: 16,
                          backgroundColor: "#1677ff",
                          color: "white",
                          padding: "2px 12px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Current Salary
                      </div>
                    )}

                    <Row gutter={16} align="middle">
                      <Col span={7}>
                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            From (YYYY-MM)
                          </Text>
                          <br />
                          <DatePicker
                            picker="month"
                            format="YYYY-MM"
                            style={{ width: "100%" }}
                            value={item.from ? dayjs(item.from, "YYYY-MM") : null}
                            onChange={(date) =>
                              handleSalaryChange(
                                item.id,
                                "from",
                                date ? date.format("YYYY-MM") : ""
                              )
                            }
                            disabled={item.isActive && salaryHistory.length > 1}
                          />
                        </div>
                      </Col>

                      <Col span={7}>
                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            To (YYYY-MM)
                          </Text>
                          <br />
                          {item.isActive ? (
                            <div
                              style={{
                                height: "32px",
                                lineHeight: "32px",
                                fontWeight: "600",
                                color: "#1677ff",
                              }}
                            >
                              Present
                            </div>
                          ) : (
                            <DatePicker
                              picker="month"
                              format="YYYY-MM"
                              style={{ width: "100%" }}
                              value={item.to !== "Present" ? dayjs(item.to, "YYYY-MM") : null}
                              onChange={(date) =>
                                handleSalaryChange(
                                  item.id,
                                  "to",
                                  date ? date.format("YYYY-MM") : ""
                                )
                              }
                            />
                          )}
                        </div>
                      </Col>

                      <Col span={7}>
                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Salary (₹)
                          </Text>
                          <br />
                          <InputNumber
                            style={{ width: "100%" }}
                            value={item.salary}
                            onChange={(value) =>
                              handleSalaryChange(item.id, "salary", value)
                            }
                            min={0}
                            formatter={(value) =>
                              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                          />
                        </div>
                      </Col>

                      <Col span={3}>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteRow(item.id)}
                          disabled={salaryHistory.length === 1}
                          style={{ marginTop: "20px" }}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Space>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
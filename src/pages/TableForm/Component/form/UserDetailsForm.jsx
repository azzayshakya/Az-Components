import { Form, Input } from "antd";

export default function UserDetailsForm() {
  return (
    <>
      <Form.Item
        name="userName"
        label="User Name"
        rules={[
          { required: true, message: "User name is required" },
          { min: 3, message: "Minimum 3 characters required" },
        ]}
      >
        <Input placeholder="Enter user name" />
      </Form.Item>

      <Form.Item
        name="userEmail"
        label="User Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input placeholder="Enter user email" />
      </Form.Item>
    </>
  );
}

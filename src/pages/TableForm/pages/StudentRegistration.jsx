import { useState } from "react";
import { Form, Button, message } from "antd";
import PageContainer from "../layout/PageContainer";
import UserDetailsForm from "../Component/form/UserDetailsForm";
import YearEntryTable from "../Component/table/YearEntryTable";


export default function StudentRegistration() {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);

  const onSubmit = (values) => {
    if (tableData.length === 0) {
      return message.error("Please add at least one year record!");
    }

    const payload = {
      student: values,
      results: tableData,
    };

    console.log("FINAL SUBMIT:", payload);
    message.success("Form submitted successfully!");
  };

  return (
    <PageContainer title="Student Registration">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <UserDetailsForm />
        
        <YearEntryTable data={tableData} setData={setTableData} />

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          style={{ marginTop: 25 }}
        >
          Submit Details
        </Button>
      </Form>
    </PageContainer>
  );
}

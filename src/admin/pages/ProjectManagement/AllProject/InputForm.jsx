import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Spin,
  InputNumber,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import apiService from "@/admin/advanceApi/apiService";

import {
  CLIENT_TYPE_ENUM,
  PROJECT_TYPE_ENUM,
  PRIORITY_ENUM,
  PROJECT_STATUS_ENUM,
  PROJECT_SERVICES_ENUM,
  ALL_EMPLOYEE_ENUM,
} from "../../constants/enum";

const hasFormChanged = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

const fetchCompanies = async (query) => {
  if (!query) {
    return [];
  }
  try {
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error("Response not OK:", res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();    
    const mapped = data.map((c) => ({
      label: c.name,
      value: c.name,
    }));
    
    return mapped;
  } catch (error) {
    toast.error("Failed to fetch company suggestions");
    return [];
  }
};

export default function ProjectInputForm({
  type,
  projectId,
  setShowInputForm,
  initialData,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [initialSnapshot, setInitialSnapshot] = useState({});
  const [companyOptions, setCompanyOptions] = useState([]);
  const [searchingCompany, setSearchingCompany] = useState(false);

  const clientType = Form.useWatch("clientType", form);
  const isView = type === "VIEW";
  const isEdit = type === "EDIT";

  const handleEmployeeSelect = (fieldName, empName) => {
    
    const emp = ALL_EMPLOYEE_ENUM.find((e) => e.value === empName);
    
    if (emp) {
      const empIdField = fieldName === "projectLeadName" 
        ? "projectLeadEmpId" 
        : "projectCoLeadEmpId";
      
      form.setFieldsValue({
        [empIdField]: emp.empId,
      });
      
    } else {
      console.warn("⚠️ Employee not found in ALL_EMPLOYEE_ENUM");
    }
  };

  const handleCompanySearch = async (query) => {
    if (!query || query.length < 3) {
      console.log("Query too short, skipping search");
      return;
    }
    
    setSearchingCompany(true);
    try {
      const options = await fetchCompanies(query);
      setCompanyOptions(options);
    } catch (error) {
      console.error("Company search error:", error);
    } finally {
      setSearchingCompany(false);
      // console.log(" Company search complete");
    }
  };

  useEffect(() => {
    
    if ((isView || isEdit) && initialData) {
      
      const formattedData = {
        ...initialData,
        startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
        endDate: initialData.endDate ? dayjs(initialData.endDate) : null,
        createdAt: initialData.createdAt ? dayjs(initialData.createdAt) : null,
        updatedAt: initialData.updatedAt ? dayjs(initialData.updatedAt) : null,
      };
      
      
      form.setFieldsValue(formattedData);
      setInitialSnapshot(formattedData);
      
      
      if (initialData.clientCompany) {
        setCompanyOptions([
          { label: initialData.clientCompany, value: initialData.clientCompany }
        ]);
      }
    } else {
      form.resetFields();
      setInitialSnapshot({});
      setCompanyOptions([]);
    }
  }, [type, initialData, form]);

  const handleSubmit = async (values) => {
    
    const payload = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
    };
    if (isEdit && !hasFormChanged(initialSnapshot, payload)) {
      toast("No changes detected");
      return;
    }

    setLoading(true);
    // const toastId = toast.loading(
    //   isEdit ? "Updating project..." : "Creating project..."
    // );

    try {
      
      if (isEdit) {
        await apiService.updateProjectData(projectId, payload);
        toast.success("Project updated successfully");
      } 

      setShowInputForm(false);
    } catch (err) {
   toast.error(err?.message ? `${err.message}, Project updation failed` : "Project updation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModeCard
      title={`${type} Project`}
      extra={
        <div style={{gap:"10px"}}>
          <Button onClick={() => {
            setShowInputForm(false);
          }}>
            Close
          </Button>

          {!isView && (
            <Button
            style={{marginLeft:"1rem"}}
              type="primary"
              loading={loading}
              onClick={() => {
                form.submit();
              }}
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          )}
        </div>
      }
    >
      <Spin spinning={pageLoading}>
        <Form
          form={form}
          layout="horizontal"
          disabled={isView}
          labelCol={{ sm: 8 }}
          wrapperCol={{ sm: 16 }}
          onFinish={handleSubmit}
          // onValuesChange={(changedValues, allValues) => {
   
          // }}
        >
          <ModeFieldSet title="Project Information">
            <Row gutter={[24, 16]}>
              <Col md={12}>
                <Form.Item
                  name="projectName"
                  label="Project Name"
                  rules={[{ required: true, message: "Please enter project name" }]}
                >
                  <Input placeholder="Enter project name" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectType" label="Project Type">
                  <Select placeholder="Select project type" options={PROJECT_TYPE_ENUM} />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="priority" label="Priority">
                  <Select placeholder="Select priority" options={PRIORITY_ENUM} />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectStatus" label="Status">
                  <Select placeholder="Select status" options={PROJECT_STATUS_ENUM} />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="services" label="Services">
                  <Select
                    mode="multiple"
                    placeholder="Select services"
                    options={PROJECT_SERVICES_ENUM}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectAddress" label="Project Address">
                  <Input.TextArea rows={2} placeholder="Enter project address" />
                </Form.Item>
              </Col>

              <Col md={24}>
                <Form.Item name="description" label="Description">
                  <Input.TextArea rows={3} placeholder="Enter project description" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Project Leads">
            <Row gutter={[24, 16]}>
              <Col md={12}>
                <Form.Item name="projectLeadName" label="Project Lead">
                  <Select
                    placeholder="Select project lead"
                    options={ALL_EMPLOYEE_ENUM}
                    onChange={(val) => handleEmployeeSelect("projectLeadName", val)}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectLeadEmpId" label="Lead Emp ID">
                  <Input disabled placeholder="Auto-filled" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectCoLeadName" label="Project Co-Lead">
                  <Select
                    placeholder="Select co-lead"
                    options={ALL_EMPLOYEE_ENUM}
                    onChange={(val) => handleEmployeeSelect("projectCoLeadName", val)}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="projectCoLeadEmpId" label="Co-Lead Emp ID">
                  <Input disabled placeholder="Auto-filled" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Client Information">
            <Row gutter={[24, 16]}>
              <Col md={12}>
                <Form.Item name="clientType" label="Client Type">
                  <Select
                    placeholder="Select client type"
                    options={CLIENT_TYPE_ENUM}
                    onChange={(val) => {
                      console.log("🔄 Client type changed:", val);
                      if (val === "individual") {
                        form.setFieldsValue({ clientCompany: null });
                        setCompanyOptions([]);
                      }
                    }}
                  />
                </Form.Item>
              </Col>

              {clientType === "company" && (
                <Col md={12}>
                  <Form.Item name="clientCompany" label="Company">
                    <Select
                      showSearch
                      placeholder="Type to search company (min 3 chars)"
                      onSearch={handleCompanySearch}
                      options={companyOptions}
                      filterOption={false}
                      notFoundContent={searchingCompany ? <Spin size="small" /> : "Type to search..."}
                      loading={searchingCompany}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col md={12}>
                <Form.Item name="clientName" label="Client Name">
                  <Input placeholder="Enter client name" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="clientMobile" label="Client Mobile">
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter mobile number"
                    controls={false}
                    maxLength={10}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item
                  name="clientEmail"
                  label="Client Email"
                  rules={[{ type: "email", message: "Please enter valid email" }]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="clientGSTIN" label="GSTIN">
                  <Input placeholder="Enter GSTIN (optional)" />
                </Form.Item>
              </Col>

              <Col md={24}>
                <Form.Item name="clientAddress" label="Client Address">
                  <Input.TextArea rows={2} placeholder="Enter client address" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Financials & Timeline">
            <Row gutter={[24, 16]}>
              <Col md={12}>
                <Form.Item name="budget" label="Budget">
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter budget"
                    formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="contractValue" label="Contract Value">
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter contract value"
                    formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="startDate" label="Start Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item name="endDate" label="End Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item
                  name="showOnUI"
                  label="Show On UI"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>
        </Form>
      </Spin>
    </ModeCard>
  );
}
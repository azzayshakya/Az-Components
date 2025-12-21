import ModeFieldSet from "@/pages/antdFormTable/components/FieldSet";
import ModeCard from "@/pages/antdFormTable/components/ModeCard";
import { Button, Col, Form, Input, Row, Select, DatePicker, Upload } from "antd";

export default function AddEmployee() {
  return (
    <div>
      <ModeCard
      style={{border:"2px red solid"}}
        title="Add Employee"
        extra={<Button type="primary">Close</Button>}
      >
        <Form
          layout="horizontal"
          labelCol={{ xs: 24, sm: 8 }}
          wrapperCol={{ xs: 24, sm: 16 }}
        >
          <ModeFieldSet title="Personal Information">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Father's Name" name="fatherName">
                  <Input placeholder="Enter father's name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Date of Birth" name="dob">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Gender" name="gender">
                  <Select placeholder="Select gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Mobile Number" name="mobile">
                  <Input placeholder="Enter mobile number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Email Address" name="email">
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Aadhar Number" name="aadharNumber">
                  <Input placeholder="Enter Aadhar number" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Employment Details">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Employee ID" name="employeeId">
                  <Input placeholder="EMP-XXXX" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Joining Date" name="joiningDate">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Working Status" name="workingStatus">
                  <Select placeholder="Select status">
                    <Select.Option value="working">
                      Currently Working
                    </Select.Option>
                    <Select.Option value="resigned">Resigned</Select.Option>
                    <Select.Option value="terminated">Terminated</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Last Working Date" name="lastWorkingDate">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Department" name="department">
                  <Select placeholder="Select department">
                    <Select.Option value="civil">
                      Civil Engineering
                    </Select.Option>
                    <Select.Option value="electrical">
                      Electrical Engineering
                    </Select.Option>
                    <Select.Option value="mechanical">
                      Mechanical Engineering
                    </Select.Option>
                    <Select.Option value="firefighting">
                      Fire Fighting
                    </Select.Option>
                    <Select.Option value="site">Site Engineer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Designation" name="designation">
                  <Select placeholder="Select job role">
                    <Select.Option value="junior-engineer">
                      Junior Engineer
                    </Select.Option>
                    <Select.Option value="senior-engineer">
                      Senior Engineer
                    </Select.Option>
                    <Select.Option value="site-supervisor">
                      Site Supervisor
                    </Select.Option>
                    <Select.Option value="project-manager">
                      Project Manager
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Work Location" name="workLocation">
                  <Select placeholder="Select work mode">
                    <Select.Option value="wfo">Work From Office</Select.Option>
                    <Select.Option value="wfh">Work From Home</Select.Option>
                    <Select.Option value="site">Site Work</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Address Information">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Temporary Address" name="tempAddress">
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter temporary address"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Permanent Address" name="permanentAddress">
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter permanent address"
                  />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Bank & Salary Details">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Bank Name" name="bankName">
                  <Input placeholder="Enter bank name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Account Number" name="accountNumber">
                  <Input placeholder="Enter account number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="IFSC Code" name="ifscCode">
                  <Input placeholder="Enter IFSC code" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Salary (Monthly)" name="salary">
                  <Input prefix="₹" placeholder="Enter salary amount" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Emergency Contact">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Emergency Contact No" name="emergencyContact">
                  <Input placeholder="Enter emergency contact number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Person Details"
                  name="emergencyDetails"
                >
                  <Input placeholder="Relation / Name" />
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>

          <ModeFieldSet title="Document Uploads">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Employee Photo" name="photo">
                  <Upload>
                    <Button>Upload Photo</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Aadhar Card" name="aadharDoc">
                  <Upload>
                    <Button>Upload Aadhar</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="PAN Card" name="panDoc">
                  <Upload>
                    <Button>Upload PAN</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Other Documents" name="otherDocs">
                  <Upload>
                    <Button>Upload Documents</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </ModeFieldSet>
        </Form>
      </ModeCard>
    </div>
  );
}

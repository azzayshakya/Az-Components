import { useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Input, DatePicker, message } from "antd";
import dayjs from "dayjs";

export default function YearEntryTable({ data, setData }) {
  const [count, setCount] = useState(1);

  const addRow = () => {
    if (data.length >= 4) return message.error("You can only add 4 rows!");

    const newRow = {
      key: count,
      sno: count,
      year: "",
      subjects: "",
      marks: "",
      startDate: null,
      endDate: null,
    };

    setData([...data, newRow]);
    setCount(count + 1);
  };

  const updateRow = (value, key, field) => {
    const updated = data.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setData(updated);
  };

  const columns = [
    { title: "S.No", dataIndex: "sno", width: 70 },

    {
      title: "Year",
      dataIndex: "year",
      render: (_, record) => (
        <Input
          placeholder="Year"
          value={record.year}
          onChange={(e) => updateRow(e.target.value, record.key, "year")}
        />
      ),
    },

    {
      title: "Subjects",
      dataIndex: "subjects",
      render: (_, record) => (
        <Input
          placeholder="Subjects"
          value={record.subjects}
          onChange={(e) =>
            updateRow(e.target.value, record.key, "subjects")
          }
        />
      ),
    },

    {
      title: "Marks (%)",
      dataIndex: "marks",
      render: (_, record) => (
        <Input
          type="number"
          placeholder="Marks"
          value={record.marks}
          onChange={(e) =>
            updateRow(e.target.value, record.key, "marks")
          }
        />
      ),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (_, record) => (
        <DatePicker
          value={record.startDate ? dayjs(record.startDate) : null}
          onChange={(date) =>
            updateRow(
              date ? date.toISOString() : null,
              record.key,
              "startDate"
            )
          }
        />
      ),
    },

    {
      title: "End Date",
      dataIndex: "endDate",
      render: (_, record) => (
        <DatePicker
          value={record.endDate ? dayjs(record.endDate) : null}
          onChange={(date) =>
            updateRow(
              date ? date.toISOString() : null,
              record.key,
              "endDate"
            )
          }
        />
      ),
    },
  ];

  return (
    <div style={{ marginTop: 25 }}>
      <Button type="dashed" onClick={addRow} style={{ marginBottom: 10 }}>
        Add Year Data
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{
          background: "#fafafa",
          borderRadius: 8,
        }}
      />
    </div>
  );
}

YearEntryTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

import { Input, Table } from 'antd';
import PropTypes from 'prop-types';
export default function FamileDetails({ data, setData }) {
  const [count, setCount] = useState(1);
  const updateRow = () => {
    const newRow = {
      key: count,
      sno: count,
      year: '',
      subjects: '',
      marks: '',
      startDate: null,
      endDate: null,
    };

    setData([...data, newRow]);
    setCount(count + 1);
  };
  const column = [
    {
      title: '',
      dataIndex: '',
      render: (_, record) => {
        <Input
          placeholder="jdsfl"
          value={record.year}
          onChange={(e) => updateRow(e.target.value, record.key, 'year')}
        />;
      },
    },
  ];
  return (
    <div>
      <Table dataSource={data} pagination={false} columns={column} />
    </div>
  );
}
FamileDetails.prototype = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

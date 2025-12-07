import PropTypes from "prop-types";
import ModeTable from "./ModeTable";

export default function CrudTable({
  tableData,
  columns,
  paramObj,
  setParamObj,
  setRefreshCounter,
}) {
  const handleTableChange = (pagination) => {
    setParamObj((prev) => ({
      ...prev,
      limit: pagination.pageSize,
      offset: pagination.current - 1,
      total: pagination.total,
    }));

    setRefreshCounter((c) => c + 1);
  };

  return (
    <ModeTable
      size="small"
      dataSource={tableData}
      columns={columns}
      rowKey={(record) => record?.id || record?.aon}
      pagination={{
        current: paramObj.offset + 1,
        pageSize: paramObj.limit,
        total: tableData.length,
        showSizeChanger: true,
      }}
      onChange={handleTableChange}
    />
  );
}

CrudTable.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array,
  paramObj: PropTypes.object.isRequired,
  setParamObj: PropTypes.func.isRequired,
  setRefreshCounter: PropTypes.func.isRequired,
};

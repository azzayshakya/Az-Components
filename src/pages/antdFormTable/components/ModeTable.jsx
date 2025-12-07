import PropTypes from "prop-types";
import { Table } from "antd";

export default function ModeTable({
  columns,
  dataSource,
  styles = {},
  ...restProps
}) {
  const mergedStyles = {
    header: styles.header,
    body: styles.body,
    ...styles,
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      style={mergedStyles.body}
      {...restProps}
    />
  );
}

ModeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  styles: PropTypes.object,
};

import PropTypes from 'prop-types';
import { Table } from 'antd';

export default function ModeTable({
  columns,
  dataSource,
  styles = {},
  className = '',
  ...restProps
}) {
  const mergedStyles = {
    header: styles.header,
    body: styles.body,
    ...styles,
  };

  const tableClassName = `custom-antd-table ${className}`.trim();

  return (
    <div className={tableClassName}>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={mergedStyles.body}
        bordered={false}
        {...restProps}
      />
    </div>
  );
}

ModeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  styles: PropTypes.object,
  className: PropTypes.string,
};

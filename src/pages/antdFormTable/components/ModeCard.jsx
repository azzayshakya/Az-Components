import PropTypes from "prop-types";
import { Card } from "antd";

export default function ModeCard({ title, extra, styles = {}, children, ...restProps }) {
  return (
    <div>
      <Card
        title={title}
        extra={extra}
        styles={{
          header: styles.header,
          body: styles.body,
          actions: styles.actions,
          ...styles
        }}
        {...restProps}
      >
        {children}
      </Card>
    </div>
  );
}

ModeCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styles: PropTypes.object,
  children: PropTypes.node,
};

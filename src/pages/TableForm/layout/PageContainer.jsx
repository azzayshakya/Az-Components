import PropTypes from 'prop-types';

export default function PageContainer({ children, title }) {
  return (
    <div
      style={{
        padding: 40,
        minHeight: '100vh',
        background: '#f4f6f9',
      }}
    >
      <h2 style={{ marginBottom: 25, fontWeight: 600 }}>{title}</h2>

      <div
        style={{
          maxWidth: 950,
          margin: 'auto',
          background: 'white',
          padding: 30,
          borderRadius: 12,
          boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default function AdminFooterComponent({colorBgContainer}) {
  return (
    <div style={{
            textAlign: 'center',
            background: colorBgContainer,
            borderTop: '1px solid #f0f0f0',
          }}> Admin Panel ©{new Date().getFullYear()} | Professional Implementation</div>
  )
}

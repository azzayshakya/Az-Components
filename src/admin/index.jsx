import AdminMain from './AdminMain';
export default function index() {
  return (
    <>
      <AdminMain userRole="admin" userData={{ name: 'Ajay' }} />
    </>
  );
}

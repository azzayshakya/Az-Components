import { createRoot } from "react-dom/client";
import "./index.css";
import '../src/css/CustomTable.css'
import '../src/css/FieldSet.css'
import '../src/css/AntForm.css'


import App from "./App.jsx";
import AuthGate from "./admin/authContext/AdminGate";
import { AdminAuthProvider } from "./admin/authContext/auth";

createRoot(document.getElementById("root")).render(
     <AdminAuthProvider>
    <AuthGate>
      <App />
    </AuthGate>
  </AdminAuthProvider>
);

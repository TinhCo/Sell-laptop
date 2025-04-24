import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "@/pages/auth";
import ProtectedRoute from "@/rudex/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/sign-in" />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import { isAuthenticated } from "./lib/auth.ts";

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/dashboard'
        element={
          isAuthenticated() ? (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          ) : (
            <Navigate to='/login' />
          )
        }
      />
      <Route path='*' element={<Navigate to='/dashboard' />} />
    </Routes>
  );
};

export default App;

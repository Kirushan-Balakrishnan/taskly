import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { AuthProvider } from "./providers/AuthProvider";
import { Login } from "./screens/Login";
import { LayoutOnboarding, ProtectedRoute } from "./layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { TaskManager } from "./screens/TaskManager";
import { TaskProvider } from "./providers/TaskProvider";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route element={<LayoutOnboarding />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TaskManager />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

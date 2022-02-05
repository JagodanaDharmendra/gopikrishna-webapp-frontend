import { Routes, Route, Navigate } from "react-router-dom";
import {
  Layout,
  Login,
  Dashboard,
  Clients,
  Assessments,
  AssessmentsEdit,
  Users,
  ClientsEdit,
} from "../pages";
import { AuthProvider, OnAuth, RequireAuth } from "../pages/login/AuthProvide";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <OnAuth>
                <Login />
              </OnAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/edit/:client_id" element={<ClientsEdit />} />
            <Route path="assessments" element={<Assessments />} />
            <Route
              path="assessment/:client_id/:assessmentType/:version"
              element={<AssessmentsEdit />}
            />
            <Route path="users" element={<Users />} />
          </Route>

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

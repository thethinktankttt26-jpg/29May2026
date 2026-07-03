import ProtectedRoute from "../../../components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div
        style={{
          padding: 40,
        }}
      >
        <h1>Dashboard</h1>

        <p>Welcome to the AIPSA Admin Dashboard.</p>
      </div>
    </ProtectedRoute>
  );
}
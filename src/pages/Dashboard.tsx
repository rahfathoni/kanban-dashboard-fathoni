import { useStore } from "../store/useStore";

export default function Dashboard() {
  const { user, setUser } = useStore();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>User: {user || "No user logged in"}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setUser("Rahmat")}
      >
        Set User
      </button>
    </div>
  );
}

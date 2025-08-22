export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded"
          />
          <button className="bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

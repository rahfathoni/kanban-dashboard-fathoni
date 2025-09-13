import { Link } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function NotAvailable() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-2xl font-bold text-danger mb-6">
        Page Currently Not Available
      </h1>

      <Link
        to="/"
        className="flex items-center gap-3 text-primary hover:underline hover:text-primary/80 transition-colors"
      >
        <FaCircleArrowLeft className="text-lg" />
        <span className="text-lg font-semibold">Back to Dashboard</span>
      </Link>
    </div>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link href="/">
            Return to Dashboard
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth">
            Go to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
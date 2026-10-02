import { Link } from "react-router-dom";
import { Button, Input } from "@/components/ui";

export default function Login() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Welcome back</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Sign in to continue planning your trips.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Authentication lands in Phase 5.");
        }}
      >
        <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
        <Input label="Password" type="password" name="password" placeholder="••••••••" required />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-primary-600 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
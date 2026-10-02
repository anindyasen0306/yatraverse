import { Link } from "react-router-dom";
import { Button, Input } from "@/components/ui";

export default function Register() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Free forever. No credit card required.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Authentication lands in Phase 5.");
        }}
      >
        <Input label="Full name" name="name" placeholder="Priya Sharma" required />
        <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
        <Input label="Password" type="password" name="password" placeholder="At least 8 characters" required />
        <Input label="Confirm password" type="password" name="confirm" required />
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
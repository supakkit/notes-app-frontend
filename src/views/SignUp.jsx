import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { signupService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

const defaultSignupForm = {
  fullName: "",
  email: "",
  password: "",
};

export function SignUp() {
  const { setUser } = useAuth();
  const [checked, setChecked] = useState(false);
  const [signupForm, setSignupForm] = useState(defaultSignupForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await signupService(signupForm);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to signup:", err);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignupFormChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: String(e.target.value),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm h-fit">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-2xl">
            Create your account
          </CardTitle>
          {error && (
            <div className="bg-red-100 text-red-400 rounded-lg py-1 mt-2 text-center">
              {error}
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoFocus
                value={signupForm.fullName}
                onChange={handleSignupFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                required
                value={signupForm.email}
                onChange={handleSignupFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={checked ? "text" : "password"}
                required
                minLength="8"
                maxLength="16"
                value={signupForm.password}
                onChange={handleSignupFormChange}
              />
              <div className="flex gap-2">
                <Checkbox
                  id="showPassword"
                  checked={checked}
                  onCheckedChange={() => setChecked(checked ? false : true)}
                />
                <Label htmlFor="showPassword">Show password</Label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex-col gap-4">
          <CardDescription>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 cursor-pointer underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

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
import { loginService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { setUser } = useAuth();
  const [checked, setChecked] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService(loginForm);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: String(e.target.value),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-sm">
      <Card className="w-full max-w-sm h-fit">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-2xl">
            Login to your account
          </CardTitle>
          {error && (
            <div className="bg-red-100 text-red-400 rounded-lg py-1 mt-2 text-center">
              {error}
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleLogin} method="post">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                  required
                  autoFocus
                  value={loginForm.email}
                  onChange={handleLoginFormChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type={checked ? "text" : "password"}
                  required
                  minLength="8"
                  maxLength="16"
                  value={loginForm.password}
                  onChange={handleLoginFormChange}
                />
                <div className="flex gap-2">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => setChecked(checked ? false : true)}
                  />
                  <Label htmlFor="showPassword">Show password</Label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading} >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex-col gap-4">
          <CardDescription>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 cursor-pointer underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

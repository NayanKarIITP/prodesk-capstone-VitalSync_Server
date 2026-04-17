import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "patient">("patient");

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (role === "doctor") {
  //     navigate("/doctor-dashboard");
  //   } else {
  //     navigate("/patient-dashboard");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      // ✅ Store JWT
      localStorage.setItem("token", data.token);

      // ✅ Optional: store user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect based on role
      if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/20">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to VitalSync</h1>
          <p className="text-gray-600">Access your healthcare dashboard securely</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@vitalsync.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  required
                />
              </div>
            </div>

            {/* Role selector */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700">
                Login As
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                <Select value={role} onValueChange={(value: "doctor" | "patient") => setRole(value)}>
                  <SelectTrigger className="pl-11 h-12 bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
            >
              Login to Dashboard
            </Button>

            {/* Forgot password */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          {/* <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
            Sign up
          </a> */}
          <span
  className="text-blue-600 cursor-pointer"
  onClick={() => navigate("/register")}
>
  Sign up
</span>
        </p>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-500">
          © 2026 VitalSync. Healthcare made simple.
        </p>
      </div>
    </div>
  );
}

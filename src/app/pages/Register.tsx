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

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registered successfully!");

      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <Input
            placeholder="Full Name"
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <Input
            placeholder="Email"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          {/* Role */}
          <Select
            value={form.role}
            onValueChange={(val) => setForm({...form, role: val})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            {loading ? "Creating..." : "Register"}
          </Button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
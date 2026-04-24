


import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  User,
  LayoutDashboard,
  Search,
  Bell,
  LogOut,
  Clock,
  Users,
  ClipboardList,
  Send,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

interface Appointment {
  _id: string;
  patientName: string;
  time: string;
  [key: string]: any;
}

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(0);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [prescription, setPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    notes: ""
  });

  // 🔐 Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  // 📅 Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const API_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://prodesk-capstone-vitalsync.onrender.com";

        const res = await fetch(`${API_URL}/api/appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || ""
          }
        });

        const data = await res.json();
        setAppointments(data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
  }, []);

  // 💊 Send Prescription
  const handlePrescription = async (e: any) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || ""
        },
        body: JSON.stringify({
          ...prescription,
          patientId: appointments[selectedPatient]?._id
        })
      });

      alert("Prescription sent!");
    } catch {
      alert("Error sending prescription");
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: Users, label: "Patients", id: "patients" },
    { icon: User, label: "Profile", id: "profile" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600 border-green-200";
      case "in-progress":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">VitalSync</h1>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="m-4 text-red-500"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1">

        {/* Navbar */}
        <header className="bg-white p-4 flex justify-between">
          <Input placeholder="Search..." />

          <div className="flex items-center gap-4">

            {/* Availability */}
            <div className="flex items-center gap-2">
              <Label>{isAvailable ? "Available" : "Offline"}</Label>
              <Switch
                checked={isAvailable}
                onCheckedChange={async (val) => {
                  setIsAvailable(val);

                  await fetch("http://localhost:5000/api/availability", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token") || ""
                    },
                    body: JSON.stringify({ isAvailable: val })
                  });
                }}
              />
            </div>

            <Bell />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">

          <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

          {/* Appointments */}
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-4">Appointments</h2>

              {appointments.map((a: any, i: number) => (
                <div
                  key={i}
                  onClick={() => setSelectedPatient(i)}
                  className="p-2 border mb-2 cursor-pointer"
                >
                  {a.patientName || "Patient"} - {a.time}
                </div>
              ))}
            </div>

            {/* Prescription */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-4">Prescription</h2>

              <form onSubmit={handlePrescription} className="space-y-3">

                <Input
                  placeholder="Medication"
                  onChange={(e) =>
                    setPrescription({ ...prescription, medication: e.target.value })
                  }
                />

                <Input
                  placeholder="Dosage"
                  onChange={(e) =>
                    setPrescription({ ...prescription, dosage: e.target.value })
                  }
                />

                <Input
                  placeholder="Frequency"
                  onChange={(e) =>
                    setPrescription({ ...prescription, frequency: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Notes"
                  onChange={(e) =>
                    setPrescription({ ...prescription, notes: e.target.value })
                  }
                />

                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>

              </form>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

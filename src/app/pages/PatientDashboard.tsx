


import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  Bell,
  Activity,
  Pill,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://prodesk-capstone-vitalsync.onrender.com";

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  // 📅 Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${API_URL}/api/appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 👨‍⚕️ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/api/doctors`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || ""
        },
      });

      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // ✏️ EDIT
  const handleEdit = (appointment: any) => {
    navigate("/appointment-booking", {
      state: appointment,
    });
  };

  // 💳 Stripe
  const handlePayment = async () => {
    try {
      const res = await fetch(`${API_URL}/api/payment/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      const data = await res.json();
      window.location.href = data.url;
    } catch {
      alert("Payment failed");
    }
  };

  const stats = [
    { title: "Appointments", value: appointments.length, icon: Calendar },
    { title: "Prescriptions", value: "2", icon: Pill },
    { title: "Visits", value: "24", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="font-bold text-xl">VitalSync</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button>Dashboard</button>
          <button>Appointments</button>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="text-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white p-4 flex justify-between">
          <Input placeholder="Search..." />
          <Bell />
        </header>

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            Welcome back 👋
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <p className="text-xl font-bold">{s.value}</p>
                <p>{s.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">

            {/* Doctors */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-4">Available Doctors</h2>

              {doctors.length === 0 && (
                <p className="text-gray-500">No doctors found</p>
              )}

              {doctors.map((doc: any) => (
                <div key={doc._id} className="flex justify-between mb-2">
                  <span>{doc.name}</span>
                  <Badge>
                    {doc.isAvailable ? "online" : "offline"}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Appointments */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-4">Appointments</h2>

              {loading && <p>Loading...</p>}

              {!loading && appointments.length === 0 && (
                <p className="text-gray-500">No appointments yet</p>
              )}

              {!loading &&
                appointments.map((a: any) => (
                  <div
                    key={a._id}
                    className="mb-2 border p-2 flex justify-between items-center"
                  >
                    <span>
                      {a.doctorId?.name} - {a.date} - {a.time}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-500 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(a._id)}
                        className="text-red-500 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}

              <Button
                onClick={() => navigate("/appointment-booking")}
                className="mt-4"
              >
                Book Appointment
              </Button>

              <Button
                onClick={handlePayment}
                className="mt-2 bg-green-600 hover:bg-green-700"
              >
                Upgrade to Pro 💳
              </Button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 🔥 NEW: edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🌐 API URL
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://prodesk-capstone-vitalsync.onrender.com";

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  // 👨‍⚕️ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/api/doctors`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || ""
          }
        });

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

  // 🔥 LOAD DATA IF EDIT MODE
  useEffect(() => {
    if (location.state) {
      const a = location.state;

      setSelectedDoctor(a.doctorId?._id || a.doctorId);
      setSelectedDate(new Date(a.date));
      setSelectedTime(a.time);
      setEditingId(a._id);
    }
  }, []);

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","02:00 PM","02:30 PM",
    "03:00 PM","03:30 PM","04:00 PM","04:30 PM",
  ];

  // 🔥 CREATE + UPDATE
  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || selectedTime === null){
      alert("Please select all fields");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/api/appointments/${editingId}`
        : `${API_URL}/api/appointments`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` || ""
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          date: selectedDate.toISOString(),
          time: selectedTime
        })
      });

      if (!res.ok) {
        alert(editingId ? "Update failed" : "Booking failed");
        return;
      }

      alert(editingId ? "Appointment updated ✅" : "Appointment booked ✅");

      navigate("/patient-dashboard");

    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white p-6 flex justify-between">
        <button onClick={() => navigate("/patient-dashboard")}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">
          {editingId ? "Update Appointment" : "Book Appointment"}
        </h1>
      </header>

      <main className="p-6 grid grid-cols-2 gap-6">

        {/* Doctors */}
        <div>
          <h2 className="font-bold mb-4">Doctors</h2>

          {doctors.map((doc: any) => (
            <div
              key={doc._id}
              onClick={() => setSelectedDoctor(doc._id)}
              className={`p-4 border mb-2 cursor-pointer ${
                selectedDoctor === doc._id ? "border-blue-500" : ""
              }`}
            >
              {doc.name}
              <Badge>
                {doc.isAvailable ? "online" : "offline"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Date + Time */}
        <div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />

          <div className="grid grid-cols-3 gap-2 mt-4">
            {timeSlots.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(t)}
                className={`p-2 border ${
                  selectedTime === t ? "bg-blue-500 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button onClick={handleBooking} className="mt-4 w-full">
            {editingId ? "Update Appointment" : "Confirm Booking"}
          </Button>

        </div>

      </main>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router";
// import { ArrowLeft } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { Calendar } from "../components/ui/calendar";

// export default function AppointmentBooking() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   // 🔥 NEW: edit mode
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // 🌐 API URL
//   const API_URL =
//     window.location.hostname === "localhost"
//       ? "http://localhost:5000"
//       : "https://prodesk-capstone-vitalsync.onrender.com";

//   // 🔐 Protect route
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/login");
//   }, []);

//   // 👨‍⚕️ Fetch doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/doctors`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}` || ""
//           }
//         });

//         const data = await res.json();
//         setDoctors(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔥 LOAD DATA IF EDIT MODE
//   useEffect(() => {
//     if (location.state) {
//       const a = location.state;

//       setSelectedDoctor(a.doctorId?._id || a.doctorId);
//       setSelectedDate(new Date(a.date));
//       setSelectedTime(a.time);
//       setEditingId(a._id);
//     }
//   }, []);

//   const timeSlots = [
//     "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
//     "11:00 AM","11:30 AM","02:00 PM","02:30 PM",
//     "03:00 PM","03:30 PM","04:00 PM","04:30 PM",
//   ];

//   // 🔥 CREATE + UPDATE
//   const handleBooking = async () => {
//     if (!selectedDoctor || !selectedDate || selectedTime === null){
//       alert("Please select all fields");
//       return;
//     }

//     try {
//       const method = editingId ? "PUT" : "POST";
//       const url = editingId
//         ? `${API_URL}/api/appointments/${editingId}`
//         : `${API_URL}/api/appointments`;

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}` || ""
//         },
//         body: JSON.stringify({
//           doctorId: selectedDoctor,
//           date: selectedDate.toISOString(),
//           time: selectedTime
//         })
//       });

//       if (!res.ok) {
//         alert(editingId ? "Update failed" : "Booking failed");
//         return;
//       }

//       alert(editingId ? "Appointment updated ✅" : "Appointment booked ✅");

//       navigate("/patient-dashboard");

//     } catch {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Header */}
//       <header className="bg-white p-6 flex justify-between">
//         <button onClick={() => navigate("/patient-dashboard")}>
//           <ArrowLeft />
//         </button>
//         <h1 className="text-xl font-bold">
//           {editingId ? "Update Appointment" : "Book Appointment"}
//         </h1>
//       </header>

//       <main className="p-6 grid grid-cols-2 gap-6">

//         {/* Doctors */}
//         <div>
//           <h2 className="font-bold mb-4">Doctors</h2>

//           {doctors.map((doc: any) => (
//             <div
//               key={doc._id}
//               onClick={() => setSelectedDoctor(doc._id)}
//               className={`p-4 border mb-2 cursor-pointer ${
//                 selectedDoctor === doc._id ? "border-blue-500" : ""
//               }`}
//             >
//               {doc.name}
//               <Badge>
//                 {doc.isAvailable ? "online" : "offline"}
//               </Badge>
//             </div>
//           ))}
//         </div>

//         {/* Date + Time */}
//         <div>

//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//           />

//           <div className="grid grid-cols-3 gap-2 mt-4">
//             {timeSlots.map((t, i) => (
//               <button
//                 key={i}
//                 onClick={() => setSelectedTime(t)}
//                 className={`p-2 border ${
//                   selectedTime === t ? "bg-blue-500 text-white" : ""
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <Button onClick={handleBooking} className="mt-4 w-full">
//             {editingId ? "Update Appointment" : "Confirm Booking"}
//           </Button>

//         </div>

//       </main>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Stethoscope,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 🔥 Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🌐 API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔐 Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  // 👨‍⚕️ Fetch Doctors
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

  // ✏️ Load Edit Data
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
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  // 🔥 Create + Update Appointment
  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
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
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          date: selectedDate.toISOString(),
          time: selectedTime,
        }),
      });

      if (!res.ok) {
        alert(editingId ? "Update failed" : "Booking failed");
        return;
      }

      alert(
        editingId
          ? "Appointment updated ✅"
          : "Appointment booked ✅"
      );

      navigate("/patient-dashboard");

    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between">

        <button
          onClick={() => navigate("/patient-dashboard")}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-lg md:text-2xl font-bold text-gray-800 text-center">
          {editingId
            ? "Update Appointment"
            : "Book Appointment"}
        </h1>

        <div className="w-8" />

      </header>

      {/* Main */}
      <main className="p-4 md:p-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Doctors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Choose Doctor
              </h2>
            </div>

            {doctors.length === 0 && (
              <p className="text-gray-500">
                No doctors available
              </p>
            )}

            <div className="space-y-4">

              {doctors.map((doc: any) => (
                <div
                  key={doc._id}
                  onClick={() => setSelectedDoctor(doc._id)}
                  className={`
                    border rounded-2xl p-4 cursor-pointer transition
                    hover:shadow-md
                    ${
                      selectedDoctor === doc._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }
                  `}
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {doc.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Healthcare Specialist
                      </p>
                    </div>

                    <Badge
                      className={
                        doc.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {doc.isAvailable
                        ? "Online"
                        : "Offline"}
                    </Badge>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Calendar + Time */}
          <div className="space-y-6">

            {/* Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">
                <CalendarDays className="text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Select Date
                </h2>
              </div>

              <div className="overflow-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl border"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">
                <Clock className="text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Select Time
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                {timeSlots.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(t)}
                    className={`
                      py-3 rounded-xl border text-sm font-medium transition
                      ${
                        selectedTime === t
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:border-blue-400"
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}

              </div>

              {/* Button */}
              <Button
                onClick={handleBooking}
                className="w-full mt-6 rounded-xl py-6 text-base"
              >
                {editingId
                  ? "Update Appointment"
                  : "Confirm Booking"}
              </Button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
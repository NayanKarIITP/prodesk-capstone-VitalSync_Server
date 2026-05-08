


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import {
//   Calendar,
//   Bell,
//   Activity,
//   Pill,
// } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Badge } from "../components/ui/badge";

// export default function PatientDashboard() {
//   const navigate = useNavigate();

//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const API_URL =
//     window.location.hostname === "localhost"
//       ? "http://localhost:5000"
//       : "https://prodesk-capstone-vitalsync.onrender.com";

//   // 🔐 Protect route
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/login");
//   }, []);

//   // 📅 Fetch appointments
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/appointments`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}` || "",
//           },
//         });

//         const data = await res.json();
//         setAppointments(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // 👨‍⚕️ Fetch doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/doctors`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}` || "",
//           },
//         });

//         const data = await res.json();
//         setDoctors(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // ❌ DELETE
//   const handleDelete = async (id: string) => {
//     try {
//       await fetch(`${API_URL}/api/appointments/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}` || ""
//         },
//       });

//       setAppointments((prev) => prev.filter((a) => a._id !== id));
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   // ✏️ EDIT
//   const handleEdit = (appointment: any) => {
//     navigate("/appointment-booking", {
//       state: appointment,
//     });
//   };

//   // 💳 Stripe
//   const handlePayment = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/payment/checkout`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}` || "",
//         },
//       });

//       const data = await res.json();
//       window.location.href = data.url;
//     } catch {
//       alert("Payment failed");
//     }
//   };

//   const stats = [
//     { title: "Appointments", value: appointments.length, icon: Calendar },
//     { title: "Prescriptions", value: "2", icon: Pill },
//     { title: "Visits", value: "24", icon: Activity },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r flex flex-col">
//         <div className="p-6 border-b">
//           <h1 className="font-bold text-xl">VitalSync</h1>
//         </div>

//         <nav className="flex-1 p-4 space-y-2">
//           <button onClick={() => navigate("/")}>Dashboard</button>

//           <button onClick={() => navigate("/appointment-booking")}>
//             Appointments
//           </button>

//           {/* 🤖 AI FEATURE */}
//           <button
//             onClick={() => navigate("/ai")}
//             className="text-purple-600 font-semibold"
//           >
//             AI Assistant 🤖
//           </button>
//         </nav>
//         <div className="p-4 border-t">
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/login");
//             }}
//             className="text-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <header className="bg-white p-4 flex justify-between">
//           <Input placeholder="Search..." />
//           <Bell />
//         </header>

//         <main className="p-6">
//           <h1 className="text-2xl font-bold mb-6">
//             Welcome back 👋
//           </h1>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             {stats.map((s, i) => (
//               <div key={i} className="bg-white p-4 rounded shadow">
//                 <p className="text-xl font-bold">{s.value}</p>
//                 <p>{s.title}</p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2 gap-6">

//             {/* Doctors */}
//             <div className="bg-white p-4 rounded shadow">
//               <h2 className="font-bold mb-4">Available Doctors</h2>

//               {doctors.length === 0 && (
//                 <p className="text-gray-500">No doctors found</p>
//               )}

//               {doctors.map((doc: any) => (
//                 <div key={doc._id} className="flex justify-between mb-2">
//                   <span>{doc.name}</span>
//                   <Badge>
//                     {doc.isAvailable ? "online" : "offline"}
//                   </Badge>
//                 </div>
//               ))}
//             </div>

//             {/* Appointments */}
//             <div className="bg-white p-4 rounded shadow">
//               <h2 className="font-bold mb-4">Appointments</h2>

//               {loading && <p>Loading...</p>}

//               {!loading && appointments.length === 0 && (
//                 <p className="text-gray-500">No appointments yet</p>
//               )}

//               {!loading &&
//                 appointments.map((a: any) => (
//                   <div
//                     key={a._id}
//                     className="mb-2 border p-2 flex justify-between items-center"
//                   >
//                     <span>
//                       {a.doctorId?.name} - {a.date} - {a.time}
//                     </span>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(a)}
//                         className="text-blue-500 text-sm"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(a._id)}
//                         className="text-red-500 text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//               <Button
//                 onClick={() => navigate("/appointment-booking")}
//                 className="mt-4"
//               >
//                 Book Appointment
//               </Button>

//               <Button
//                 onClick={handlePayment}
//                 className="mt-2 bg-green-600 hover:bg-green-700"
//               >
//                 Upgrade to Pro 💳
//               </Button>
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  Bell,
  Activity,
  Pill,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const API_URL = import.meta.env.VITE_API_URL;
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

  // ❌ Delete Appointment
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // ✏️ Edit Appointment
  const handleEdit = (appointment: any) => {
    navigate("/appointment-booking", {
      state: appointment,
    });
  };

  // 💳 Stripe Payment
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
    {
      title: "Appointments",
      value: appointments.length,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Prescriptions",
      value: "2",
      icon: Pill,
      color: "text-green-600",
    },
    {
      title: "Visits",
      value: "24",
      icon: Activity,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-white border-r shadow-sm
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col justify-between
        `}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
              VitalSync
            </h1>

            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav */}
          <nav className="p-4 space-y-3">

            <button
              onClick={() => navigate("/patient-dashboard")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition font-medium"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/appointment-booking")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition font-medium"
            >
              Appointments
            </button>

            <button
              onClick={() => navigate("/ai")}
              className="w-full text-left px-4 py-3 rounded-xl bg-purple-50 text-purple-600 transition font-medium"
            >
              AI Assistant 🤖
            </button>

          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar */}
        <header className="bg-white px-4 md:px-8 py-4 shadow-sm flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <Input
              placeholder="Search..."
              className="w-44 md:w-72 rounded-xl"
            />
          </div>

          <div className="bg-gray-100 p-2 rounded-full">
            <Bell size={20} />
          </div>
        </header>

        {/* Dashboard */}
        <main className="p-4 md:p-8 overflow-hidden">

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your healthcare dashboard easily.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

            {stats.map((s, i) => {
              const Icon = s.icon;

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        {s.title}
                      </p>

                      <h2 className={`text-3xl font-bold mt-2 ${s.color}`}>
                        {s.value}
                      </h2>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-xl">
                      <Icon className={s.color} size={24} />
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Doctors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-6">
                <Stethoscope className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Available Doctors
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
                    className="border rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {doc.name}
                      </h3>

                      <p className="text-sm text-gray-500">
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
                      {doc.isAvailable ? "Online" : "Offline"}
                    </Badge>
                  </div>
                ))}

              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Upcoming Appointments
                </h2>
              </div>

              {loading && (
                <p className="text-gray-500">
                  Loading appointments...
                </p>
              )}

              {!loading && appointments.length === 0 && (
                <p className="text-gray-500">
                  No appointments yet
                </p>
              )}

              <div className="space-y-4">

                {!loading &&
                  appointments.map((a: any) => (
                    <div
                      key={a._id}
                      className="border rounded-2xl p-4 hover:shadow-md transition"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800">
                            {a.doctorId?.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1 break-words">
                            {a.date} • {a.time}
                          </p>
                        </div>

                        <div className="flex gap-3">

                          <button
                            onClick={() => handleEdit(a)}
                            className="text-blue-600 font-medium hover:underline text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(a._id)}
                            className="text-red-500 font-medium hover:underline text-sm"
                          >
                            Cancel
                          </button>

                        </div>
                      </div>
                    </div>
                  ))}

              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">

                <Button
                  onClick={() => navigate("/appointment-booking")}
                  className="w-full rounded-xl"
                >
                  Book Appointment
                </Button>

                <Button
                  onClick={handlePayment}
                  className="w-full rounded-xl bg-green-600 hover:bg-green-700"
                >
                  Upgrade to Pro 💳
                </Button>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
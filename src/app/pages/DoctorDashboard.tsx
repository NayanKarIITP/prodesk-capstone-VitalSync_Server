// import { useState } from "react";
// import { useNavigate } from "react-router";
// import {
//   Calendar,
//   FileText,
//   User,
//   LayoutDashboard,
//   Search,
//   Bell,
//   LogOut,
//   Clock,
//   Users,
//   ClipboardList,
//   Send,
// } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import { Badge } from "../components/ui/badge";
// import { Switch } from "../components/ui/switch";
// import { Label } from "../components/ui/label";

// export default function DoctorDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [selectedPatient, setSelectedPatient] = useState(0);

//   const stats = [
//     {
//       title: "Today's Appointments",
//       value: "8",
//       icon: Calendar,
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Total Patients",
//       value: "142",
//       icon: Users,
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//     {
//       title: "Pending Reviews",
//       value: "5",
//       icon: ClipboardList,
//       color: "text-orange-600",
//       bgColor: "bg-orange-50",
//     },
//   ];

//   const todayAppointments = [
//     {
//       patient: "Alice Johnson",
//       age: 32,
//       time: "09:00 AM",
//       status: "completed",
//       reason: "Regular Checkup",
//     },
//     {
//       patient: "Bob Smith",
//       age: 45,
//       time: "10:30 AM",
//       status: "in-progress",
//       reason: "Follow-up",
//     },
//     {
//       patient: "Carol Williams",
//       age: 28,
//       time: "11:00 AM",
//       status: "scheduled",
//       reason: "Consultation",
//     },
//     {
//       patient: "David Brown",
//       age: 56,
//       time: "02:00 PM",
//       status: "scheduled",
//       reason: "Annual Physical",
//     },
//     {
//       patient: "Emma Davis",
//       age: 41,
//       time: "03:30 PM",
//       status: "scheduled",
//       reason: "Lab Results",
//     },
//   ];

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
//     { icon: Calendar, label: "Appointments", id: "appointments" },
//     { icon: Users, label: "Patients", id: "patients" },
//     { icon: User, label: "Profile", id: "profile" },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-50 text-green-600 border-green-200";
//       case "in-progress":
//         return "bg-blue-50 text-blue-600 border-blue-200";
//       case "scheduled":
//         return "bg-gray-50 text-gray-600 border-gray-200";
//       default:
//         return "bg-gray-50 text-gray-600 border-gray-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </div>
//             <span className="font-bold text-xl text-gray-900">VitalSync</span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === item.id
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
//                   : "text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="p-4 border-t border-gray-200">
//           <button
//             onClick={() => navigate("/")}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">
//         {/* Top navbar */}
//         <header className="bg-white border-b border-gray-200 px-8 py-4">
//           <div className="flex items-center justify-between">
//             {/* Search */}
//             <div className="relative w-96">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search patients, appointments..."
//                 className="pl-11 bg-gray-50 border-gray-200"
//               />
//             </div>

//             {/* Right side */}
//             <div className="flex items-center gap-4">
//               {/* Availability toggle */}
//               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
//                 <Label htmlFor="availability" className="text-sm font-medium cursor-pointer">
//                   {isAvailable ? "Available" : "Offline"}
//                 </Label>
//                 <Switch
//                   id="availability"
//                   checked={isAvailable}
//                   onCheckedChange={setIsAvailable}
//                 />
//               </div>

//               <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-all">
//                 <Bell className="w-6 h-6 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//                 <Avatar className="w-10 h-10">
//                   <AvatarFallback className="bg-blue-100 text-blue-600">SJ</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium text-sm text-gray-900">Dr. Sarah Johnson</p>
//                   <p className="text-xs text-gray-500">Cardiologist</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard content */}
//         <main className="flex-1 p-8 overflow-y-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Dr. Johnson!</h1>
//             <p className="text-gray-600">You have 8 appointments scheduled for today.</p>
//           </div>

//           {/* Stats cards */}
//           <div className="grid grid-cols-3 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 transition-all"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
//                     <stat.icon className={`w-6 h-6 ${stat.color}`} />
//                   </div>
//                 </div>
//                 <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                 <p className="text-gray-600">{stat.title}</p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             {/* Today's appointments */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
//                 <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
//                   {todayAppointments.length} Total
//                 </Badge>
//               </div>

//               <div className="space-y-3 max-h-[500px] overflow-y-auto">
//                 {todayAppointments.map((appointment, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedPatient(index)}
//                     className={`w-full text-left p-4 rounded-xl border transition-all ${
//                       selectedPatient === index
//                         ? "border-blue-600 bg-blue-50"
//                         : "border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="w-10 h-10">
//                           <AvatarFallback className="bg-gray-100 text-gray-600">
//                             {appointment.patient
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium text-gray-900">{appointment.patient}</p>
//                           <p className="text-sm text-gray-500">{appointment.age} years old</p>
//                         </div>
//                       </div>
//                       <Badge variant="secondary" className={getStatusColor(appointment.status)}>
//                         {appointment.status}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-4 text-sm text-gray-600 ml-[52px]">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{appointment.time}</span>
//                       </div>
//                       <span>•</span>
//                       <span>{appointment.reason}</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Patient details and prescription */}
//             <div className="space-y-6">
//               {/* Patient details */}
//               <div className="bg-white rounded-2xl p-6 border border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Patient Details</h2>

//                 <div className="flex items-start gap-4 mb-6">
//                   <Avatar className="w-16 h-16">
//                     <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
//                       {todayAppointments[selectedPatient].patient
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-lg">
//                       {todayAppointments[selectedPatient].patient}
//                     </h3>
//                     <p className="text-gray-500 mb-2">
//                       {todayAppointments[selectedPatient].age} years old
//                     </p>
//                     <div className="flex gap-2">
//                       <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
//                         {todayAppointments[selectedPatient].time}
//                       </Badge>
//                       <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200">
//                         {todayAppointments[selectedPatient].reason}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
//                   <div>
//                     <p className="text-sm text-gray-500">Blood Type</p>
//                     <p className="font-medium text-gray-900">O+</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Allergies</p>
//                     <p className="font-medium text-gray-900">None</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Last Visit</p>
//                     <p className="font-medium text-gray-900">Mar 15, 2026</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Conditions</p>
//                     <p className="font-medium text-gray-900">None</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Prescription form */}
//               <div className="bg-white rounded-2xl p-6 border border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Write Prescription</h2>

//                 <form className="space-y-4">
//                   <div>
//                     <Label htmlFor="medication">Medication</Label>
//                     <Input
//                       id="medication"
//                       placeholder="Enter medication name"
//                       className="mt-1 bg-gray-50 border-gray-200"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="dosage">Dosage</Label>
//                       <Input
//                         id="dosage"
//                         placeholder="e.g., 500mg"
//                         className="mt-1 bg-gray-50 border-gray-200"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="frequency">Frequency</Label>
//                       <Input
//                         id="frequency"
//                         placeholder="e.g., Twice daily"
//                         className="mt-1 bg-gray-50 border-gray-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="notes">Notes</Label>
//                     <Textarea
//                       id="notes"
//                       placeholder="Additional instructions for the patient..."
//                       className="mt-1 bg-gray-50 border-gray-200 min-h-[100px]"
//                     />
//                   </div>

//                   <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                     <Send className="w-4 h-4 mr-2" />
//                     Send Prescription
//                   </Button>
//                 </form>
//               </div>
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
            Authorization: localStorage.getItem("token") || ""
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

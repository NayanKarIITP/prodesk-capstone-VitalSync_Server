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
//   Activity,
//   Pill,
//   Plus,
// } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { Badge } from "../components/ui/badge";

// export default function PatientDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const stats = [
//     {
//       title: "Upcoming Appointments",
//       value: "3",
//       icon: Calendar,
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Active Prescriptions",
//       value: "2",
//       icon: Pill,
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//     {
//       title: "Total Visits",
//       value: "24",
//       icon: Activity,
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//   ];

//   const doctors = [
//     {
//       name: "Dr. Sarah Johnson",
//       specialty: "Cardiologist",
//       status: "online",
//       image: null,
//     },
//     {
//       name: "Dr. Michael Chen",
//       specialty: "General Physician",
//       status: "online",
//       image: null,
//     },
//     {
//       name: "Dr. Emily Brown",
//       specialty: "Dermatologist",
//       status: "offline",
//       image: null,
//     },
//     {
//       name: "Dr. James Wilson",
//       specialty: "Pediatrician",
//       status: "online",
//       image: null,
//     },
//   ];

//   const appointments = [
//     {
//       doctor: "Dr. Sarah Johnson",
//       specialty: "Cardiologist",
//       date: "Apr 12, 2026",
//       time: "10:00 AM",
//     },
//     {
//       doctor: "Dr. Michael Chen",
//       specialty: "General Physician",
//       date: "Apr 15, 2026",
//       time: "2:30 PM",
//     },
//     {
//       doctor: "Dr. Emily Brown",
//       specialty: "Dermatologist",
//       date: "Apr 18, 2026",
//       time: "11:00 AM",
//     },
//   ];

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
//     { icon: Calendar, label: "Appointments", id: "appointments" },
//     { icon: FileText, label: "Medical History", id: "history" },
//     { icon: User, label: "Profile", id: "profile" },
//   ];

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
//                 placeholder="Search doctors, appointments..."
//                 className="pl-11 bg-gray-50 border-gray-200"
//               />
//             </div>

//             {/* Right side */}
//             <div className="flex items-center gap-4">
//               <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-all">
//                 <Bell className="w-6 h-6 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//                 <Avatar className="w-10 h-10">
//                   <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium text-sm text-gray-900">John Doe</p>
//                   <p className="text-xs text-gray-500">Patient</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard content */}
//         <main className="flex-1 p-8 overflow-y-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
//             <p className="text-gray-600">Here's what's happening with your health today.</p>
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
//             {/* Doctor availability */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Available Doctors</h2>
//                 <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-200">
//                   {doctors.filter((d) => d.status === "online").length} Online
//                 </Badge>
//               </div>

//               <div className="space-y-4">
//                 {doctors.map((doctor, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Avatar className="w-12 h-12">
//                         <AvatarFallback className="bg-blue-100 text-blue-600">
//                           {doctor.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium text-gray-900">{doctor.name}</p>
//                         <p className="text-sm text-gray-500">{doctor.specialty}</p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant={doctor.status === "online" ? "default" : "secondary"}
//                       className={
//                         doctor.status === "online"
//                           ? "bg-green-50 text-green-600 border-green-200"
//                           : "bg-gray-100 text-gray-600 border-gray-200"
//                       }
//                     >
//                       {doctor.status}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Upcoming appointments */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
//                 <Button
//                   onClick={() => navigate("/appointment-booking")}
//                   size="sm"
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Book New
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 {appointments.map((appointment, index) => (
//                   <div
//                     key={index}
//                     className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <p className="font-medium text-gray-900">{appointment.doctor}</p>
//                         <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{appointment.date}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{appointment.time}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div className="mt-6">
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-2">Need to see a doctor?</h3>
//                   <p className="text-blue-100 mb-4">
//                     Book an appointment with our specialist doctors today.
//                   </p>
//                   <Button
//                     onClick={() => navigate("/appointment-booking")}
//                     className="bg-white text-blue-600 hover:bg-blue-50"
//                   >
//                     Book Appointment
//                   </Button>
//                 </div>
//                 <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Calendar className="w-16 h-16" />
//                 </div>
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
  FileText,
  User,
  LayoutDashboard,
  Search,
  Bell,
  LogOut,
  Clock,
  Activity,
  Pill,
  Plus,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 📅 Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments", {
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

  // 👨‍⚕️ Fetch doctors (availability)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors", {
          headers: {
            Authorization: localStorage.getItem("token") || ""
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

  // 📊 Dynamic stats
  const stats = [
    {
      title: "Upcoming Appointments",
      value: appointments.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Prescriptions",
      value: "2",
      icon: Pill,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Visits",
      value: "24",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: FileText, label: "Medical History", id: "history" },
    { icon: User, label: "Profile", id: "profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="font-bold text-xl">VitalSync</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
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

        {/* Logout */}
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

        {/* Content */}
        <main className="p-6">

          <h1 className="text-2xl font-bold mb-6">
            Welcome back!
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

              {doctors.map((doc: any, i: number) => (
                <div key={i} className="flex justify-between mb-2">
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

              {appointments.map((a: any, i: number) => (
                <div key={i} className="mb-2 border p-2">
                  {a.doctorName || "Doctor"} - {a.date} - {a.time}
                </div>
              ))}

              <Button
                onClick={() => navigate("/appointment-booking")}
                className="mt-4"
              >
                Book Appointment
              </Button>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
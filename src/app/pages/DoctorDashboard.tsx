// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";

// import {
//   Calendar,
//   LayoutDashboard,
//   Bell,
//   Users,
//   User,
//   Send,
//   Menu,
//   X,
//   Activity,
//   Clock,
// } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Badge } from "../components/ui/badge";
// import { Switch } from "../components/ui/switch";
// import { Label } from "../components/ui/label";

// interface Appointment {
//   _id: string;
//   patientName: string;
//   time: string;
//   date?: string;
//   [key: string]: any;
// }

// export default function DoctorDashboard() {

//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [selectedPatient, setSelectedPatient] = useState(0);

//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [prescription, setPrescription] = useState({
//     medication: "",
//     dosage: "",
//     frequency: "",
//     notes: "",
//   });

//   const API_URL = import.meta.env.VITE_API_URL;

//   // 🔐 Protect Route
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//     }
//   }, []);

//   // 📅 Fetch Appointments
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/appointments`, {
//           headers: {
//             Authorization:
//               `Bearer ${localStorage.getItem("token")}` || "",
//           },
//         });

//         const data = await res.json();
//         setAppointments(data);

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // 💊 Send Prescription
//   const handlePrescription = async (e: any) => {
//     e.preventDefault();

//     try {

//       await fetch(`${API_URL}/api/prescriptions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             `Bearer ${localStorage.getItem("token")}` || "",
//         },
//         body: JSON.stringify({
//           ...prescription,
//           patientId: appointments[selectedPatient]?._id,
//         }),
//       });

//       alert("Prescription sent successfully ✅");

//       setPrescription({
//         medication: "",
//         dosage: "",
//         frequency: "",
//         notes: "",
//       });

//     } catch {
//       alert("Error sending prescription");
//     }
//   };

//   // 🟢 Availability Toggle
//   const handleAvailability = async (val: boolean) => {
//     setIsAvailable(val);

//     try {

//       await fetch(`${API_URL}/api/availability`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             `Bearer ${localStorage.getItem("token")}` || "",
//         },
//         body: JSON.stringify({
//           isAvailable: val,
//         }),
//       });

//     } catch {
//       alert("Availability update failed");
//     }
//   };

//   const menuItems = [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       id: "dashboard",
//     },
//     {
//       icon: Calendar,
//       label: "Appointments",
//       id: "appointments",
//     },
//     {
//       icon: Users,
//       label: "Patients",
//       id: "patients",
//     },
//     {
//       icon: User,
//       label: "Profile",
//       id: "profile",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex">

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed md:static top-0 left-0 z-50
//           h-screen w-64 bg-white border-r shadow-sm
//           transform transition-transform duration-300
//           ${sidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full"}
//           md:translate-x-0
//           flex flex-col justify-between
//         `}
//       >

//         <div>

//           {/* Logo */}
//           <div className="p-6 border-b flex items-center justify-between">

//             <h1 className="text-2xl font-bold text-blue-600">
//               VitalSync
//             </h1>

//             <button
//               className="md:hidden"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <X size={22} />
//             </button>

//           </div>

//           {/* Menu */}
//           <nav className="p-4 space-y-3">

//             {menuItems.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`
//                     w-full flex items-center gap-3
//                     px-4 py-3 rounded-xl transition font-medium
//                     ${
//                       activeTab === item.id
//                         ? "bg-blue-50 text-blue-600"
//                         : "hover:bg-gray-100"
//                     }
//                   `}
//                 >

//                   <Icon size={18} />

//                   {item.label}

//                 </button>
//               );
//             })}

//           </nav>
//         </div>

//         {/* Logout */}
//         <div className="p-4 border-t">

//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/login");
//             }}
//             className="w-full py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition font-medium"
//           >
//             Logout
//           </button>

//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0">

//         {/* Navbar */}
//         <header className="bg-white px-4 md:px-8 py-4 shadow-sm flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <button
//               className="md:hidden"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu size={24} />
//             </button>

//             <Input
//               placeholder="Search patients..."
//               className="w-44 md:w-72 rounded-xl"
//             />

//           </div>

//           <div className="flex items-center gap-4">

//             {/* Availability */}
//             <div className="hidden sm:flex items-center gap-2">

//               <Label className="font-medium">
//                 {isAvailable
//                   ? "Available"
//                   : "Offline"}
//               </Label>

//               <Switch
//                 checked={isAvailable}
//                 onCheckedChange={handleAvailability}
//               />

//             </div>

//             {/* Bell */}
//             <div className="bg-gray-100 p-2 rounded-full">
//               <Bell size={20} />
//             </div>

//           </div>
//         </header>

//         {/* Content */}
//         <main className="p-4 md:p-8 overflow-hidden">

//           {/* Welcome */}
//           <div className="mb-8">

//             <h1 className="text-3xl font-bold text-gray-800">
//               Doctor Dashboard 👨‍⚕️
//             </h1>

//             <p className="text-gray-500 mt-1">
//               Manage appointments and prescriptions efficiently.
//             </p>

//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

//             <div className="bg-white rounded-2xl p-6 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Total Appointments
//                   </p>

//                   <h2 className="text-3xl font-bold mt-2 text-blue-600">
//                     {appointments.length}
//                   </h2>
//                 </div>

//                 <div className="bg-blue-50 p-3 rounded-xl">
//                   <Calendar className="text-blue-600" />
//                 </div>

//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Patients
//                   </p>

//                   <h2 className="text-3xl font-bold mt-2 text-green-600">
//                     {appointments.length}
//                   </h2>
//                 </div>

//                 <div className="bg-green-50 p-3 rounded-xl">
//                   <Users className="text-green-600" />
//                 </div>

//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Status
//                   </p>

//                   <h2 className="text-2xl font-bold mt-2 text-purple-600">
//                     {isAvailable
//                       ? "Online"
//                       : "Offline"}
//                   </h2>
//                 </div>

//                 <div className="bg-purple-50 p-3 rounded-xl">
//                   <Activity className="text-purple-600" />
//                 </div>

//               </div>
//             </div>

//           </div>

//           {/* Main Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

//             {/* Appointments */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm">

//               <div className="flex items-center gap-2 mb-6">

//                 <Calendar className="text-blue-600" />

//                 <h2 className="text-xl font-bold text-gray-800">
//                   Appointments
//                 </h2>

//               </div>

//               {appointments.length === 0 && (
//                 <p className="text-gray-500">
//                   No appointments yet
//                 </p>
//               )}

//               <div className="space-y-4">

//                 {appointments.map((a: any, i: number) => (

//                   <div
//                     key={i}
//                     onClick={() => setSelectedPatient(i)}
//                     className={`
//                       border rounded-2xl p-4 cursor-pointer transition
//                       hover:shadow-md
//                       ${
//                         selectedPatient === i
//                           ? "border-blue-600 bg-blue-50"
//                           : "border-gray-200"
//                       }
//                     `}
//                   >

//                     <div className="flex items-center justify-between">

//                       <div>

//                         <h3 className="font-semibold text-gray-800">
//                           {a.patientName || "Patient"}
//                         </h3>

//                         <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">

//                           <Clock size={14} />

//                           <span>
//                             {a.date || "Today"} • {a.time}
//                           </span>

//                         </div>

//                       </div>

//                       <Badge className="bg-green-100 text-green-700">
//                         Scheduled
//                       </Badge>

//                     </div>
//                   </div>
//                 ))}

//               </div>
//             </div>

//             {/* Prescription */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm">

//               <div className="flex items-center gap-2 mb-6">

//                 <Send className="text-green-600" />

//                 <h2 className="text-xl font-bold text-gray-800">
//                   Send Prescription
//                 </h2>

//               </div>

//               <form
//                 onSubmit={handlePrescription}
//                 className="space-y-4"
//               >

//                 <Input
//                   placeholder="Medication"
//                   value={prescription.medication}
//                   onChange={(e) =>
//                     setPrescription({
//                       ...prescription,
//                       medication: e.target.value,
//                     })
//                   }
//                   className="rounded-xl"
//                 />

//                 <Input
//                   placeholder="Dosage"
//                   value={prescription.dosage}
//                   onChange={(e) =>
//                     setPrescription({
//                       ...prescription,
//                       dosage: e.target.value,
//                     })
//                   }
//                   className="rounded-xl"
//                 />

//                 <Input
//                   placeholder="Frequency"
//                   value={prescription.frequency}
//                   onChange={(e) =>
//                     setPrescription({
//                       ...prescription,
//                       frequency: e.target.value,
//                     })
//                   }
//                   className="rounded-xl"
//                 />

//                 <Textarea
//                   placeholder="Additional Notes"
//                   value={prescription.notes}
//                   onChange={(e) =>
//                     setPrescription({
//                       ...prescription,
//                       notes: e.target.value,
//                     })
//                   }
//                   className="rounded-xl min-h-[120px]"
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full rounded-xl py-6"
//                 >

//                   <Send className="w-4 h-4 mr-2" />

//                   Send Prescription

//                 </Button>

//               </form>
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
  LayoutDashboard,
  Bell,
  Users,
  User,
  Menu,
  X,
} from "lucide-react";

import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

interface Appointment {
  _id: string;

  patientId?: {
    _id: string;
    name: string;
    email?: string;
  };

  doctorId?: {
    _id: string;
    name: string;
    specialization?: string;
  };

  date: string;
  time: string;
  status?: string;
}

interface DoctorProfile {
  _id: string;
  name: string;
  email: string;
  specialization?: string;
  isAvailable?: boolean;
}

export default function DoctorDashboard() {

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [doctorProfile, setDoctorProfile] =
    useState<DoctorProfile | null>(null);

  const [isAvailable, setIsAvailable] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState(0);

  const [loading, setLoading] = useState(true);

  // 🔐 Protect Route
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

  }, []);

  // 👨‍⚕️ Fetch Doctor Profile
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await fetch(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        setDoctorProfile(data);

        setIsAvailable(
          data?.isAvailable || false
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();

  }, []);

  // 📅 Fetch Appointments
  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const res = await fetch(
          `${API_URL}/api/appointments`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

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

  // 🟢 Availability
  const handleAvailability = async (
    val: boolean
  ) => {

    setIsAvailable(val);

    try {

      await fetch(
        `${API_URL}/api/availability`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            isAvailable: val,
          }),
        }
      );

    } catch {
      alert("Availability update failed");
    }
  };

  // 👥 Total Patients
  const totalPatients = new Set(
    appointments.map(
      (a) => a.patientId?._id
    )
  ).size;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          w-[280px] sm:w-72
          bg-white border-r shadow-xl
          transition-transform duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          md:translate-x-0 md:static
          flex flex-col justify-between
        `}
      >

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="p-5 border-b flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold text-blue-600">
                VitalSync
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Doctor Panel
              </p>

            </div>

            <button
              className="md:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <X size={22} />
            </button>

          </div>

          {/* Doctor Card */}
          <div className="p-5 border-b">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {doctorProfile?.name?.charAt(0)}
                </div>

                <div className="min-w-0">

                  <h2 className="font-semibold text-gray-800 truncate">
                    Dr. {doctorProfile?.name}
                  </h2>

                  <p className="text-sm text-gray-500 truncate">
                    {doctorProfile?.specialization || "Doctor"}
                  </p>

                </div>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">

            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: LayoutDashboard,
              },

              {
                id: "appointments",
                label: "Appointments",
                icon: Calendar,
              },

              {
                id: "patients",
                label: "Patients",
                icon: Users,
              },

              {
                id: "profile",
                label: "Profile",
                icon: User,
              },

            ].map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.id}

                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}

                  className={`
                    w-full flex items-center gap-3
                    px-4 py-3 rounded-2xl
                    transition-all duration-200
                    font-medium text-left
                    ${activeTab === item.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >

                  <Icon size={20} />

                  <span>{item.label}</span>

                </button>
              );
            })}

          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}

            className="
              w-full py-3 rounded-2xl
              bg-red-50 text-red-500
              hover:bg-red-100
              transition font-semibold
            "
          >
            Logout
          </button>

        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar */}
        <header className="bg-white px-4 md:px-8 py-4 shadow-sm flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Search */}
            <Input
              placeholder="Search appointments..."
              className="w-44 md:w-72 rounded-xl"
            />

          </div>

          <div className="flex items-center gap-4">

            {/* Availability */}
            <div className="hidden sm:flex items-center gap-2">

              <Label>
                {isAvailable
                  ? "Available"
                  : "Offline"}
              </Label>

              <Switch
                checked={isAvailable}
                onCheckedChange={handleAvailability}
              />

            </div>

            {/* Notification */}
            <div className="bg-gray-100 p-2 rounded-full">
              <Bell size={20} />
            </div>

          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-8 overflow-hidden">

          {/* ================= DASHBOARD ================= */}

          {activeTab === "dashboard" && (

            <>
              {/* Welcome */}
              <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome Dr. {doctorProfile?.name} 👨‍⚕️
                </h1>

                <p className="text-gray-500 mt-2">
                  Manage appointments and patient care.
                </p>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {/* Appointments */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">

                  <p className="text-gray-500">
                    Total Appointments
                  </p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {appointments.length}
                  </h2>

                </div>

                {/* Patients */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">

                  <p className="text-gray-500">
                    Total Patients
                  </p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    {totalPatients}
                  </h2>

                </div>

                {/* Availability */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">

                  <p className="text-gray-500">
                    Availability
                  </p>

                  <h2 className="text-3xl font-bold text-purple-600 mt-2">
                    {isAvailable
                      ? "Online"
                      : "Offline"}
                  </h2>

                </div>

              </div>
            </>
          )}

          {/* ================= APPOINTMENTS ================= */}

          {activeTab === "appointments" && (

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Appointments
                </h2>

                <Badge>
                  {appointments.length}
                </Badge>

              </div>

              {/* Loading */}
              {loading && (
                <p className="text-gray-500">
                  Loading appointments...
                </p>
              )}

              {/* Empty */}
              {!loading &&
                appointments.length === 0 && (
                  <p className="text-gray-500">
                    No appointments yet
                  </p>
                )}

              {/* Appointment Cards */}
              <div className="space-y-4">

                {appointments.map((a, i) => (

                  <div
                    key={a._id}

                    onClick={() =>
                      setSelectedPatient(i)
                    }

                    className={`
                      border rounded-2xl p-4 cursor-pointer
                      transition hover:shadow-md
                      ${selectedPatient === i
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                      }
                    `}
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-lg text-gray-800">
                          {a.patientId?.name || "Patient"}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          {new Date(
                            a.date
                          ).toLocaleDateString()}
                          {" • "}
                          {a.time}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {a.patientId?.email}
                        </p>

                      </div>

                      <Badge className="w-fit">
                        {a.status || "Scheduled"}
                      </Badge>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          )}

          {/* ================= PATIENTS ================= */}

          {activeTab === "patients" && (

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Patients
                </h2>

                <Badge>
                  {totalPatients}
                </Badge>

              </div>

              <div className="space-y-4">

                {appointments.map((a) => (

                  <div
                    key={a._id}
                    className="border rounded-2xl p-4 hover:shadow-sm transition"
                  >

                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {a.patientId?.name?.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>

                        <h3 className="font-semibold text-lg text-gray-800">
                          {a.patientId?.name}
                        </h3>

                        <p className="text-gray-500">
                          {a.patientId?.email}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          )}

          {/* ================= PROFILE ================= */}

          {activeTab === "profile" && (

            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl">

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  {doctorProfile?.name?.charAt(0)}
                </div>

                {/* Info */}
                <div>

                  <h2 className="text-3xl font-bold text-gray-800">
                    Dr. {doctorProfile?.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {doctorProfile?.specialization || "Doctor"}
                  </p>

                  <Badge className="mt-3">
                    {isAvailable
                      ? "Available"
                      : "Offline"}
                  </Badge>

                </div>

              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    Dr. {doctorProfile?.name}
                  </h3>

                </div>

                {/* Email */}
                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-2 break-all">
                    {doctorProfile?.email}
                  </h3>

                </div>

                {/* Specialization */}
                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Specialization
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {doctorProfile?.specialization || "General Doctor"}
                  </h3>

                </div>

                {/* Appointments */}
                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Total Appointments
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {appointments.length}
                  </h3>

                </div>

              </div>

              {/* Availability Toggle */}
              <div className="mt-8 bg-blue-50 rounded-2xl p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Availability Status
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Toggle your online/offline status
                    </p>

                  </div>

                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleAvailability}
                  />

                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
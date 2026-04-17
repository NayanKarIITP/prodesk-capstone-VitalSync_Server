// import { useState } from "react";
// import { useNavigate } from "react-router";
// import {
//   ArrowLeft,
//   Calendar as CalendarIcon,
//   Clock,
//   MapPin,
//   Star,
//   Check,
// } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import { Badge } from "../components/ui/badge";
// import { Calendar } from "../components/ui/calendar";

// export default function AppointmentBooking() {
//   const navigate = useNavigate();
//   const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   const doctors = [
//     {
//       name: "Dr. Sarah Johnson",
//       specialty: "Cardiologist",
//       experience: "15 years",
//       rating: 4.9,
//       reviews: 234,
//       status: "online",
//       location: "VitalSync Medical Center",
//       fee: "$150",
//     },
//     {
//       name: "Dr. Michael Chen",
//       specialty: "General Physician",
//       experience: "12 years",
//       rating: 4.8,
//       reviews: 189,
//       status: "online",
//       location: "VitalSync Clinic",
//       fee: "$100",
//     },
//     {
//       name: "Dr. Emily Brown",
//       specialty: "Dermatologist",
//       experience: "10 years",
//       rating: 4.7,
//       reviews: 156,
//       status: "offline",
//       location: "VitalSync Skin Care",
//       fee: "$120",
//     },
//     {
//       name: "Dr. James Wilson",
//       specialty: "Pediatrician",
//       experience: "18 years",
//       rating: 4.9,
//       reviews: 298,
//       status: "online",
//       location: "VitalSync Children's Care",
//       fee: "$130",
//     },
//     {
//       name: "Dr. Lisa Martinez",
//       specialty: "Neurologist",
//       experience: "14 years",
//       rating: 4.8,
//       reviews: 201,
//       status: "online",
//       location: "VitalSync Neuro Center",
//       fee: "$180",
//     },
//     {
//       name: "Dr. David Lee",
//       specialty: "Orthopedic",
//       experience: "16 years",
//       rating: 4.9,
//       reviews: 267,
//       status: "online",
//       location: "VitalSync Orthopedic",
//       fee: "$160",
//     },
//   ];

//   const timeSlots = [
//     "09:00 AM",
//     "09:30 AM",
//     "10:00 AM",
//     "10:30 AM",
//     "11:00 AM",
//     "11:30 AM",
//     "02:00 PM",
//     "02:30 PM",
//     "03:00 PM",
//     "03:30 PM",
//     "04:00 PM",
//     "04:30 PM",
//   ];

//   const handleBooking = () => {
//     if (selectedDoctor !== null && selectedDate && selectedTime) {
//       // Handle booking logic
//       alert("Appointment booked successfully!");
//       navigate("/patient-dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-8 py-6">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate("/patient-dashboard")}
//               className="p-2 rounded-xl hover:bg-gray-50 transition-all"
//             >
//               <ArrowLeft className="w-6 h-6 text-gray-600" />
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
//               <p className="text-gray-600">Choose a doctor and select your preferred time</p>
//             </div>
//           </div>

//           {/* Logo */}
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
//       </header>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto p-8">
//         <div className="grid grid-cols-2 gap-8">
//           {/* Left side - Doctor list */}
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">Available Doctors</h2>
//               <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-200">
//                 {doctors.filter((d) => d.status === "online").length} Online
//               </Badge>
//             </div>

//             <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
//               {doctors.map((doctor, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedDoctor(index)}
//                   className={`w-full text-left bg-white rounded-2xl p-6 border transition-all ${
//                     selectedDoctor === index
//                       ? "border-blue-600 shadow-lg shadow-blue-600/10"
//                       : "border-gray-200 hover:border-blue-300 hover:shadow-md"
//                   }`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <Avatar className="w-16 h-16">
//                       <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
//                         {doctor.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="font-bold text-gray-900 text-lg">{doctor.name}</h3>
//                           <p className="text-gray-600">{doctor.specialty}</p>
//                         </div>
//                         {selectedDoctor === index && (
//                           <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                             <Check className="w-4 h-4 text-white" />
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                           <span className="font-medium">{doctor.rating}</span>
//                           <span>({doctor.reviews})</span>
//                         </div>
//                         <span>•</span>
//                         <span>{doctor.experience} exp.</span>
//                       </div>

//                       <div className="flex items-center gap-4 mb-3">
//                         <div className="flex items-center gap-1 text-sm text-gray-600">
//                           <MapPin className="w-4 h-4" />
//                           <span>{doctor.location}</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                         <div className="flex items-center gap-2">
//                           <Badge
//                             variant={doctor.status === "online" ? "default" : "secondary"}
//                             className={
//                               doctor.status === "online"
//                                 ? "bg-green-50 text-green-600 border-green-200"
//                                 : "bg-gray-100 text-gray-600 border-gray-200"
//                             }
//                           >
//                             {doctor.status}
//                           </Badge>
//                         </div>
//                         <span className="text-lg font-bold text-blue-600">{doctor.fee}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right side - Calendar and time slots */}
//           <div className="space-y-6">
//             {/* Calendar */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Select Date</h2>
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="mx-auto"
//                 disabled={(date) => date < new Date()}
//               />
//             </div>

//             {/* Time slots */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Select Time</h2>

//               {selectedDoctor === null ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Clock className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <p className="text-gray-500">Please select a doctor first</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-3 gap-3">
//                   {timeSlots.map((time, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedTime(time)}
//                       className={`p-3 rounded-xl border transition-all ${
//                         selectedTime === time
//                           ? "border-blue-600 bg-blue-50 text-blue-600"
//                           : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex items-center justify-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         <span className="font-medium">{time}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Booking summary */}
//             {selectedDoctor !== null && selectedDate && selectedTime && (
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-blue-100">Doctor:</span>
//                     <span className="font-medium">{doctors[selectedDoctor].name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-blue-100">Specialty:</span>
//                     <span className="font-medium">{doctors[selectedDoctor].specialty}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-blue-100">Date:</span>
//                     <span className="font-medium">
//                       {selectedDate.toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-blue-100">Time:</span>
//                     <span className="font-medium">{selectedTime}</span>
//                   </div>
//                   <div className="flex justify-between pt-3 border-t border-blue-500">
//                     <span className="text-blue-100">Consultation Fee:</span>
//                     <span className="font-bold text-xl">{doctors[selectedDoctor].fee}</span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleBooking}
//                   className="w-full bg-white text-blue-600 hover:bg-blue-50"
//                 >
//                   <CalendarIcon className="w-4 h-4 mr-2" />
//                   Confirm Booking
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Star,
  Check,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";

export default function AppointmentBooking() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<any>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 👨‍⚕️ Fetch doctors
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

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","02:00 PM","02:30 PM",
    "03:00 PM","03:30 PM","04:00 PM","04:30 PM",
  ];

  // 📅 Booking API
  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please select all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || ""
        },
        body: JSON.stringify({
          doctorId: doctors[selectedDoctor]._id,
          date: selectedDate.toISOString(),
          time: selectedTime
        })
      });

      if (!res.ok) {
        alert("Booking failed");
        return;
      }

      alert("Appointment booked successfully!");
      navigate("/patient-dashboard");

    } catch (err) {
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
        <h1 className="text-xl font-bold">Book Appointment</h1>
      </header>

      <main className="p-6 grid grid-cols-2 gap-6">

        {/* Doctors */}
        <div>
          <h2 className="font-bold mb-4">Doctors</h2>

          {doctors.map((doc: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedDoctor(i)}
              className={`p-4 border mb-2 cursor-pointer ${
                selectedDoctor === i ? "border-blue-500" : ""
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
            Confirm Booking
          </Button>

        </div>

      </main>
    </div>
  );
}
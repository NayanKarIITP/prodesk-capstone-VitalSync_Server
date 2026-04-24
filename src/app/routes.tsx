

import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ IMPORT THIS
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AppointmentBooking from "./pages/AppointmentBooking";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",  
    Component: Login,
  },
  {
    path: "/register",   
    Component: Register,
  },
  {
    path: "/patient-dashboard",
    Component: PatientDashboard,
  },
  {
    path: "/doctor-dashboard",
    Component: DoctorDashboard,
  },
  {
    path: "/appointment-booking",
    Component: AppointmentBooking,
  },
  {
  path: "/success",
  Component: Success,
},
{
  path: "/cancel",
  Component: Cancel,
}
]);
import React from "react"
import "./App.css"
import {Routes, Route} from "react-router-dom"
import User from "./components/User"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Dashboard from "./components/Dashboard"
import Admin from "./components/Admin"
import AdminDashboard from "./components/AdminDashboard"
import AddDoctor from "./components/adminDashboard/addDoctorForm"
import Appointment from "./components/patientDashboard/Appointment"
import Doctor from "./components/Doctor"
import DoctorDashboard from "./components/DoctorDashboard"


export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/user" element={<User />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/admin_dashboard" element={<AdminDashboard />} />
			<Route path="/addDoctor" element={<AddDoctor />} />
			<Route path="/appointment" element={<Appointment />} />
			<Route path="/doctor" element={<Doctor />} />
			<Route path="/doctor_dashboard" element={<DoctorDashboard />} />
		</Routes>
	)
}
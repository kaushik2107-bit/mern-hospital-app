import React, { useState } from "react"
import Menu from "./patientDashboard/Menu"
import DashboardPatient from "./patientDashboard/DashboardPatient"
import Reports from "./patientDashboard/Reports"
import Prescription from "./patientDashboard/Prescription"
import Doctors from "./adminDashboard/Doctors"
import Messages from "./patientDashboard/Messages"

export default function Dashboard() {
	const userData = JSON.parse(localStorage.getItem("user"))
	if (!userData) {
		window.location = "/"
	}

	const [active, setActive] = useState(1);
	const array = [<DashboardPatient />, <Reports />, <Prescription />, <Doctors />, <Messages />];

	return (
		<div className="dashboard__patient">
			<div className="left__section">
				<Menu 
					onChange={value => setActive(value)}
					isActive={active}
				/>
			</div>
			<div className="right__section">
				<div className="patient__header">
					<h1>Welcome, {userData.firstName}!</h1>
				</div>
				{array[active-1]}
			</div>
		</div>
	)
}
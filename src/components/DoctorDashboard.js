import React, { useState } from "react"
import Menu from "./doctorDashboard/Menu"
import Dashboarddoctor from "./doctorDashboard/DashboardDoctor"
import Patients from "./doctorDashboard/Patients"
import Messages from "./doctorDashboard/Messages"

export default function Dashboard() {
	const userData = JSON.parse(localStorage.getItem("user")).username
	if (!userData) {
		window.location = "/"
	}

	const [active, setActive] = useState(1);
	const array = [<Dashboarddoctor />, <Patients />, <Messages />]

	const [fade, setFade] = useState(true);

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
					<h1>Welcome, {userData}!</h1>
				</div>
				{array[active-1]}
			</div>
		</div>
	)
}
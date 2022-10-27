import React, { useState } from "react"
import Menu from "./adminDashboard/Menu"
import Dashboardadmin from "./adminDashboard/DashboardAdmin"
import Doctors from "./adminDashboard/Doctors"

export default function Dashboard() {
	const userData = localStorage.getItem("user")
	if (!userData) {
		window.location = "/"
	}

	const [active, setActive] = useState(1);
	const array = [<Dashboardadmin />, <Doctors />]

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
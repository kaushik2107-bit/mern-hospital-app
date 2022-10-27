import React, { useState, useEffect } from "react"
import "./patientDashboard.css"
import axios from "axios"

export default function DashboardPatient(props) {
	const user = JSON.parse(localStorage.getItem("user"))

	const [appData, setAppData] = useState([])

	const func = async () => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/listapp"
			const {data : res} = await axios.post(url, {aadharId: user.aadharId})
			setAppData(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		func()
	}, [])


	const pastapp = appData.filter(obj => obj.status === "pending")
	const futureapp = appData.filter(obj => obj.status === "done")

	let pastCounter = 1;
	let presentCounter = 1;
	return (
		<div className="dashboard">
			<h3>Upcoming Appointments</h3>
			<div className="upcoming__appointments">
				<table>
					<thead>
						<tr className="table__header">
							<td>No.</td>
							<td>Doctor's Name</td>
							<td>Specialization</td>
							<td>Date</td>
							<td>Appointment Time</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody>
						{pastapp.map(function(array) {
							
							return (
								<tr key={presentCounter}>
									<td>{presentCounter++}.</td>
									<td>{array.name}</td>
									<td>{array.specialization}</td>
									<td>{array.date}</td>
									<td>{array.apptime}:00 hrs</td>
									<td><p className="status" style={array.status === "missed" ? {backgroundColor: "rgba(250, 50, 0, 1)"} : {}}>{array.status}</p></td>
								</tr>	
							)					
						})}
					</tbody>
				</table>
			</div>
			<h3>Past Appointments</h3>
			<div className="past__appointments">
				<table>
					<thead>
						<tr className="table__header">
							<td>No.</td>
							<td>Doctor's Name</td>
							<td>Specialization</td>
							<td>Date</td>
							<td>Appointment Time</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody>
						{futureapp.map(function(array) {return (
							<tr key={pastCounter}>
								<td>{pastCounter++}.</td>
								<td>{array.name}</td>
								<td>{array.specialization}</td>
								<td>{array.date}</td>
								<td>{array.apptime}:00 hrs</td>
								<td><p className="status">{array.status}</p></td>
							</tr>						
						)})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
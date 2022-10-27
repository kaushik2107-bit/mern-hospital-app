import React, { useState, useEffect } from "react"
import "../patientDashboard/patientDashboard.css"
import axios from "axios"

export default function DashboardDoctor() {
	const [data, setData] = useState()

	const todayapp = []
	const pastapp = []
	const futureapp = []

	const dateComp = (str) => {
		var date = new Date()
		date.setHours(0,0,0,0)
		var date1 = new Date(str)

		if (date.getTime() === date1.getTime()) return 0;
		else if (date.getTime() > date1.getTime()) return -1;
		else return 1;
	}

	const docapp = async (req, res) => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/docapp"
			const {data: res} = await axios.post(url, {email : JSON.parse(localStorage.getItem('user')).email})
			setData(res.data)
		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		docapp()
	}, [])

	
	data && Object.keys(data).forEach((key) => {
		if (dateComp(data[key].date) === 1) {
			futureapp.push({...data[key]})
		} else if (dateComp(data[key].date) === 0) {
			todayapp.push(data[key])
		} else {
			pastapp.push(data[key])
		}
	})

	// console.log(JSON.stringify(data, null, 3))


	let todayCounter = 1;
	let pastCounter = 1;
	let futureCounter = 1;

	const [status, setStatus] = useState(true)

	const changeStatus = async (first, second ) => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/updatestatus"
			const data = {
				aadharId: first,
				_id: second
			}
			await axios.post(url, data)
			docapp()
		} catch (error) {	
			console.log(error)
		}
	}



	return (
		<div className="dashboard">
			<h3>Today's Appointments</h3>
			<div className="today__appointments">
				<table>
					<thead>
						<tr className="table__header">
							<td style={{width: "10%"}}>No.</td>
							<td>Patient Name</td>
							<td>Appointment Date</td>
							<td>Appointment Time</td>
							<td>Status</td>
							<td>Submit</td>
						</tr>
					</thead>

					<tbody>
						{todayapp.map((item) => {
							return (
								<tr key={todayCounter}>
									<td>{todayCounter++}</td>
									<td>{item.patient_data[0].firstName+" "+item.patient_data[0].lastName}</td>
									<td>{item.date}</td>
									<td>{item.apptime}:00 hrs</td>
									<td><p className="status" style={item.status === "missed" ? {backgroundColor: "rgba(250, 50, 0, 1)"} : item.status === "done" ? {backgroundColor: "rgba(10, 200, 100, 1)"} : {}}>{item.status}</p></td>
									<td>
										<button type="submit" onClick={() => changeStatus(item.patient_aadharId, item._id)}>Done</button>
									</td>
								</tr>
							)							
						})}
					</tbody>
				</table>
			</div>

			<h3>Upcoming Appointments</h3>
			<div className="upcoming__appointments">
				<table>
					<thead>
						<tr className="table__header">
							<td style={{width: "10%"}}>No.</td>
							<td>Patient Name</td>
							<td>Appointment Date</td>
							<td>Appointment Time</td>
							<td>Status</td>
						</tr>
					</thead>

					<tbody>
						{futureapp.map((item) => {
							return (
								<tr className="table__data" key={futureCounter}>
									<td>{futureCounter++}</td>
									<td>{item.patient_data[0].firstName+" "+item.patient_data[0].lastName}</td>
									<td>{item.date}</td>
									<td>{item.apptime}:00 hrs</td>
									<td><p className="status" style={item.status === "missed" ? {backgroundColor: "rgba(250, 50, 0, 1)"} : {}}>{item.status}</p></td>
								</tr>
							)							
						})}
					</tbody>
				</table>
			</div>


			<h3>Past Apointments</h3>
			<div className="past__appointments">
				<table>
					<thead>
						<tr className="table__header">
							<td style={{width: "10%"}}>No.</td>
							<td>Patient Name</td>
							<td>Appointment Date</td>
							<td>Appointment Time</td>
							<td>Status</td>
						</tr>
					</thead>

					<tbody>
						{pastapp.map((item) => {
							return (
								<tr key={pastCounter}>
									<td>{pastCounter++}</td>
									<td>{item.patient_data[0].firstName+" "+item.patient_data[0].lastName}</td>
									<td>{item.date}</td>
									<td>{item.apptime}:00 hrs</td>
									<td><p className="status" style={item.status === "pending" ? {backgroundColor: "rgba(250, 50, 0, 1)"} : {}}>{item.status === "done" ? item.status : "missed"}</p></td>
								</tr>
							)							
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
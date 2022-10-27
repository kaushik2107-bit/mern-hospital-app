import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

export default function Appointment() {
	const search = useLocation().search
	const doc_id = new URLSearchParams(search).get("id")
	const [docData, setDocData] = useState()

	const docDataFunc = async () => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/docfind"
			const res = await axios.post(url, {id: doc_id})
			setDocData(res.data.docData[0])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		docDataFunc()
	}, [])

	const time = docData ? docData.time.split("-") : [0, 0]

	const from = parseInt(time[0])
	const to = parseInt(time[1])

	const timeArray = []
	for (let i=from; i<=to; i++) {
		timeArray.push(i);
	}

	const [appointmentData, setAppointmentData] = useState({
		aadharId: JSON.parse(localStorage.getItem("user")).aadharId,
		email: JSON.parse(localStorage.getItem("user")).email,
		contact: JSON.parse(localStorage.getItem("user")).contact,
		appointments: [{
			name: docData ? docData.name : "",
			specialization: docData ? docData.specialization : "",
			email: docData ? docData.email : "",
			time: docData ? docData.time : "",
			date: "",
			apptime: "",
			status: "pending"
		}]
	})

	useEffect(() => {
		setAppointmentData({
			aadharId: JSON.parse(localStorage.getItem("user")).aadharId,
			email: JSON.parse(localStorage.getItem("user")).email,
			contact: JSON.parse(localStorage.getItem("user")).contact,
			appointments: [{
				name: docData ? docData.name : "",
				specialization: docData ? docData.specialization : "",
				email: docData ? docData.email : "",
				time: docData ? docData.time : "",
				date: 0,
				apptime: "",
				status: "pending"
			}]
		})
	}, [docData])



	const handleChange = ({currentTarget: input}) => {
		setAppointmentData({...appointmentData, appointments: [{...appointmentData.appointments[0], [input.id]: input.value}]})
	}

	const navigate = useNavigate()
	const [error, setError] = useState("")
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/appointment";
			const res = await axios.post(url, appointmentData);
			navigate("/dashboard")
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message)
			}
		}
	}

	return (
		<div className="appointment">
			<form className="appointment__form" onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td><label htmlFor="name">Name</label></td>
							<td><input id="name" type="text" value={docData ? docData.name: ""} readOnly={true} style={{backgroundColor: "#AAAAAA", outline: "none", border: "none"}} onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="specialization">Specialization</label></td>
							<td><input id="specialization" type="text" value={docData ? docData.specialization: ""} readOnly={true} style={{backgroundColor: "#AAAAAA", outline: "none", border: "none"}} onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="time">Available Time</label></td>
							<td><input id="time" type="text" value={docData ? time[0] + ":00 hrs to " + time[1] + ":00 hrs" : ""} readOnly={true} style={{backgroundColor: "#AAAAAA", outline: "none", border: "none"}} onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="date">Date</label></td>
							<td><input id="date" type="date" min={new Date().toISOString().split('T')[0]} onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="apptime">Appointment Time</label></td>
							<td>
								<select name="apptime" id="apptime" onChange={handleChange} >
									<option value="">Select</option>
									{timeArray.map((item) => {
										return (<option key={item} value={item}>{item}:00 hrs</option>)
									})}
								</select>
							</td>
						</tr>


						{error && <tr><td colSpan={2} style={{textAlign: "center"}} ><div className="signup__error">{error}</div></td></tr>}	


						<tr>
							<td colSpan={2} style={{textAlign: "center"}}>
								<button type="submit" style={{color: 'white', fontSize:"14px"}}>Make an appointment</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>	
		</div>
	)
}
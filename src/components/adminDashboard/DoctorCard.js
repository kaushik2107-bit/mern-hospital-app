import React from "react"
import { Link } from "react-router-dom"

export default function DoctorCard({ doctor }) {
	const time = doctor.time.split("-")

	return (
		<div className="doctor__card">
			<div className="doctor__image" style={{backgroundImage: "url(https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=360)"}}/>
			<div className="details">
				<p className="name">{doctor.name}</p>
				<p>{doctor.specialization}</p>
				<h4>{time[0]}:00 hrs to {time[1]}:00 hrs</h4>
				<Link to={`/appointment/?id=${doctor._id}`}><button className="appointment__button">Get Appointment Now</button></Link>
			</div>
		</div>
	)
}
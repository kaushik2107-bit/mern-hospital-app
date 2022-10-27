import React, { useState, useEffect } from "react"
import "./adminDashboard.css"
import { Link } from "react-router-dom"
import axios from "axios"
import DoctorCard from "./DoctorCard"

export default function Doctors() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const [num, setFrom] = useState(0);
	const [doctorData, setDoctorData] = useState("")

	const [filter, setFilter] = useState({
		name: "",
		specialization: ""
	})

	const handleFilter = ({currentTarget: input}) => {
		setFilter({...filter, [input.id]:input.value})
	}

	const doctorDataFunction = async () => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/listdoc"
			const res = await axios.post(url, {from: num, filter: filter})
			setDoctorData(res.data.data)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		doctorDataFunction();
	}, [filter])

	return (
		<div className="doctors">
			<Link to="/addDoctor"><button className="addDoctor">Add a Doctor</button></Link>
			<br />

			<form action="post" className="filter">
				<input id="name" type="text" placeholder="Looking for a particular doctor?" onChange={handleFilter} />
				<input id="specialization" type="text" placeholder="Enter specialization" onChange={handleFilter} />
			</form>

			<div className="card">
				{Object.values(doctorData).map((member, index) => {
					return (
						<DoctorCard
							key={member._id}
							doctor={member}
						/>
					)
				})}
			</div>
		</div>
	)
}
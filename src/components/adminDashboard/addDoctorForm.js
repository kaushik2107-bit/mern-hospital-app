import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function AddDoctorForm() {
	const [data, setData] = useState({
		name: "",
		specialization: "",
		time: "",
		username: "",
		email: "",
		contact: 0,
		password: ""
	})

	const handleChange =  ({currentTarget: input}) => {
		setData({...data, [input.id]: input.value})
	}

	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			const uri = "https://mern-hospital-app.herokuapp.com/api/docreg"
			const { data: res} = await axios.post(uri, data)
			navigate("/admin_dashboard")
			console.log(res.message)
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message)
			}
		}
	}

	return (
		<div className="addDoctor__page">
			<form className="addDoctor__form" action="post" onSubmit={handleSubmit}>
				<header>Add a new Doctor</header>
				<table>
					<tbody>
						<tr>
							<td><label htmlFor="name">Name</label></td>
							<td><input id="name" type="text" placeholder="Enter you name" onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="specialization">Specialization</label></td>
							<td><input id="specialization" type="text" placeholder="Enter you speicalization" onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="time">Time Available</label></td>
							<td>
								<select name="time" id="time"onChange={handleChange}>
									<option value="">----Select----</option>
									<option value="6-10">6 a.m. to 10 a.m.</option>
									<option value="10-14">10 a.m. to 2 p.m.</option>
									<option value="14-18">2 p.m. to 6 p.m.</option>
									<option value="18-22">6 p.m. to 10 p.m.</option>
									<option value="22-6">10 p.m. to 6 a.m.</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label htmlFor="username">Username</label></td>
							<td><input id="username" type="text" placeholder="Enter your username" onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="email">Email</label></td>
							<td><input id="email" type="email" placeholder="Enter your email" onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="contact">Contact</label></td>
							<td><input id="contact" type="tel" placeholder="Enter your contact no." onChange={handleChange}/></td>
						</tr>
						<tr>
							<td><label htmlFor="password">Password</label></td>
							<td><input id="password" type="password" placeholder="Enter your password" onChange={handleChange}/></td>
						</tr>

						{error && <tr><td colSpan={2} style={{textAlign: "center"}} ><div className="signup__error">{error}</div></td></tr>}	

						<tr>
							<td colSpan={2} style={{textAlign: "center"}}>
								<button type="submit" >Add Doctor</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	)
}
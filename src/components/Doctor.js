import React, { useState } from "react"
import axios from "axios"

export default function Doctor() {
	const Login = () => {
		const [data, setData] = useState({
	        username: "",
	        password: ""
	    })

	    const [error, setError] = useState("")

	    const handleChange = ({currentTarget: input}) => {
	        setData({...data, [input.id]:input.value})
	    }

	    const handleSubmit = async (e) => {
	        e.preventDefault()
	        try {
	            const url = "https://mern-hospital-app.herokuapp.com/api/doclogin"
	            const {data : res} = await axios.post(url, data)
	            localStorage.setItem("token", res.data);
	            localStorage.setItem("user", JSON.stringify(res.userData));
	            window.location = '/doctor_dashboard'
	        } catch (error) {
	            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
	                setError(error.response.data.message)
	            }
	        }
    	}


    	return (
    		<div className="login">
				<form className="login__form" action="post" onSubmit={handleSubmit}>
					<table>
						<tbody>
							<tr>
								<td><label htmlFor="username">Username</label></td>
								<td><input id="username" type="text" placeholder="Enter Your username" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="password">Password</label></td>
								<td><input id="password" type="password" placeholder="Enter Your Password" onChange={handleChange} required/></td>
							</tr>

							{error && <tr><td colSpan={2} style={{textAlign: "center"}} ><div className="login__error">{error}</div></td></tr>}	

							<tr>
								<td colSpan={2} style={{textAlign: "center"}}><button type="submit" className="login__submit">Login</button></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
    	)
	}


	return (
		<div className="user">
			<div className="admin__header options">
				Doctor Login
			</div>
			<div className="admin__login">
				<Login />
			</div>
		</div>
	)
}
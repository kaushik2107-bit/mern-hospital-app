import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function User() {
	const [selectFirst, setSelectFirst] = useState(true);
	
	const Login = () => {
		const [data, setData] = useState({
	        email: "",
	        password: ""
	    })

	    const [error, setError] = useState("")

	    const handleChange = ({currentTarget: input}) => {
	        setData({...data, [input.id]:input.value})
	    }

	    const handleSubmit = async (e) => {
	        e.preventDefault()
	        try {
	            const url = "https://mern-hospital-app.herokuapp.com/api/login"
	            const {data : res} = await axios.post(url, data)
	            localStorage.setItem("token", res.data);
	            localStorage.setItem("user", JSON.stringify(res.userData));
	            window.location = '/dashboard'
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
								<td><label htmlFor="email">Email</label></td>
								<td><input id="email" type="email" placeholder="Enter Your Email" onChange={handleChange} required/></td>
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

	const Signup = () => {
		const [data, setData] = useState({
			aadharId: 0,
			firstName: "",
			lastName: "",
			age: 0,
			gender: "male",
			email: "",
			contact: 0,
			password: "",
		})

		const handleChange = ({currentTarget: input}) => {
			setData({...data, [input.id]: input.value})
		}

		const [error, setError] = useState("");
		const navigate = useNavigate();

		const handleSubmit = async(e) => {
			e.preventDefault();
			try {
				const uri = "https://mern-hospital-app.herokuapp.com/api/register";
				const {data: res} = await axios.post(uri, data);
				navigate("/user");
				console.log(res.message);
			} catch(error) {
				if (error.response && error.response.status >= 400 && error.response.status <= 500) {
					setError(error.response.data.message);
				}
			}
		}

		return (
			<div className="signup">
				<form className="signup__form" action="post" onSubmit={handleSubmit}>
					<table>
						<tbody>
							<tr>
								<td><label htmlFor="aadharId">Aadhar Id</label></td>
								<td><input id="aadharId" type="tel" placeholder="Enter Your Aadhar Id" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="firstName">First Name</label></td>
								<td><input id="firstName" type="text" placeholder="Enter Your First Name" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="lastName">Last Name</label></td>
								<td><input id="lastName" type="text" placeholder="Enter Your Last Name" onChange={handleChange} required/></td>
							</tr >

							<tr>
								<td><label htmlFor="age">Age</label></td>
								<td><input id="age" type="number" placeholder="Enter Your Age" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="gender">Gender</label></td>
								<td><select name="gender" id="gender" onChange={handleChange} value={data.gender} required>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select></td>
							</tr>

							<tr>
								<td><label htmlFor="email">Email</label></td>
								<td><input id="email" type="email" placeholder="Enter Your Email" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="contact">Phone Number</label></td>
								<td><input id="contact" type="tel" placeholder="Enter Your Phone Number" onChange={handleChange} required/></td>
							</tr>

							<tr>
								<td><label htmlFor="Password">Password</label></td>
								<td><input id="password" type="password" placeholder="Enter Your Password" onChange={handleChange} required/></td>
							</tr>

							
							{error && <tr><td colSpan={2} style={{textAlign: "center"}} ><div className="signup__error">{error}</div></td></tr>}	

							<tr>
								<td colSpan={2} style={{textAlign: "center"}}><button type="submit" className="signup__submit">Sign Up</button></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		)
	}


	const handleClick1 = () => {
		if (selectFirst === false) {
			setSelectFirst(true)
		}
	}

	const handleClick2 = () => {
		if (selectFirst === true) {
			setSelectFirst(false)
		}
	}

	return (
		<div className="user">
			<div className="options">
				<div className="option1"
					onClick={handleClick1}
					style={selectFirst ? {color: "white", backgroundColor: "#408CFD"} : {}}
				>
					Login
				</div>
				<div className="option2"
					onClick={handleClick2}
					style = {selectFirst ? {} : {color: "white", backgroundColor: "#408CFD"}}
				>
					Signup
				</div>
			</div>

			{selectFirst ? <Login /> : <Signup />}
			<Link to="/admin" style={{textDecoration:"none"}}><p className="admin__prompt">Are you admin? Click here to Login </p></Link>

			<Link to="/doctor" style={{textDecoration:"none"}}><p className="admin__prompt">Are you doctor? Click here to Login </p></Link>			
		</div>
	)
}
import React, { useState } from "react"
import "./patientDashboard.css"

export default function Menu(props) {
	const userData = JSON.parse(localStorage.getItem("user"));
	const [isHover, setIsHover] = useState(false);

	const mouseEnter = () => {
		setIsHover(true);
	}

	const mouseLeft = () => {
		setIsHover(false)
	}

	const handleLogout = () => {
		localStorage.removeItem("uesr")
		window.location = "/"
	}

	return (
		<div className="patient__menu">
			<div className="logo" ><h2>LOGO</h2></div>
			<div className="menu">
				<ul>
					<li onClick={event => props.onChange(1)} style={props.isActive === 1 ? {color: "white", backgroundColor:"#408cfd"} : {}}><i className="bi bi-house-fill" style={props.isActive === 1 ? {color: "white"} : {}}></i>Dashboard</li>
					<li onClick={event => props.onChange(2)} style={props.isActive === 2 ? {color: "white", backgroundColor:"#408cfd"} : {}}><i className="bi bi-bag-check-fill" style={props.isActive === 2 ? {color: "white"} : {}}></i>Report</li>
					<li onClick={event => props.onChange(3)} style={props.isActive === 3 ? {color: "white", backgroundColor:"#408cfd"} : {}}><i className="bi bi-stickies-fill" style={props.isActive === 3 ? {color: "white"} : {}}></i>Prescription</li>
					<li onClick={event => props.onChange(4)} style={props.isActive === 4 ? {color: "white", backgroundColor:"#408cfd"} : {}}><i className="bi bi-stickies-fill" style={props.isActive === 4 ? {color: "white"} : {}}></i>Doctors</li>
					<li onClick={event => props.onChange(5)} style={props.isActive === 5 ? {color: "white", backgroundColor:"#408cfd"} : {}}><i className="bi bi-stickies-fill" style={props.isActive === 5 ? {color: "white"} : {}}></i>Messages</li>
					<li onClick={handleLogout} onMouseEnter={mouseEnter} onMouseLeave={mouseLeft} style={isHover ? {color: "red"} : {}}><i className="bi bi-box-arrow-right"></i>Logout</li>
				</ul>
			</div>
		</div>
	)
}
import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
	return (
		<div className="navbar">
			<ul>
				<li><Link to="/" style={{textDecoration: "none", color: "#444444", padding: "30px"}}>Home</Link></li>
				<li><Link to="/about" style={{textDecoration: "none", color: "#444444", padding: "30px"}}>About</Link></li>
				<li><Link to="/contact" style={{textDecoration: "none", color: "#444444", padding: "30px"}}>Contact</Link></li>
				{
					<li><Link to="/user" style={{textDecoration: "none", color: "#444444", padding: "30px"}}>Login/Signup</Link></li>
				}
			</ul>
		</div>

	)
}
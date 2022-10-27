import React from "react"
import Navbar from "../child-components/Navbar"
import { Link } from "react-router-dom"

export default function Home() {
	return (
		<div className="home__main">
			<Navbar />
			<div className="home__image" >
				<h1>Your reason <br /> to <span>smile</span></h1>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type  and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
				<Link to="/user"><button>Get Your Appointment Now</button></Link>
			</div>
		</div>
	)
}
import React, { useState, useEffect } from "react"
import axios from "axios"
import "../patientDashboard/patientDashboard.css"
import { io } from "socket.io-client"


const socket = io("https://mern-hospital-app.herokuapp.com/")

const Messages = () => {
	const [active, setActive] = useState(0)
	const [chatUser, setChatUser] = useState()
	const [chatName, setChatName] = useState()
	return (
		<div className="messages">
			<div className="left">
				<MessageBox 
					onChange={(value, email, name) => {setActive(value); setChatUser(email); setChatName(name)}}
					isActive={active}
					chatUser={chatUser}
				/>
			</div>
			<div className="right">
				<MessageUser 
					chatUser={chatUser}
					chatName={chatName}
				/>
			</div>
		</div>
	)


}

const MessageUser = (props) => {
	// sockets

	socket.on('connect', () => {
		// console.log(`Connection id: ${socket.id}`)
	})

	socket.on('disconnect', () => {
		console.log("Disconnected")
	}) 

	const room__id = JSON.stringify(JSON.parse(localStorage.getItem('user')).email + props.chatUser)


	const [chats, setChats] = useState([])
	const listChats = async () => {
		try {
			const array = [props.chatUser, JSON.parse(localStorage.getItem('user')).email]
			const url = "https://mern-hospital-app.herokuapp.com/api/messages"
			
			socket.emit('create-room', room__id)

			const userchats = await axios.post(url, {members: array})
			setChats(userchats.data.messages)
		
			socket.on('received-msg', async (data) => {
				const user_chats = await axios.post(url, {members: array})
				setChats(user_chats.data.messages)
			})

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		{props.chatUser && listChats()}
	}, [props])

	let messageCounter = 0;

	const [message, setMessage] = useState("")

	const handleChange = (event) => {
		setMessage(event.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const members = [props.chatUser, JSON.parse(localStorage.getItem('user')).email]
			const messages = [{
				message: message,
				sent_by: JSON.parse(localStorage.getItem('user')).email
			}]
			const data = {
				members: members,
				messages: messages
			}

			const url = "https://mern-hospital-app.herokuapp.com/api/chatroute"
			await axios.post(url, data)

			socket.emit('message', data, room__id)

			const array = [props.chatUser, JSON.parse(localStorage.getItem('user')).email]
			const url1 = "https://mern-hospital-app.herokuapp.com/api/messages"
			

			const user_chats = await axios.post(url1, {members: array})
			setChats(user_chats.data.messages)

			
		} catch (error) {
			console.log(error)
		}



	}

	return (
		<div className="message__user">
			<div className="name">{props.chatName}</div>
			<div className="chats">
				{chats && chats.map(item => {

					const datetime = new Date(item.created_at)
					const time = datetime.toLocaleTimeString()
					const date = datetime.toLocaleDateString()
					return (
							<div key={messageCounter++} className={item.sent_by === JSON.parse(localStorage.getItem('user')).email ? "myself" : "other"}>{item.message}<div className="datetime">{date} {time}</div></div>
					)
				}).reverse()}
			</div>
			<div className="message__input">
				{chats.length !== 0 && 
					<form action="post" className="form__message">
						<input type="text" className="msgbox" value={message} onChange={handleChange} />
						<button type="submit" className="button__send" onClick={handleSubmit}>Send</button>
					</form>
				}
			</div>
		</div>
	)
}



const MessageBox = (props) => {
	const [chats, setChats] = useState([])
	const [docData, setDocData] = useState([])
	const listChats = async () => {
		try {
			const url = "https://mern-hospital-app.herokuapp.com/api/chats"
			const userchats = await axios.post(url, {member: JSON.parse(localStorage.getItem('user')).email})
			setChats(userchats.data.chats)
			setDocData(userchats.data.patientData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		listChats()
	}, [])

	let counter = 0;



	return (
		<div className="message__box">
			<div className="header"><h2>Chats</h2></div>
			{chats.map((item) => {
				return (
					<div id={counter} onClick={event => {props.onChange(event.target.id, item.members[1], docData[event.target.id][0].firstName + " " + docData[event.target.id][0].lastName)}} style={props.isActive === -1 ? {backgroundColor: "#777777"} : {}} className="user__box" key={counter+1}>{docData && docData[counter][0].firstName + " " + docData[counter++][0].lastName}</div>
				)
			})}
		</div>
	)
}

export default Messages
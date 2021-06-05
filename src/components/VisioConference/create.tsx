import React, { Component } from 'react';

import './styles.css';
type VisioState ={
	url:string
}
class CreateVisioConference extends Component<{},VisioState> {
  	constructor (props:any) {
		super(props)
		this.state  = {
			url: ''
		}
	}

	handleChange = (e:any) => this.setState({ url: e.target.value })

	join = () => {
		if (this.state.url !== "") {
			var url = this.state.url.split("/")
			window.location.href = `/visio-room/${url[url.length-1]}`
		} else {
			var urlJoin = Math.random().toString(36).substring(2, 7)
			window.location.href = `/visio-room/${urlJoin}`
		}
	}

	render() {
		return (
			<div className="container2">
				<div style={{
					background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
					textAlign: "center", margin: "auto", marginTop: "100px"
				}}>
					<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>Start or join a meeting</p>
					<input placeholder="URL" onChange={e => this.handleChange(e)} />
					<button  onClick={this.join} style={{ margin: "20px" }}>Go</button>
				</div>
			</div>
		)
	}
}
export default CreateVisioConference;
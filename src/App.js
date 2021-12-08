import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from 'react-collapsible';
var classNames = require('classnames');

const IN_PROGRESS = 'IN_PROGRESS'
const CHANGED = 'CHANGED'
const UNCHANGED = 'UNCHANGED'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { mimiDomains: {} }
	}

	componentDidMount() {
		const formattedDomains = {}
		this.props.domains.forEach(domain => { formattedDomains[domain] = UNCHANGED })
		this.setState({ mimiDomains: formattedDomains, activeTab: 'vault' })
	}

	handleTabClick(activeTab) {
		this.setState({ activeTab })
	}

	changePassword(domain) {
		// Show that domain pw change is in progress
		this.setState({
			mimiDomains: Object.assign({ domain: IN_PROGRESS }, this.state.mimiDomains)
		})
		// Write a new counter to db1, db2
		const newDomains = Object.assign({ domain: CHANGED }, this.state.mimiDomains)
		this.props.changePassword(domain).then(() => {
			// Market target domain as changed
			this.setState({ mimiDomains: newDomains })
		})
	}

	render() {
		const { mimiDomains, activeTab } = this.state

		// Domain list
		let domains = Object.keys(mimiDomains).map(domain => {
			// Button to change password for this domain
			let pwMessage = <div className="change-pw" onClick={this.changePassword.bind(this, domain)}>Change Password</div>
			if (mimiDomains[domain] === IN_PROGRESS) {
				// After Change Password button is clicked
				pwMessage = <div className="pw-changing">Changing...</div>
			} else {
				// After pw successfully changed
				pwMessage = <div className="pw-changed">Password changed.</div>
			}
			return (
				<div key={domain} className="domain-item">
					<div className="domain-name">{domain}</div>
					{pwMessage}
				</div>
			);
		});
		// Empty domain list
		if (Object.keys(mimiDomains).length === 0) {
			domains = <div className="no-domains">No passwords saved with MiMi yet.</div>
		}
		// FAQs
		const faqs = (
			<div className="faqs">
				<Collapsible trigger="How do I use MiMi?"></Collapsible>
				<Collapsible trigger="Is MiMi secure?"></Collapsible>
			</div>
		)

		// Active tab logic
		const activeContent = activeTab === 'vault' ? (<div className="domains">{domains}</div>) : faqs

		return (
			<div className="popup">
				<div className="tabs">
					<div className={classNames({ 'active': activeTab === 'vault' })}
						onClick={this.handleTabClick.bind(this, 'vault')}>
						Vault
					</div>
					<div className={classNames({ 'active': activeTab === 'faq' })}
						onClick={this.handleTabClick.bind(this, 'faq')}>
						FAQs
					</div>
				</div>

				{activeContent}
			</div>
		);
	}
}

export default App;


/*
*

<div className="popup-title">How to Use MiMi:</div>
					<ol>
						<li>Click into a password input field</li>
						<li>Fill in your MiMi master password</li>
						<li>Hit command+shift+p to transform your master password</li>
					</ol>
				</div>



import React, { useState } from "react";

/**
export default function Site(props) {
	const [imageExists, setImageExists] = useState(false);
	let imgUrl = "https://" + props.site + "/favicon.ico";

	//tests if a favicon exists at the above url
	let image = document.createElement("img");
	image.src = imgUrl;
	image.onload = () => {
		setImageExists(true);
	};
	image.onerror = () => {
		setImageExists(false);
	};

	return (
		<div style={{ height: "100%", display: "flex", alignItems: "center" }}>
			<img
				className="mx-2"
				src={imageExists ? imgUrl : require("../Resources/missingImage.png")}
				alt=""
				style={{
					height: "100%"
				}}
			></img>
			{props.site}
		</div>
	);
}
 */

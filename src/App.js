import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
		this.setState({ mimiDomains: formattedDomains })
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
		// Domain list
		const { mimiDomains } = this.state

		let domains = mimiDomains.map((domain, status) => {
			// Button to change password for this domain
			let pwMessage = <div className="change-pw" onClick={this.changePassword.bind(this, domain)}>Change Password</div>
			if (status === IN_PROGRESS) {
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

		// If no domains
		if (Object.keys(mimiDomains).length === 0) {
			domains = <div className="no-domains">No passwords saved with MiMi yet.</div>
		}

		return (
			<div className="popup">
				<div className="domains-index">
					{domains}
				</div>
				<div>
					<div class="popup-title">How to Use MiMi:</div>
					<ol>
						<li>Click into a password input field</li>
						<li>Fill in your MiMi master password</li>
						<li>Hit command+shift+p to transform your master password</li>
					</ol>
				</div>
			</div>
		);
	}
}

export default App;

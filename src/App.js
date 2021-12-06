import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

let IN_PROGRESS = 'IN_PROGRESS'
let CHANGED = 'CHANGED'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mimiDomains: [], changedPwDomains: {} };
		this.gifClickHandler = this.gifClickHandler.bind(this);
	}

	componentDidMount() {
		this.setState({ mimiDomains: this.props.domains })
	}

	changePassword(domain) {
		// Mark target domain as in progress
		this.setState({
			changedPwDomains: Object.assign({ domain: IN_PROGRESS }, this.state.changedPwDomains)
		})

		// Write a new counter to db1, db2, db3
		const newChangedDomains = Object.assign({ domain: CHANGED }, this.state.changedPwDomains)
		this.props.changePassword(domain).then(() => {
			// Market target domain as changed
			this.setState({ changedPwDomains: newChangedDomains })
		})
	}

	render() {
		// Domain list
		const { mimiDomains, changedPwDomains } = this.state

		let domains = mimiDomains.map(domain => {
			// Button to change password for this domain
			let pwMessage = <div className="change-pw" onClick={this.changePassword.bind(this, domain)}>Change Password</div>
			if (domain in changedPwDomains) {
				if (changedPwDomains[domain] === IN_PROGRESS) {
					// Message shown after Change Password button is clicked
					pwMessage = <div className="pw-changing">Changing password...</div>
				} else {
					// Message shown after pw successfully changed
					pwMessage = <div className="pw-changed">Password changed.</div>
				}
			}

			return (
				<div key={domain} className="domain-item">
					<div className="domain-name">{domain}</div>
					{pwMessage}
				</div>
			);
		});

		// If no domains
		if (mimiDomains.length === 0) {
			domains = <div className="no-domains">No passwords saved with MiMi yet.</div>;
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

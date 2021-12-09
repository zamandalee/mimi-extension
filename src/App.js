import React from "react";
// import "tailwindcss/tailwind.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import logo from "./assets/full-logo.png"
import DomainList from "./components/DomainContent"
import OptionsContent from "./components/OptionsContent"
import FaqContent from "./components/FaqContent"
import DomainListItem from "./components/DomainContentItem";
import * as storage from "./utils/storage";
import { UNCHANGED, IN_PROGRESS, CHANGED } from './utils/constants'

var classNames = require('classnames');

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { mimiDomains: {}, activeTab: 'options' }
	}

	componentDidMount() {
		const formattedDomains = {}
		this.props.domains.forEach(domain => { formattedDomains[domain] = UNCHANGED })
		this.setState({ mimiDomains: formattedDomains })
	}

	handleTabClick = (activeTab) => {
		this.setState({ activeTab })
	}

	handleChangePassword = (domain) => {
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

	deleteDomain = (uid, domain) => {
		const newDomains = delete { ...this.state.mimiDomains }[domain]
		this.props.deleteDomain(uid, domain).then(() => {
			this.setState({ mimiDomains: newDomains })
		})
	}

	render() {
		const { mimiDomains, activeTab } = this.state
		const uid = storage.getData("userId")

		// Domain list
		let domains = Object.keys(mimiDomains).map(domain => (
			<DomainListItem
				key={domain}
				domain={domain}
				status={mimiDomains[domain]}
				handleChangePassword={this.handleChangePassword}
				handleDeleteDomain={d => this.handleDeleteDomain(uid, d)} />
		));

		// Empty domain list
		if (Object.keys(mimiDomains).length === 0) {
			domains = <div className="no-domains">No passwords saved with MiMi yet.</div>
		}


		// Active tab logic
		const vaultClass = classNames('tab mr3', { 'active': activeTab === 'vault' })
		const optionsClass = classNames('tab mr3', { 'active': activeTab === 'options' })
		const faqClass = classNames('tab', { 'active': activeTab === 'faq' })

		let activeContent = (<div className="content">{domains}</div>)
		if (activeTab === 'options') {
			activeContent = <OptionsContent />
		} else if (activeTab === 'faq') {
			activeContent = <FaqContent />
		}

		return (
			<div className="popup flex flex-column align-start">
				<img className="logo" src={logo} />
				<div className="flex justify-start content-center">
					<div className={vaultClass}
						onClick={this.handleTabClick.bind(this, 'vault')}>
						Vault
					</div>
					<div className={optionsClass}
						onClick={this.handleTabClick.bind(this, 'options')}>
						Options
					</div>
					<div className={faqClass}
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




import React from "react";
import Collapsible from 'react-collapsible';
import "tailwindcss/tailwind.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DomainListItem from "./domainListItem";
import * as storage from "./utils/storage";
import { UNCHANGED, IN_PROGRESS, CHANGED } from './utils/constants'

var classNames = require('classnames');

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
				domain={domain}
				status={mimiDomains[domain]}
				handleChangePassword={this.handleChangePassword}
				handleDeleteDomain={d => this.handleDeleteDomain(uid, d)} />
		));

		// Empty domain list
		if (Object.keys(mimiDomains).length === 0) {
			domains = <div className="no-domains">No passwords saved with MiMi yet.</div>
		}

		// FAQs
		const faqs = (
			<div className="faqs">
				<Collapsible trigger="How do I use MiMi?">
					<ol>
						<li>Click into a password input field</li>
						<li>Fill in your MiMi master password</li>
						<li>Hit command+shift+p to transform your master password</li>
					</ol>
				</Collapsible>
				<Collapsible trigger="Is MiMi secure?"></Collapsible>
			</div>
		)

		// Active tab logic
		const vaultClass = classNames('cursor-pointer', { 'active': activeTab === 'vault' })
		const faqClass = classNames('cursor-pointer', { 'active': activeTab === 'faq' })
		const activeContent = activeTab === 'vault' ? (<div className="domains">{domains}</div>) : faqs

		return (
			<div className="popup">
				<div className="tabs">
					<div className={vaultClass}
						onClick={this.handleTabClick.bind(this, 'vault')}>
						Vault
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




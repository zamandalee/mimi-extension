import React from "react";
// import "tailwindcss/tailwind.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import logo from "./assets/full-logo.png";
import DomainList from "./components/DomainContent";
import OptionsContent from "./components/OptionsContent";
import FaqContent from "./components/FaqContent";
import DomainListItem from "./components/DomainContentItem";
import * as storage from "./utils/storage";
import {resetCounter} from "./utils/functions";
import {deleteDomain, fetchAllDomains} from "./utils/firestore";
import {getData} from "./utils/storage";

var classNames = require("classnames");

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {mimiDomains: [], activeTab: "vault"};
	}

	async componentDidMount() {
		const userId = await getData("userId");
		const domains = await fetchAllDomains(userId);
		this.setState({mimiDomains: domains, userId: userId});
	}

	handleTabClick = activeTab => {
		this.setState({activeTab});
	};

	handleChangePassword = domain => {
		resetCounter(domain);
	};

	handleDeleteDomain = domain => {
		console.log(this.state.userId)
		if (this.state.userId) {
			const newDomains = this.state.mimiDomains.filter(el => el !== domain);
			deleteDomain(this.state.userId, domain);
			this.setState({mimiDomains: newDomains});
		}
	};

	handleConfigChange = (option, isChecked) => {
		storage.save(option, isChecked);
	};

	render() {
		const {mimiDomains, activeTab} = this.state;

		// Domain list
		let domains = mimiDomains.map(domain => (
			<DomainListItem key={domain} domain={domain} handleChangePassword={this.handleChangePassword} handleDeleteDomain={this.handleDeleteDomain} />
		));

		// Empty domain list
		if (mimiDomains.length === 0) {
			domains = <div className='no-domains'>No passwords saved with MiMi yet.</div>;
		}

		// Active tab logic
		const vaultClass = classNames("tab mr3", {active: activeTab === "vault"});
		const optionsClass = classNames("tab mr3", {active: activeTab === "options"});
		const faqClass = classNames("tab", {active: activeTab === "faq"});

		let activeContent = <div className='content'>{domains}</div>;
		if (activeTab === "options") {
			activeContent = <OptionsContent handleChange={this.handleConfigChange} />;
		} else if (activeTab === "faq") {
			activeContent = <FaqContent />;
		}

		return (
			<div className='popup flex flex-column align-start'>
				<img className='logo' src={logo} />
				<div className='flex justify-start content-center'>
					<div className={vaultClass} onClick={this.handleTabClick.bind(this, "vault")}>
						Vault
					</div>
					<div className={optionsClass} onClick={this.handleTabClick.bind(this, "options")}>
						Options
					</div>
					<div className={faqClass} onClick={this.handleTabClick.bind(this, "faq")}>
						FAQs
					</div>
				</div>

				{activeContent}
			</div>
		);
	}
}

export default App;

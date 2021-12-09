import React from "react";
import DomainImage from './DomainImage'
var classNames = require('classnames');

class DomainListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isChanged: false }
  }

  handleChange = () => {
    console.log('in handle change')

    this.setState({ isChanged: true })
    setTimeout(() => { this.setState({ isChanged: false }) }, 5000);
    this.props.handleChangePassword(this.props.domain);
  }

  handleDelete = () => {
    this.props.handleDeleteDomain(this.props.domain);
  }

  render() {
    const { domain } = this.props
    const { isChanged } = this.state

    // Change pw button
    const changeClass = classNames('change-btn mr2', { 'changed': isChanged })
    const changeText = isChanged ? 'Changed!' : 'Change'
    const changeBtn = <div className={changeClass} onClick={this.handleChange}>{changeText}</div>

    return (
      <div key={domain} className="domain-item flex justify-between align-center pb3">
        <div className="flex content-center align-center">
          <DomainImage domain={domain} />
          <div className="domain-name ml2">{domain}</div>
        </div>
        <div className="flex content-center align-center">
          {changeBtn}
          <div className="delete-btn" onClick={this.handleDeleteDomain}>Delete</div>
        </div>
      </div>
    );
  }
}
export default DomainListItem;
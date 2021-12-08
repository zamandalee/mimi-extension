import React from "react";
import DomainImage from './domainImage'
import { UNCHANGED, IN_PROGRESS, CHANGED } from './utils/constants'
var classNames = require('classnames');


class DomainListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = () => {
    this.props.handleChangePassword(this.props.domain);
  }

  handleDelete = () => {
    this.props.handleDeleteDomain(this.props.domain);
  }

  render() {
    const { domain, status } = this.props
    // Change pw button
    let changeBtn = (<div className="change-btn mr2" onClick={this.handleChangePassword}>Change</div>)
    if (status !== UNCHANGED) {
      const changeClass = classNames('mr2', {
        'changing': status === IN_PROGRESS,
        'changed': status === CHANGED,
      })
      const changeText = classNames({
        '...': status === IN_PROGRESS,
        'Changed': status === CHANGED,
      })
      changeBtn = <div className={changeClass}>{changeText}</div>
    }
    // Item
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
import React from "react";
var classNames = require('classnames');
import DomainImage from './domainImage'
import { UNCHANGED, IN_PROGRESS, CHANGED } from './utils/constants'


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
    let changeBtn = (<div className="change-btn" onClick={this.handleChangePassword}>Change</div>)
    if (status !== UNCHANGED) {
      const changeClass = classNames({
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
      <div key={domain} className="domain-item">
        <div>
          <DomainImage />
          <div className="domain-name">{domain}</div>
        </div>
        <div>
          {changeBtn}
          <div className="delete-btn" onClick={this.handleDeleteDomain}>Change</div>
        </div>
      </div>
    );
  }
}
export default DomainListItem;
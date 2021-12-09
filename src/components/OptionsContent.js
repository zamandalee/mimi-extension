import React from "react";
import Collapsible from 'react-collapsible';
import {Accordion} from 'react-bootstrap'
import QR from "./QR"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'



class OptionsContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { useCapitals, useNumbers, useSymbols } = this.props
    this.setState({ useCapitals, useNumbers, useSymbols })
  }

  render() {
    return (
      <div className="content">
        <FontAwesomeIcon icon={faCoffee} />

        <Collapsible trigger="Configure MiMi-generated passwords" open={true}>
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </Collapsible>

        <Collapsible trigger="Add additional devices" open={true}>
          <div className="flex justify-center items-center">
            <QR className="" />
            <div>Scan to verify a new device!</div>
          </div>
        </Collapsible>
      </div>
    )
  }
}

export default OptionsContent
import React from "react";
import Collapsible from 'react-collapsible';
import {Accordion} from 'react-bootstrap'
import * as storage from "../utils/storage";
import QR from "./QR"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'



class OptionsContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = async function() {
    const needsCapitals = await storage.getData("capital letters")
    const needsNumbers = await storage.getData("numbers")
    const needsSymbols = await storage.getData("symbols")
    this.setState({
      'capital letters': needsCapitals, 'numbers': needsNumbers, 'symbols': needsSymbols
    })
  }

  handleChange = (e) => {
    const option = e.target.value
    this.props.handleChange(option, !this.state[option])
    this.setState({ [option]: !this.state[option] })
  }

  render() {
    const checkboxes = Object.keys(this.state).map(option => {
      const formattedName = option.charAt(0).toUpperCase() + option.slice(1);
      return (
        <label key="option" className="flex items-center">
          <input className="pw-option mr1" type="checkbox"
            name={formattedName}
            value={option}
            checked={this.state[option]}
            onChange={e => this.handleChange(e)} />
          {formattedName}
        </label>
      )
    })

    return (
      <div className="content">
        <Collapsible trigger="Configure MiMi-generated passwords" open={true}>
          <div className="flex flex-column">
            {checkboxes}
          </div>
        </Collapsible>

        <Collapsible trigger="Add additional devices" open={true}>
          <div className="flex justify-center items-center">
            <QR className="ml-neg15" />
            <div>Scan to verify a new device!</div>
          </div>
        </Collapsible>
      </div>
    )
  }
}

export default OptionsContent
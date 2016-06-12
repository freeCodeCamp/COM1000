import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {
  textToSeed //Converts Text to a number
} from './../libs/seed';

import {} from './../actions';

class ChallengeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="ChallengeSelector">
        <li className = "createNew">
          <div>New Challenge</div>
          <div className = "typeSelector">Type:
            <select>
              <option>HTML</option>
              <option>JS</option>
              <option>STEP</option>
            </select>
          </div>
          <button>Create</button>
        </li>
        {this.props.fileData.challenges.map((challenge) => {
          return(
            <li onClick = {this.props.functions.openChallenge} key = {textToSeed(challenge.title)} data-challenge = {challenge.id} >
              {challenge.title}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ChallengeSelector;
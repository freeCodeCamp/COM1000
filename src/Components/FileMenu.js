import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {
  textToSeed //Converts Text to a number
} from './../libs/seed';

class FileMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const files = (() => {
      return (
        Object.keys(this.props.data).map((key) => {
          return(
            <li key = {textToSeed(key)}>
              <h4>{key.replace(/-/gi, ' ')}</h4>
              <ul>
                {this.props.data[key].map((challenge) => {
                  return(
                    <li
                      onClick = {this.props.functions.loadFile}
                      data-file = {key + '/' + challenge}
                      key = {textToSeed(challenge)}
                    >
                      {challenge.replace(/\.json/gi, '').replace(/-/gi, ' ')}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })
      );
    })();
    return (
      <ul className="FileMenu">
        {files}
      </ul>
    );
  }
}

export default FileMenu;
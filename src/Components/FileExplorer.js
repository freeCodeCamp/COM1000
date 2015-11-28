import React, { Component } from 'react';
import {LeftNav} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';

const leftNavStyle = {
  whiteSpace: 'nowrap',
  fontSize: '12px',
  display: 'block'
};

export default class FileExplorer extends Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  handleSelectedFile() {
    let fileTitle = arguments[2].text;
    console.log(fileTitle);
    $.getJSON('/files/' + fileTitle, (file => {
      this.props.loadFile(file, fileTitle);
    }));
  }

  render() {
    let menuItems = this.props.files.map((elem) => {
      return (
        {text: elem}
      );
    });

    return (
      <LeftNav
        docked={false}
        menuItems = {menuItems}
        ref='fileExplorer'
        style = {leftNavStyle}
        onChange = {this.handleSelectedFile.bind(this)}
      >
      </LeftNav>
    );
  }
}

FileExplorer.propTypes = {
  files: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  loadFile: React.PropTypes.func.isRequired
};

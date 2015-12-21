import React, { Component } from 'react';
import {LeftNav} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';

const leftNavStyle = {
  whiteSpace: 'nowrap',
  fontSize: '12px',
  display: 'block',
  top: '50px'
};

export default class FileExplorer extends Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  handleSelectedFile() {
    console.log(arguments);
    let fileTitle = arguments[2].text;
    $.getJSON('/files/' + fileTitle, (file => {
      this.props.loadFile(file, fileTitle);
    }));
  }

  render() {
    console.log(this.props.files);
    let headers = Object.keys(this.props.files);
    let menuItems = [];
    headers.forEach(key => {
      this.props.files[key].forEach(elem => {
        menuItems.push({text: `${key}/${elem}`});
      });
    });
    // let menuItems = this.props.files.map((elem) => {
    //   return (
    //     {text: elem}
    //   );
    // });

    return (
      <LeftNav docked={false}
        menuItems = {menuItems}
        onChange = {this.handleSelectedFile.bind(this)}
        ref='fileExplorer'
        style = {leftNavStyle}
        />
    );
  }
}

FileExplorer.propTypes = {
  files: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  loadFile: React.PropTypes.func.isRequired
};

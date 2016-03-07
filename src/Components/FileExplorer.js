import React, { Component } from 'react';
import {LeftNav} from 'material-ui';
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
  }

  handleSelectedFile() {
    let fileTitle = arguments[2].text;
    let fileDirectory = arguments[2].directory;
    $.getJSON(`/files/${fileDirectory}/${fileTitle}`, (file => {
      this.props.loadFile(file, fileTitle, fileDirectory);
    }));
  }

  render() {
    let headers = Object.keys(this.props.files);
    let menuItems = [];
    headers.forEach(key => {
      this.props.files[key].forEach(elem => {
        menuItems.push({text: elem, directory: key});
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

import React, { Component } from 'react';
import { loadFileExplorer } from './../actions/editorActions';
import { LeftNav, MenuItem } from 'material-ui';
import $ from 'jquery';

const leftNavStyle = {
  fontSize: '12px',
  whiteSpace: 'nowrap',
  display: 'flex'
};

export default class FileExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    };
  }

  handleSelectedFile() {
    this.refs.fileExplorer.toggle();
    console.log(arguments);
  }

  componentWillReceiveProps() {
    let menuItems = this.props.files.map((elem, index) => {
      return (
          <MenuItem index={index}
        onClick={this.handleSelectedFile}>
          {elem}
        <MenuItem />
      );
    });
    this.setState(menuItems);
  }

  componentWillMount() {
    const dispatch = this.props.dispatch;
    $.getJSON('/files', (files) => {
      loadFileExplorer(dispatch, files);
    });
  }

  render() {
    return (
        <LeftNav docked={false}
                 ref='fileExplorer'
                 style={leftNavStyle}>
          {this.state.menuItems}
        <LeftNav />
    );
  }
}

FileExplorer.propTypes = {
  files: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

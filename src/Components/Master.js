import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './../style.css';

import FileMenu from './FileMenu';
import ChallengeSelector from './ChallengeSelector';

import {
  loadFileTree,
  loadFile,
  loadChallenge
} from './../actions';

const getJSON = $.getJSON;
const connector = connect(function(state, props) {
  return(state);
});

class Master extends Component {
  constructor(props) {
    super(props);

    this.doLoadFileTree = this.doLoadFileTree.bind(this);
    this.doLoadFile = this.doLoadFile.bind(this);
    this.doOpenChallenge = this.doOpenChallenge.bind(this);

    this.init = false;
  }

  doOpenChallenge(e) {
    const disp = this.props.dispatch;
    const filePath = this.props.currentFile.split('/');
    const newChallenge = this.props.loadedFiles[filePath[0]][filePath[1]].challenges.reduce((x,y) => {
      if(x && x.id && x.id === e.target.dataset.challenge) {
        return(x);
      }
      else if(y && y.id && y.id === e.target.dataset.challenge) {
        return(y);
      }
      else {
        return(null);
      }
    });
    loadChallenge(disp, {
      currentChallenge: {
        id: newChallenge.id,
        name: newChallenge.title,
        data: newChallenge
      }
    });
  }

  doLoadFile(e) {
    const disp = this.props.dispatch;
    const targetFile = e.target.dataset.file;
    let newFileStore = {};
    getJSON('/files/' + targetFile, (data) => {
      const filePath = targetFile.split('/');
      newFileStore[filePath[0]] = {};
      newFileStore[filePath[0]][filePath[1]] = JSON.parse(data);
      loadFile(disp, {currentFile: targetFile, loadedFiles: newFileStore});
    })
  }

  doLoadFileTree() {
    const disp = this.props.dispatch;
    getJSON('/files', (data) => {
      loadFileTree(disp, {files: data});
    });
  }

  render() {
    if (!this.init) {
      this.doLoadFileTree();
      this.init = true;
    }

    let fileData = {challenges: []};
    const fileIndexData = !!this.props.currentFile ? this.props.currentFile.split(/\//gi) : null;

    if(!!this.props.loadedFiles && !!fileIndexData) {
      fileData = this.props.loadedFiles[fileIndexData[0]][fileIndexData[1]]
    }

    const selector = (() => {
      if(this.props.currentFile) {
        return (
          <ChallengeSelector
            fileData={fileData}
            functions = {
              {
                openChallenge: this.doOpenChallenge
              }
            }
          />
        );
      }
      else {
        return(null);
      }
    })();

    if(this.props.currentChallenge) {
      return(
        <div>
          <div onClick = {() => {loadChallenge(this.props.dispatch, {currentChallenge: null})}}>
            Back
          </div>
          Editor
        </div>
      );
    }
    else {
      return (
        <div className="Master">
          <FileMenu
            data={this.props.files}
            functions={
              {
                loadFile: this.doLoadFile
              }
            }
          />
          {selector}
        </div>
      );
    }
  }
}

export default connector(Master);
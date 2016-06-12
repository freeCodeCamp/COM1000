import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './../style.css';

import FileMenu from './FileMenu';
import ChallengeSelector from './ChallengeSelector';
import Editor from './Editor';

import {
  loadFileTree,
  loadFile,
  loadChallenge
} from './../actions';

import {
  textToSeed
} from './../libs/seed';

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
    if(this.props.currentDataSeed && this.props.currentDataSeed !== this.props.savedDataSeed) {
      console.warn('save changes first!');
      return;
    }
    getJSON('/files/' + targetFile, (data) => {
      const filePath = targetFile.split('/');
      newFileStore[filePath[0]] = {};
      newFileStore[filePath[0]][filePath[1]] = JSON.parse(data);
      loadFile(disp, {currentFile: targetFile, loadedFiles: newFileStore, savedDataSeed: textToSeed(JSON.stringify(targetFile)), currentDataSeed: textToSeed(JSON.stringify(targetFile))});
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

    const header = (
      <div className = "header">
        <h3>COM</h3>
        <div className = "headerButton" onClick = {this.doExport}>
          Save
        </div>
      </div>
    );

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
        <div className="Master">
          {header}
          <div className = "banner">
            <div onClick = {() => {loadChallenge(this.props.dispatch, {currentChallenge: null})}}>
              Back
            </div>
          </div>
          <Editor />
        </div>
      );
    }
    else {
      return (
        <div className="Master">
          {header}
          <div className = "inner">
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
        </div>
      );
    }
  }
}

export default connector(Master);
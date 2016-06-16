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
} from './Editors/actions';

import {
  textToSeed
} from './../libs/seed';

const getJSON = $.getJSON;

/*
const connector = connect(function(state, props) {
  return(state);
});
*/

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
    const filePath = this.props.editorReducer.currentFile.split('/');
    const newChallenge = this.props.editorReducer.loadedFiles[filePath[0]][filePath[1]].challenges.reduce((x,y) => {
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
    loadChallenge(disp, newChallenge);
  }

  doLoadFile(e) {
    const disp = this.props.dispatch;
    const targetFile = e.target.dataset.file;
    let newFileStore = {};
    if(
      this.props.editorReducer.currentDataSeed
      && this.props.editorReducer.currentDataSeed !== this.props.editorReducer.savedDataSeed
    ) {
      console.warn('save changes first!');
      return;
    }
    getJSON('/files/' + targetFile, (data) => {
      const filePath = targetFile.split('/');
      newFileStore[filePath[0]] = {};
      newFileStore[filePath[0]][filePath[1]] = JSON.parse(data);
      //console.log(newFileStore);
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
    //console.log(this.props);
    if (!this.init) {
      this.doLoadFileTree();
      this.init = true;
      return(<div></div>);
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
    const fileIndexData = !!this.props.editorReducer.currentFile
      ? this.props.editorReducer.currentFile.split(/\//gi)
      : null;

    if(!!this.props.editorReducer.loadedFiles && !!fileIndexData) {
      fileData = this.props.editorReducer.loadedFiles[fileIndexData[0]][fileIndexData[1]]
    }

    //console.log(fileData);

    const selector = (() => {
      if(this.props.editorReducer.currentFile) {
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

    if(this.props.challengeReducer.id.length > 0) {
      return(
        <div className="Master">
          {header}
          <div className = "banner">
            <div onClick = {() => {loadChallenge(this.props.dispatch, {currentChallenge: null})}}>
              Back
            </div>
          </div>
          <Editor
            currentChallenge = {this.props.challengeReducer}
          />
        </div>
      );
    }
    else {
      return (
        <div className="Master">
          {header}
          <div className = "inner">
            <FileMenu
              data={this.props.editorReducer.files}
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Master);

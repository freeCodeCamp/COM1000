import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  backAction,
  loadFile,
  createChallenge,
  loadChallenge,
  fileSelect
} from './../actions/editorActions';

import $ from 'jquery';

import Menu from './Menu';
import TabBar from './Tabs';
import SelectChallenge from './SelectChallenge';
import Editor from './Editor';

import './../style.css';

const connector = connect(function(state) {
  return (
    state
  );
}, null, null, {pure: false});

class GrandCentralStation extends Component {

  constructor(props) {
    super(props);
    this.backView = this.backView.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileIsSelected = this.handleFileIsSelected.bind(this);
    this.handleChallengeClick = this.handleChallengeClick.bind(this);
  }

  backView() {
    let dispatch = this.props.dispatch;
    backAction(dispatch, {
      view: 'challengeSelect'
    });
  }

  exportFiles() {
    $.post('/export', {
      data: this.props.fileStore,
      success: function(data) {
        console.log(data);
      }
    });
  }

  handleFileSelect(to) {
    let dispatch = this.props.dispatch;
    let fileStore = this.props.fileStore;
    fileSelect(dispatch, {
      activeFile: to,
      challenges: fileStore[to].challenges
    });
  }

  handleFileIsSelected(event) {

    let files = event.target.files;
    for (let i in files) {
      if (files.hasOwnProperty(i)) {
        let file = files[i];
        let reader = new FileReader();
        let dispatch = this.props.dispatch;

        reader.onload = function(upload) {
          let newFileStoreObject = this.props.fileStore;
          newFileStoreObject[file.name] =
            JSON.parse(upload.target.result);

          loadFile(dispatch, {
            fileStore: newFileStoreObject,
            activeFile: file.name,
            challenges: newFileStoreObject[file.name].challenges,
            activeChallenge: {}
          });
        }.bind(this);
        reader.readAsText(file);
      }
    }
  }

  handleChallengeClick(id) {
    let dispatch = this.props.dispatch;

    let oldFileStore = this.props.fileStore;
    let currentFile = this.props.activeFile;

    if (id === 'new') {
      $.getJSON('/mongoid', function(mongoid) {
        mongoid = mongoid.objectId;
        oldFileStore[currentFile].challenges.push({
          'id': mongoid,
          'title': mongoid,
          'description': [
            ''
          ],
          'tests': [
            ''
          ],
          'challengeSeed': [
            ''
          ],
          'MDNlinks': [
            ''
          ],
          'solutions': [
            ''
          ],
          'type': '',
          'challengeType': 0,
          'nameCn': '',
          'descriptionCn': [],
          'nameFr': '',
          'descriptionFr': [],
          'nameRu': '',
          'descriptionRu': [],
          'nameEs': '',
          'descriptionEs': [],
          'namePt': '',
          'descriptionPt': []
        });

        let AddedChallenge = {fileStore: oldFileStore};

        createChallenge(dispatch,
                        AddedChallenge
                       );
      });
    } else {
      loadChallenge(dispatch, {
        'activeChallenge':
        this.props.fileStore[this.props.activeFile]
          .challenges.filter((challenge) => {
            return challenge.id === id;
          }).pop(), 'view': 'ChallengeEdit'
      });
    }
  }

  render() {
    let elements = [];
    let selectChallenges;
    if (this.props !== null && this.props.view === 'ChallengeSelect') {
      elements = [
        {
          name: 'Choose File',
          handleChange: this.handleFileIsSelected
        },
        {
          name: 'Export',
          action: this.exportFiles
        }
      ];
    } else {
      elements = [
        {
          name: 'Choose File',
          handleChange: this.handleFileIsSelected
        },
        {
          name: 'Export',
          action: this.exportFiles
        },
        {
          name: 'Back',
          action: this.backView
        }
      ];
    }

    if (this.props !== null
        && this.props.fileStore
        && Object.keys(this.props.fileStore).length) {
      selectChallenges = (
        <SelectChallenge
          challengeClick = {this.handleChallengeClick}
          data = {this.props.fileStore[this.props.activeFile]}
        />
      );
    }

    let menu =
          <Menu elements = {elements} />;

    let tabs;

    tabs = Object.keys(this.props.fileStore).length === 0 ? ''
      : <TabBar action = {this.handleFileSelect}
           files = {this.props.fileStore} />;

    if (Object.keys(this.props.view === 'ChallengeEdit' &&
                    this.props.activeChallenge).length) {
      return (
          <div className = 'app'>
            <div style = {{ "marginTop": "70px" }}>
              {tabs}
              <Editor id={this.props.activeChallenge.id} />
            </div>
            {menu}
          </div>
      );
    } else {

      return (
          <div className = 'app'>
            <div style = {{ "marginTop": "70px" }}>
              {tabs}
              {selectChallenges}
            </div>
            {menu}
        </div>
      );
    }
  }
}

export default connector(GrandCentralStation);

GrandCentralStation.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fileStore: React.PropTypes.object,
  activeFile: React.PropTypes.string,
  view: React.PropTypes.string.isRequired,
  activeChallenge: React.PropTypes.object
};


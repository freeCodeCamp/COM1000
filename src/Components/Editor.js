import './../../node_modules/codemirror/lib/codemirror.css';
import './../../node_modules/codemirror/theme/monokai.css';
import './../../node_modules/codemirror/addon/scroll/simplescrollbars.css';

import React, {Component} from 'react';
import $ from 'jquery';

import {updateChallenge} from './../actions/editorActions';

import {connect} from 'react-redux';

import CodeMirror from './../../node_modules/codemirror/lib/codemirror';
import './../../node_modules/codemirror/mode/javascript/javascript';
import './../../node_modules/codemirror/mode/xml/xml';
import './../../node_modules/codemirror/mode/css/css';
import './../../node_modules/codemirror/mode/htmlmixed/htmlmixed';
import './../../node_modules/codemirror/addon/edit/closebrackets';
import './../../node_modules/codemirror/addon/edit/matchbrackets';
import './../../node_modules/codemirror/addon/scroll/simplescrollbars';
import './../../node_modules/codemirror/addon/scroll/annotatescrollbar';
import './../../node_modules/codemirror/addon/scroll/scrollpastend';
import './../../node_modules/codemirror/addon/lint/lint';
import './../../node_modules/codemirror/addon/lint/javascript-lint';

const connector = connect(function(state, props) {
  // State from redux
  return (
    {
      challenge: state.challenges.reduce(function(prevC, challenge) {
        if (challenge.id === props.id) {
          return (challenge);
        } else {
          return (prevC);
        }
      }, {}),
      activeFile: state.activeFile
    }
  );
});

class Editor extends Component {

  constructor(props) {
    super(props);

    var codeMirrorData = [];

    var unrenderedCodeMirrors = [];

    this.editorLayout = this.props.editorLayout;

    let layout = {

    };

    for(var header in this.editorLayout){
      layout[header] = [];
    }

    let codeMirrorSkeleton = [];

    for(var layoutObjIndex in this.props.editorLayout){
      var layoutObj = this.props.editorLayout[layoutObjIndex];
      codeMirrorSkeleton = codeMirrorSkeleton.concat(layoutObj);
    }

    codeMirrorSkeleton.shift();

    codeMirrorSkeleton = codeMirrorSkeleton.map((flatLayoutObj) => {
      return(flatLayoutObj.name);
    });

    for (let i in this.props.challenge ) {
      if (i) {
        var challengeDataField = this.props.challenge[i];
        codeMirrorData.push([i, challengeDataField]);
      }
    }

    let codeMirrorDataHeaders = codeMirrorData.map((data) => {
      return(data[0]);
    });

    codeMirrorSkeleton.filter((val) => {
      if(codeMirrorDataHeaders.indexOf(val) < 0) {
        codeMirrorData.push([val, ""]);
      }
    });

    codeMirrorData = codeMirrorData.filter(function(field) {
      return (field[0] !== 'id');
    });

    let finalHTML = [];

    var orderer = {
      "id": 1,
      "title": 2,
      "description": 3,
      "releasedon": 4,
      "head": 5,
      "challengeseed": 6,
      "tail": 7,
      "solutions": 8,
      "tests": 9,
      "type": 10,
      "mdnlinks": 11,
      "challengetype": 12,
      "isbeta": 13,
      "namecn": 14,
      "descriptioncn": 15,
      "namefr": 16,
      "descriptionfr": 17,
      "nameru": 18,
      "descriptionru": 19,
      "namees": 20,
      "descriptiones": 21,
      "namept": 22,
      "descriptionpt": 23
    };

    unrenderedCodeMirrors = codeMirrorData.map(function(data) {

      if (Array.isArray(data[1])) {
        if (data[0] === 'tests') {
          data[1] = data[1].join('EOL\n');
        } else if(data[0] === 'solutions') {
          data[1] = data[1].join('\nEOS\n');
        } else {
          data[1] = data[1].join('\n');
        }
      }
      return (
        <div className = {data[0]} key = {data[0]}>
          <h3>{data[0]}</h3>
          <textarea defaultValue = {data[1]} id = {data[0]} >

          </textarea>
        </div>
      );
    });

    for(var i = 0; i < unrenderedCodeMirrors.length; i++){
      let unrenderedCodeMirror = unrenderedCodeMirrors[i];
      for(var j in this.editorLayout){
        if(this.editorLayout[j].map((head) => {return(head.name)}).indexOf(unrenderedCodeMirror.key) > -1){
          if(layout[j].indexOf(unrenderedCodeMirror) < 0) {
            layout[j].push(unrenderedCodeMirror);
          }
        }
        else {
          if(layout['misc'] && layout['misc'].indexOf(unrenderedCodeMirror) < 0 && layout[j].indexOf(unrenderedCodeMirror) < 0) {
            layout['misc'].push(unrenderedCodeMirror);
          }
        }
      }
    }

    // Hide the broken Misc tag
    delete layout['docs'];
    delete layout['misc'];

    for(var k in layout){
      layout[k].sort(function(a,b){
        if(orderer.hasOwnProperty(a.key.toLowerCase()) && orderer.hasOwnProperty(b.key.toLowerCase())){
          return(orderer[a.key.toLowerCase()]-orderer[b.key.toLowerCase()]);
        }
        return -99;
      });
      finalHTML.push(
        <div className = {"mainEditorTab " + k+"Tab"} data-tab = {k} key = {k}>
          {layout[k]}
        </div>
      );
    }

    this.state = {
      codeMirrorData: codeMirrorData,
      unrenderedCodeMirrors: finalHTML,
      init: false
    };
  }

  toggleTabs(e) {
    $('.mainEditorTab').hide();
    $('.' + e.target.dataset.tab + "Tab").show();
  }

  componentDidMount() {
    let codeMirrors = [];
    const dispatch = this.props.dispatch;
    const challengeId = this.props.challenge.id;
    const activeFile = this.props.activeFile;
    const challengeType = parseInt(this.props.challenge.challengeType);
    const editorLayout = this.editorLayout;

    this.state.codeMirrorData.map(function(codeMirror) {
      // Determine mode
      let mode = 'htmlmixed';
      /* eslint-disable no-fallthrough */
      switch (codeMirror[0]) {
        case 'challengeSeed':
        case 'head':
        case 'tail':
        case 'solutions':
          if (challengeType !== 7 && challengeType !== 5 && challengeType !== 1) {
            mode = 'htmlmixed';
          }
          else {
            mode = 'javascript';
          }
          break;
        case 'tests':
          mode = 'javascript';
          break;
        default:
          mode = 'htmlmixed';
          break;
      }

      let cHeader = "";

      /* eslint-enable no-fallthrough */
      for(var header in editorLayout){
        if(editorLayout[header].map((field) => {return(field.name);}).indexOf(codeMirror[0]) > -1){
          cHeader = header;
        }
      }
      if(document.getElementById(codeMirror[0]) !== null) {
        let editor = CodeMirror.fromTextArea(
          document.getElementById(codeMirror[0]),
          {
            lineNumbers: true,
            mode: mode,
            theme: 'monokai',
            runnable: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            scrollbarStyle: 'simple',
            lineWrapping: true,
            gutters: ['CodeMirror-lint-markers']
          }
        );

        let cData = editorLayout[cHeader].filter((data) => {
          return (data.name === codeMirror[0]);
        })[0];

        editor.setSize(cData.dimens[1], cData.dimens[0]);

        editor.setOption("extraKeys", {
          End: "goLineRight",
          Home: "goLineLeft"
        });
        editor.on('change', function (instance) {
          updateChallenge(dispatch,
            {
              id: challengeId,
              props: {
                [codeMirror[0]]: instance.getValue()
              },
              activeFile: activeFile

            }
          );
        });
        codeMirrors.push(editor);
      }
    });
  }

  render() {
    let tabButtons = [];
    delete this.editorLayout.docs;
    delete this.editorLayout.misc;
    for(var tab in this.editorLayout){
      tabButtons.push(
        <div key = {tab} onClick = {this.toggleTabs} data-tab = {tab} className = "tabSelector">
          {tab.split("_").join(" ")}
        </div>
      );
    }
    if(!this.state.init) {
      setTimeout(() => {
        this.toggleTabs({target: {dataset: {tab: 'meta'}}});
        this.state.init = true;
      }, 200);
    }
    return (
      <div className = "editorContainer">
        <div className = "selectors">
          {tabButtons}
        </div>
        <div className = "tabContainer">
          {this.state.unrenderedCodeMirrors}
        </div>
      </div>
    );
  }
}

export default connector(Editor);

Editor.propTypes = {
  challenge: React.PropTypes.object.isRequired,
  activeFile: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

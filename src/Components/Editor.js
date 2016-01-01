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

    for (let i in this.props.challenge ) {
      if (i) {
        var challengeDataField = this.props.challenge[i];
        codeMirrorData.push([i, challengeDataField]);
      }
    }

    codeMirrorData = codeMirrorData.filter(function(field) {
      return (field[0] !== 'id');
    });

    this.editorLayout = this.props.editorLayout;

    let layout = {

    };

    for(var header in this.editorLayout){
      layout[header] = [];
    }

    let finalHTML = [];

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
        <div key = {data[0]}>
          <h3>{data[0]}</h3>
          <textarea defaultValue = {data[1]} id = {data[0]} ></textarea>
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
          if(layout['misc'].indexOf(unrenderedCodeMirror) < 0 && layout[j].indexOf(unrenderedCodeMirror) < 0) {
            layout['misc'].push(unrenderedCodeMirror);
          }
        }
      }
    }

    for(var k in layout){
      finalHTML.push(
        <div className = {"tab " + k} data-tab = {k} key = {k}>
          {layout[k]}
        </div>
      );
    }

    this.state = {
      codeMirrorData: codeMirrorData,
      unrenderedCodeMirrors: finalHTML
    };
  }

  toggleTabs(e) {
    $('.tab').hide();
    $('.' + e.target.dataset.tab).show();
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

      let cData = editorLayout[cHeader].filter((data) => {return(data.name === codeMirror[0]);})[0];

      editor.setSize(cData.dimens[1], cData.dimens[0]);

      editor.setOption("extraKeys", {
        End: "goLineRight",
        Home: "goLineLeft"
      });
      editor.on('change', function(instance) {
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
    });
    $('.tab').hide();
    $('.meta').show();
  }

  render() {
    let tabButtons = [];
    for(var tab in this.editorLayout){
      tabButtons.push(
        <div key = {tab} onClick = {this.toggleTabs} data-tab = {tab} className = "tabSelector">
          {tab.split("_").join(" ")}
        </div>
      );
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

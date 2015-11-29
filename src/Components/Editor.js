import './../../node_modules/codemirror/lib/codemirror.css';
import './../../node_modules/codemirror/theme/monokai.css';
import './../../node_modules/codemirror/addon/scroll/simplescrollbars.css';

import React, {Component} from 'react';

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

    unrenderedCodeMirrors = codeMirrorData.map(function(data) {
      if (Array.isArray(data[1])) {
        if (data[0] === 'tests') {
          data[1] = data[1].join('EOL\n');
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

    this.state = {
      codeMirrorData: codeMirrorData,
      unrenderedCodeMirrors: unrenderedCodeMirrors
    };
  }

  componentDidMount() {
    let codeMirrors = [];
    const dispatch = this.props.dispatch;
    const challengeId = this.props.challenge.id;
    const activeFile = this.props.activeFile;
    const challengeType = this.props.challenge.challengeType;

    this.state.codeMirrorData.map(function(codeMirror) {
      // Determine mode
      let mode = 'htmlmixed';
      /* eslint-disable no-fallthrough */
      switch (codeMirror[0]) {
        case 'challengeSeed':
        case 'solutions':
        if (challengeType !== 5 && challengeType !== 1) {
          mode = 'htmlmixed';
          break;
        }
        case 'head':
        case 'tail':
        case 'tests':
        mode = 'javascript';
        break;
        default:
        mode = 'htmlmixed';
        break;
      }
      /* eslint-enable no-fallthrough */

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
  }

  render() {
    return (
      <div>
        {this.state.unrenderedCodeMirrors}
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

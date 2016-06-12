import React, {Component} from 'react';

import StepChallengeEditor from './Editors/StepChallengeEditor';

class Editor extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const view = (() => {
      switch (this.props.currentChallenge.challengeType) {
        case 7:
          return(
            <StepChallengeEditor />
          );
          break;
        default:
          return(
            <div className = "normal editor">

            </div>
          );
          break
      }
    })();

    return (
      <div className="Editor">
        {view}
      </div>
    );
  }
}

export default Editor;
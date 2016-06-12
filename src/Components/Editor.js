import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {

} from './../actions';

const connector = connect(function(state, props) {
  return(state);
});

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const view = (() => {
      console.log(this.props.currentChallenge.data.challengeType);
      switch (this.props.currentChallenge.data.challengeType) {
        case 7:
          return(
            <div className = "stepChallengeMode">
              <div className = "title">
                <label htmlFor="title"><h4>Title:</h4></label>
                <input
                  type = "text"
                  name = "tile"
                  placeholder="Title"
                  defaultValue = {this.props.currentChallenge.name}
                />
              </div>
              <div className = "stepCreator">
                <div className = "left"></div>
                <div className = "steps">
                  {this.props.currentChallenge.data.description.map((step) => {
                    return(
                      <div className = "step">
                        <div className = "stepImg">
                          <img src = {step[0]} />
                          <input name = "img" type = "text" placeholder="image URL" defaultValue = {step[0]} />
                        </div>
                        <div className = "stepImgAlt">
                          <label htmlFor="imgAlt"><h5>Image Alt:</h5></label>
                          <input name = "imgAlt" type="text" placeholder="Image Alt" defaultValue = {step[1]} />
                        </div>
                        <div className = "stepDesc">
                          <label htmlFor="desc"><h5>Description:</h5></label>
                          <input name = "desc" type="text" placeholder="Description" defaultValue = {step[2]} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className = "right"></div>
              </div>
            </div>
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

export default connector(Editor);
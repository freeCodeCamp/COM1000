import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  createStep
} from './actions';

class StepChallengeEditor extends Component {
  constructor(props) {
    super(props);

    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.state = {currentStep: 0};
  }

  prevStep() {
    if(this.state.currentStep > 0) {this.setState({currentStep: this.state.currentStep-1})}
  }

  nextStep() {
    if(this.state.currentStep < this.props.currentChallenge.description.length-1) {
      this.setState({
        currentStep: this.state.currentStep+1
      });
    }
    else {
      this.doCreateStep();
    }
  }

  doCreateStep() {
    const disp = this.props.dispatch;
    createStep(disp);
  }

  render() {
    const currentStep = this.props.currentChallenge.description[this.state.currentStep];
    return (
      <div className="StepChallengeEditor stepChallengeMode">
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
          <div className = "left" onClick = {this.prevStep}>

          </div>
          <div className = "steps">
            {((step) => {
              console.log(step[2]);
              return(
                <div className = "step">
                  <div className = "stepImg">
                    <img src = {step[0]} />
                    <input
                      name = "img"
                      type = "text"
                      placeholder="image URL"
                      value = {step[0]}
                      onChange = {() => {}}
                    />
                  </div>
                  <div className = "stepImgAlt">
                    <label htmlFor="imgAlt"><h5>Image Alt:</h5></label>
                    <input
                      name = "imgAlt"
                      type="text"
                      placeholder="Image Alt"
                      value = {step[1]}
                      onChange = {() => {}}
                    />
                  </div>
                  <div className = "stepDesc">
                    <label htmlFor="desc"><h5>Description:</h5></label>
                    <input
                      name = "desc"
                      type="text"
                      placeholder="Description"
                      value = {step[2]}
                      onChange = {() => {}}
                    />
                  </div>
                </div>
              );
            })(currentStep)}
          </div>
          <div className = "right" onClick = {this.nextStep}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = connect(function(state, props) {
  return(state.editorReducer);
});

export default mapStateToProps(StepChallengeEditor);
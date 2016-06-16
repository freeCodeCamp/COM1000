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
    this.mapStepValsToState = this.mapStepValsToState.bind(this);
    this.state = {
      currentStep: 0,
      title: this.props.challengeReducer.title,
      img: props.challengeReducer.description[0][0],
      imgAlt: props.challengeReducer.description[0][1],
      desc: props.challengeReducer.description[0][2]
    };
  }

  mapStepValsToState(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  prevStep() {
    if(this.state.currentStep > 0) {this.setState({currentStep: this.state.currentStep-1})}
    const step = this.props.challengeReducer.description[this.state.currentStep];
    this.setState({
      img: step[0],
      imgAlt: step[1],
      desc: step[2]
    });
  }

  nextStep() {
    if(this.state.currentStep < this.props.challengeReducer.description.length-1) {
      this.setState({
        currentStep: this.state.currentStep+1
      });
    }
    else {
      this.doCreateStep();
    }
    const step = this.props.challengeReducer.description[this.state.currentStep];
    this.setState({
      img: step[0],
      imgAlt: step[1],
      desc: step[2]
    });
  }

  doCreateStep() {
    const last = this.props.challengeReducer.description[this.props.challengeReducer.description.length-1];
    if(last.reduce((x,y) => {return(x+y)}).length !== 0) {
      const disp = this.props.dispatch;
      createStep(disp, {});
      setTimeout(() => {
        this.nextStep();
      }, 100);
    }
  }

  render() {
    //console.log(this.props);
    return (
      <div className="StepChallengeEditor stepChallengeMode">
        <div className = "title">
          <label htmlFor="title"><h4>Title:</h4></label>
          <input
            type = "text"
            name = "title"
            placeholder="Title"
            value = {this.state.title}
            onChange = {this.mapStepValsToState}
          />
        </div>
        <div className = "stepCreator">
          <div className = "left" onClick = {this.prevStep}>

          </div>
          <div className = "steps">
            <div className = "step">
              <div className = "stepImg">
                <img src = {this.state.img} style = {{height: "335px", width: "500px", margin: "10px auto"}} />
                <input
                  name = "img"
                  type = "text"
                  placeholder="image URL"
                  ref = "img"
                  value = {this.state.img}
                  onChange = {this.mapStepValsToState}
                />
              </div>
              <div className = "stepImgAlt">
                <label htmlFor="imgAlt"><h5>Image Alt:</h5></label>
                <input
                  name = "imgAlt"
                  type="text"
                  placeholder="Image Alt"
                  ref = "imgAlt"
                  value = {this.state.imgAlt}
                  onChange = {this.mapStepValsToState}
                />
              </div>
              <div className = "stepDesc">
                <label htmlFor="desc"><h5>Description:</h5></label>
                <input
                  name = "desc"
                  type="text"
                  placeholder="Description"
                  ref = "desc"
                  value = {this.state.desc}
                  onChange = {this.mapStepValsToState}
                />
              </div>
            </div>
          </div>
          <div className = "right" onClick = {this.nextStep}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = connect(function(state, props) {
  return(state);
});

export default mapStateToProps(StepChallengeEditor);

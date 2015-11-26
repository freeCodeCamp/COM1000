import React, { Component } from 'react';
import {connect} from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  },
  buttonStyle: {
    paddingRight: '5px'
  },
  menuStyle: {
    width: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    background: 'white',
    zIndex: '1000'
  }
};

const connector = connect(function(state) {
  return (
    state
  );
}, null, null, {pure: false});

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let MenuElements = this.props.elements.map((elem, ix) => {
      let potentialInput;
      if (elem.name === 'Choose File') {
        potentialInput = (
          <input
            style = {styles.fileInput}
            type = 'file' multiple>
          </input>
        );
      }
      return (
        <span key = { ix }
              style = {styles.buttonStyle}>
        <RaisedButton key = {elem.name}
                      label = { elem.name }
                      onChange = {elem.handleChange}
                      onClick = {elem.action}
        >
          {potentialInput}
        </RaisedButton>
        </span>
      );
    });

    return (
      <div style= {styles.menuStyle}>
        <ul>
          {MenuElements}
        </ul>
      </div>
    );
  }
}

export default connector(Menu);

Menu.propTypes = {
  elements: React.PropTypes.array.isRequired
};


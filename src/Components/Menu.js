import React, { Component } from 'react';
import {connect} from 'react-redux';
import
{ Toolbar,
  ToolbarGroup,
  FlatButton,
  ToolbarTitle
} from 'material-ui';

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
    fontSize: '12px',
    display: 'inline',
    marginLeft: '-25px',
    margineRight: '-25px'
  },
  menuStyle: {
    width: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    background: 'white',
    zIndex: '1000'
  },
  titleStyle: {
    fontSize: '12px'
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
    let MenuElements = this.props.elements.map((elem) => {
      let id = elem.id ? elem.id : null;
      return (
        <FlatButton
          id={id}
          key = {elem.name}
          label = { elem.name }
          onClick = {elem.action}
          style = {styles.buttonStyle}
          />
      );
    });

    return (
      <Toolbar style={styles.menuStyle}>
        <ToolbarGroup float='left' key={0}>
          {MenuElements}
        </ToolbarGroup>
        <ToolbarGroup float='right' key={1}>
          <ToolbarTitle
            style={styles.titleStyle}
            text= {this.props.activeFile}
            />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connector(Menu);

Menu.propTypes = {
  elements: React.PropTypes.array.isRequired,
  activeFile: React.PropTypes.string
};

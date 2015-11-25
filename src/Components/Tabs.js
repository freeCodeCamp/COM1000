import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/lib/tabs';

export default class TabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {'activeTab': '', 'tabChange': function() {
      this.props.action((arguments[1].split(/\=1\$/gi)[1])
        .replace(/\=01/gi, '.'));
      this.setState({'activeTab': (arguments[1]
        .split(/\=1\$/gi)[1]).replace(/\=01/gi, '.')});
    }};
  }

  render() {
    let fileNames = [];
    let FileElements = [];
    for (let i in this.props.files) {
      let file = this.props.files[i];
      if (file !== undefined) {
        fileNames.push(i);
        FileElements.push(
          <Tab key= { i }
               label = { i }
               onClick = {this.state.tabChange.bind(this)}
               value = { i }
          >
            {file.name}
          </Tab>
        );
      }
    }
    return (
      <Tabs onActive = { this.props.action }
            valueLink={{value: this.state.activeTab,
                    requestChange: function() {console.log('tab changes');}}
                  }>
        {FileElements}
      </Tabs>
    );
  }
}

TabBar.propTypes = {
  action: React.PropTypes.func.isRequired,
  files: React.PropTypes.object.isRequired
};


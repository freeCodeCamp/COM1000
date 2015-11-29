import React, {Component} from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class SelectChallenge extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(id) {
    this.props.challengeClick(id);
  }

  render() {
    let data = this.props.data.challenges.map((challenge) => {
      return (
        <ListItem
          data-challengid = {challenge.id}
          key = {challenge.id}
          onClick = {this.handleClick.bind(this, challenge.id)}
          primaryText = {challenge.title}
        />
      );
    });

    return (
      <List>
        {data}
        <ListItem
          data-challengid = 'new'
          key = 'new'
          onClick = {this.handleClick.bind(this, 'new')}
          primaryText = 'Create new'
        />
      </List>
    );
  }
}

SelectChallenge.propTypes = {
  challengeClick: React.PropTypes.func,
  data: React.PropTypes.object
};

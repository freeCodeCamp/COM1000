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
        <ListItem key = {challenge.id}>
          <div style = {{width: '100%', display: 'flex'}}>
            <div data-challengid = {challenge.id} onClick = {this.handleClick.bind(this, challenge.id)} style = {{flex: "1 1 auto"}}>{challenge.title}</div>
            <button data-challengid = {challenge.id} onClick = {this.props.handleChallengeDupe} style = {{flex: "0 0 auto"}}>Copy</button>
          </div>
        </ListItem>
      );
    });

    return (
      <List>
        <ListItem
          data-challengid = 'new'
          key = 'new'
          onClick = {this.handleClick.bind(this, 'new')}
          primaryText = 'Create new'
        />
        {data}
      </List>
    );
  }
}

SelectChallenge.propTypes = {
  challengeClick: React.PropTypes.func,
  data: React.PropTypes.object
};

import test from 'tape';
import reducer from '../src/reducers/reducer';

const setup = () => {
  const fixtures = {
    _action: { type: 'Test'},
    _state: {
      'fileStore': {},
      'activeFile': '',
      'activeChallenge': {},
      'view': 'ChallengeSelect'
    }
  };
  return fixtures;

};


test('should return a default state if none is provided', (t) => {
  let fixtures = setup();
  const undefinedState = undefined;

  // t.plan() says how many assertions we're going to run for this test
  t.plan(1);
  t.deepEqual(reducer(undefinedState, fixtures._action), fixtures._state);
});

test('should return a new state upon a valid action type', (t) => {
  const fixtures = setup();
  let action = fixtures._action;
  let state = fixtures._state;
  action.type = 'backAction';
  const returnedState = reducer(state, action);

  t.plan(1);
  t.notEqual(returnedState, state);
});


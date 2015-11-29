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

test('reducer.spec', (t) => {

  t.test('reducer should return a default state if none is provided', (t) => {
    let fixtures = setup();
    const undefinedState = undefined;
    const actual = reducer(undefinedState, fixtures._action);
    const expected = fixtures._state;

    t.deepEqual(actual, expected, 'reducer returns a default state');
    t.end();
  });

  t.test('reducer should return a new state upon a valid action type', (t) => {
    const fixtures = setup();
    let action = fixtures._action;
    action.type = 'backAction';
    const actual = reducer(fixtures._state, action);
    const expected = fixtures._state;

    t.notEqual(actual, expected,
      'reducer returns a new state if action is valid');
    t.end();
  });

  t.test('reducer should return previous state on invalid action', (t) => {
    const fixtures = setup();
    const action = {type: 'nonsense'};
    const actual = reducer(expected, action);
    const expected = fixtures._state;

    t.deepEqual(actual, expected,
      'reducer returns previous state if the action is invalid');
    t.end();
  });
  t.end();
});

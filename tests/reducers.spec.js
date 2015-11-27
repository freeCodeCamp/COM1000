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

test('#reducer.spec', (t) => {

  t.test('Test 1 should return a default state if none is provided', (t) => {
    let fixtures = setup();
    const undefinedState = undefined;
    const actual = reducer(undefinedState, fixtures._action);
    const expected = fixtures._state;

    // t.plan() says how many assertions we're going to run for this test
    t.plan(1);
    t.deepEqual(actual, expected);
  });

  t.test('Test 2 should return a new state upon a valid action type', (t) => {
    const fixtures = setup();
    let action = fixtures._action;
    action.type = 'backAction';
    const actual = reducer(fixtures._state, action);
    const expected = fixtures._state;

    t.plan(1);
    t.notEqual(actual, expected);
  });

  t.test('Test 3 should return previous state on invalid action', (t) => {
    const fixtures = setup();
    const action = {type: 'nonsense'};
    const actual = reducer(expected, action);
    const expected = fixtures._state;
    t.plan(1);
    t.deepEqual(actual, expected);
  });
  t.end();
});


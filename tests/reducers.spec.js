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


test('reducer.spec: Test 1 should return a default state if none is provided',
     (t) => {
  let fixtures = setup();
  const undefinedState = undefined;

  // t.plan() says how many assertions we're going to run for this test
  t.plan(1);
  t.deepEqual(reducer(undefinedState, fixtures._action), fixtures._state);
});

test('reducer.spec: Test 2 should return a new state upon a valid action type',
     (t) => {
  const fixtures = setup();
  let action = fixtures._action;
  let state = fixtures._state;
  action.type = 'backAction';
  const returnedState = reducer(state, action);

  t.plan(1);
  t.notEqual(returnedState, state);
});

test('reducer.spec: Test 3 should return previous state on invalid action',
     (t) => {
  const fixtures = setup();
  const action = {type: 'nonsense'};
  const expected = fixtures._state;
  const actual = reducer(expected, action);
  t.plan(1);
  t.deepEqual(expected, actual);
});


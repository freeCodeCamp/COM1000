import reducer from '../src/reducers/reducer';
import chai, {expect} from 'chai';
import fuzzy from 'chai-fuzzy';

chai.use(fuzzy);

describe('Reducer', () => {

  let _state, _action;

  beforeEach(() => {
    _state = {
      'fileStore': {},
      'activeFile': '',
      'activeChallenge': {},
      'view': 'ChallengeSelect'
    };
    _action = {type: 'Test'};
  });

  it('should return a default state if none is provided', () => {
    const undefinedState = undefined;
    expect(reducer(undefinedState, _action)).to.like(_state);
  });

  it('should return a new state upon a valid action type', () => {
    _action = {type: 'backAction'};

    const returnedState = reducer(_state, _action);
    expect(returnedState).to.not.equal(_state);
  });
});


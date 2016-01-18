const initialState = {
  'fileStore': {},
  'activeFile': '',
  'activeChallenge': {},
  'view': 'ChallengeSelect'
};

function parser(key) {
  switch (key) {
    case 'description':
    case 'descriptionEs':
    case 'descriptionRu':
    case 'descriptionCn':
    case 'descriptionFr':
    case 'head':
    case 'tail':
    case 'challengeSeed':
    case 'MDNlinks':
      return function(val) { return val.split('\n'); };
    case 'solutions':
      return function(val) { return val.split(/\s*EOS\s*/); };
    case 'tests':
      return function(val) { return val.split(/\s*EOL\s*/); };
    case 'challengeType':
      return function(val) { return(parseInt(val)); };
    default:
      return function(val) { return val; };
  }
}

export default function(prevState = initialState, action) {
  switch (action.type) {

    case 'updateChallenge':
      let challenges = prevState.challenges.slice();
      challenges = challenges.map(function(challenge) {
        if (challenge.id === action.payload.id) {
          Object.keys(action.payload.props).forEach(function(key) {
            action.payload.props[key] = parser(key)(action.payload.props[key]);
          });
          return Object.assign({}, challenge, action.payload.props);
        }
        return (challenge);
      });
      let nextState = Object.assign({}, prevState, {});
      nextState.challenges = challenges;
      nextState.fileStore.challenges = challenges;
      nextState.changes = true;
      return nextState;

    case 'createChallenge':
      return (Object.assign({}, prevState, action.payload));

    case 'loadChallenge':
      return (Object.assign({}, prevState, action.payload));

    case 'loadFile':
      return (Object.assign({}, prevState, action.payload));

    case 'fileSelect':
      return (Object.assign({}, prevState, action.payload));

    case 'backAction':
      return (Object.assign({}, prevState, action.payload));

    case 'loadFileExplorer':
      return (Object.assign({}, prevState, action.payload));

    case 'fileSaved':
      let newState = Object.assign({}, prevState, {});
      newState.changes = false;
      return newState;

      default:
        return (prevState);
  }
}

const initialState = {
  'fileStore': {},
  'activeFile': '',
  'activeChallenge': {},
  'view': 'ChallengeSelect',
  'files': []
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
    case 'solutions':  // NOTE:  This only works for one solution
      return function(val) { return val.split('\n'); };
    case 'tests':
      return function(val) { return val.split('EOL\n'); };
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

      let fileStore = prevState.fileStore;
      let newFileStore = fileStore[prevState.activeFile];

      newFileStore.challenges = challenges;

      fileStore[prevState.activeFile] = newFileStore;
      let newState = prevState;
      newState.challenges = challenges;
      Object.assign({}, newState, newFileStore);

      return (Object.assign({}, prevState, newState));

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

    default:
      return (prevState);
  }
}

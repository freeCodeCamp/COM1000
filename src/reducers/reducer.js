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
    case 'solutions':
      // NOTE:  This only works for one solution
      //return function(val) { return val.split('\n'); };
      return function(val) { var data = JSON.parse(val).map(function(solution){ return (solution); }); console.log(data); return(data);};
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
    let nextState = Object.assign({}, prevState, {});
    nextState.challenges = challenges;
    nextState.fileStore.challenges = challenges;
    nextState.changes = true;
    return nextState;

    case 'createChallenge':
      return (Object.assign({}, prevState, action.payload));

    case 'loadChallenge':
      let cData = Object.assign({}, prevState, action.payload);
      if(typeof cData.activeChallenge.solutions !=='undefined'){
        if(Array.isArray(cData.activeChallenge.solutions)){
          cData.activeChallenge.solutions = cData.activeChallenge.solutions.map(function(solution){
            return JSON.stringify(solution);
          });
        }
        else {
          console.error('Passed solutions field is not an array', "something went wrong", "received:", cData.activeChallenge.solutions);
        }
        cData.activeChallenge.solutions = JSON.stringify(cData.activeChallenge.solutions);
      }
      console.log(cData.activeChallenge.solutions);
      return (cData);

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

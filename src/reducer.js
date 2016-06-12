const initialState = {
  files: {},
  loadedFiles: {},
  currentFile: null,
  currentChallenge: null,
  view: 'ChallengeSelect'
};

export default function(prevState = initialState, action) {
  switch (action.type) {
    case 'loadFileTree':
    case 'loadFile':
    case 'loadChallenge':
      return(Object.assign({}, prevState, action.payload));
    default:
      return (prevState);
  }
}

const initialState = {
  files: {},
  loadedFiles: {},
  currentFile: null,
  savedDataSeed: null,
  currentDataSeed: null
};

export default function(prevState = initialState, action) {
  switch (action.type) {
    case 'loadFileTree':
    case 'loadFile':
      return(Object.assign({}, prevState, action.payload));
      break;
    default:
      return (prevState);
  }
}

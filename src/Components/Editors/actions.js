export function loadFileTree(dispatch, payload) {
  dispatch({
    type: 'loadFileTree',
    payload
  });
}

export function loadFile(dispatch, payload) {
  dispatch({
    payload,
    type: 'loadFile'
  });
}

export function loadChallenge(dispatch, payload) {
  dispatch({
    command: 'loadChallenge',
    payload,
    type: 'action'
  });
}

export default {
  loadFileTree: loadFileTree,
  loadFile: loadFile,
  loadChallenge: loadChallenge
};

export function loadFileTree(dispatch, payload) {
  dispatch({
    type: 'loadFileTree',
    payload
  });
}

export function loadFile(dispatch, payload) {
  dispatch({
    type: 'loadFile',
    payload
  });
}

export function loadChallenge(dispatch, payload) {
  dispatch({
    type: 'loadChallenge',
    payload
  });
}

export default {
  loadFileTree: loadFileTree,
  loadFile: loadFile,
  loadChallenge: loadChallenge
};

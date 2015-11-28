export function backAction(dispatch, payload) {
  dispatch({
    type: 'backAction',
    payload
  });
}

export function loadFile(dispatch, payload) {
  dispatch({
    type: 'loadFile',
    payload
  });
}

export function createChallenge(dispatch, payload) {
  dispatch({
    type: 'createChallenge',
    payload
  });
}

export function loadChallenge(dispatch, payload) {
  dispatch({
    type: 'loadChallenge',
    payload
  });
}

export function fileSelect(dispatch, payload) {
  dispatch({
    type: 'fileSelect',
    payload
  });
}

export function updateChallenge(dispatch, payload) {
  dispatch({
    type: 'updateChallenge',
    payload
  });
}

export function exportChallenge(payload) {
  return {
    type: 'exportChallenge',
    payload
  };
}

export function loadFileExplorer(dispatch, payload) {
  dispatch({
    type: 'loadFileExplorer',
    payload
  });
}

export function fileSaved(dispatch) {
  dispatch({
    type: 'fileSaved'
  });
}

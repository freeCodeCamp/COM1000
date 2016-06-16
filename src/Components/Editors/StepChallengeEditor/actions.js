export function createStep(dispatch, cb) {
  dispatch({
    type: 'action',
    command: 'createStep',
    payload: [
      "",
      "",
      "",
      ""
    ]
  }, cb);
}

export function createStep(dispatch) {
  dispatch({
    type: 'createStep',
    payload: [
      "",
      "",
      "New Title",
      ""
    ]
  })
}

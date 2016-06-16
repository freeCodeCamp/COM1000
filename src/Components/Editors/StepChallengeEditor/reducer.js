const initialState = {};

export default function(prevState = initialState, action) {
  switch (action.command) {
    case 'createStep':
      let copy = Object.assign({}, prevState);
      console.log(action.payload);
      copy.description = [...prevState.description, action.payload];
      console.log(copy);
      let newState = Object.assign({}, prevState, copy);
      return newState;
    default:
      return (prevState);
  }
}

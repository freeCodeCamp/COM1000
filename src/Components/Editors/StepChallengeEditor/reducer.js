const initialState = {
  data: {}
};

export default function(prevState = initialState, action) {
  switch (action.type) {
    case 'createStep':
      return Object.assign({}, prevState, action.payload);
    default:
      return (prevState);
  }
}

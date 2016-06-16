import reducers from './reducers'

// reducers.whatever

const initialState = {
  id: "",
  title: "",
  description: [],
  challengeSeed: [],
  tests: [],
  hints: [],
  type: "",
  challengeType: null
};

const challengeTypes = {
  'HTML': 0,
  'JS': 1,
  'WAYPOINT': 2,
  'ZIPLINE': 3,
  'BASEJUMP': 4,
  'BONFIRE': 5,
  'HIKES': 6,
  'STEP': 7
};

export default function(prevState = initialState, action, cb) {
  if(action.command === 'loadChallenge') {
    return Object.assign({}, prevState, action.payload);
  }
  if (action.type === 'action') {
    switch (Object.assign({}, prevState, action.payload).challengeType){
      case challengeTypes['HTML']:
        // HTML reducer;

        break;
      case challengeTypes['JS']:
        // JS reducer;
        break;
      case challengeTypes['WAYPOINT']:
        // Waypoint reducer;
        break;
      case challengeTypes['ZIPLINE']:
        // Zipline reducer;
        break;
      case challengeTypes['BASEJUMP']:
        // Basejump reducer;
        break;
      case challengeTypes['BONFIRE']:
        // Bonfire reducer;
        break;
      case challengeTypes['HIKES']:
        // Hikes reducer;
        break;
      case challengeTypes['STEP']:
        // Step reducer;
        //return reducers.step;
        //console.log('step called in reducer');
        /*
        * disp(payload, action, command)
        */
        let newState = reducers.step(prevState, action);
        const res = Object.assign({}, prevState, newState);
        return res;
        break;
      default:
        return (prevState);
    }
  }
  else {
    return (prevState);
  }
};

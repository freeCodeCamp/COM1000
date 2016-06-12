import { combineReducers } from 'redux'

import editorReducer from './Components/Editors/reducer'
import stepReducer from './Components/Editors/StepChallengeEditor/reducer'

export default combineReducers({
  editorReducer,
  stepReducer
});
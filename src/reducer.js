import { combineReducers } from 'redux'

import editorReducer from './Components/Editors/reducer'
import challengeReducer from './Components/Editors/challengeReducer'

export default combineReducers({
  editorReducer,
  challengeReducer
});
import { combineReducers } from 'redux';
import user from './user_reducer';
import feedback from './feedback_reducer';

const rootReducer = combineReducers({
    user,
    feedback
});

export default rootReducer;
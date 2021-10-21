import {
    GET_FEEDBACKS,
    DELETE_FEEDBACK
} from '../_actions/types';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'
 

export default function(state={},action){
    switch(action.type){
        case GET_FEEDBACKS:
            return {...state, feedbacks: action.payload.data.list }
        case DELETE_FEEDBACK:
            return state
        default:
            return state
    }
}

const feedbackSelector = (state => state.feedback.feedbacks || [])

const createArraySelector = createSelectorCreator(defaultMemoize, (a, b) => {
    return a.length == b.length &&
        a.every((item, i) => item._id == b[i]._id)
})
export const customFeedbackSelector = createArraySelector(
    feedbackSelector,
    feedbacks => feedbacks
)

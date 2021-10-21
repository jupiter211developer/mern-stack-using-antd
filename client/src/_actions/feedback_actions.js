import axios from 'axios';
import {
    GET_FEEDBACKS,
    DELETE_FEEDBACK
} from './types';
import { FEEDBACK_SERVER } from '../components/Config.js';

export function getFeedbacks() {
    const request = axios.post(`${FEEDBACK_SERVER}/list`, {})
    
    return {
        type: GET_FEEDBACKS,
        payload: request
    }
}

export function deleteFeedback(feedback_id) {
    const request = axios.post(`${FEEDBACK_SERVER}/delete`, { feedback_id })
    
    return {
        type: DELETE_FEEDBACK,
        payload: request
    }
}
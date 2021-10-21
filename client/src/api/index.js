import axios from 'axios'
import { FEEDBACK_SERVER } from '../components/Config.js';

export function createFeedback(data) {
	return axios.post(`${FEEDBACK_SERVER}/create`, data)
}

export function getFeedbacks() {
	return axios.post(`${FEEDBACK_SERVER}/list`, {})
}

export function deleteFeedback(feedback_id) {
	return axios.post(`${FEEDBACK_SERVER}/delete`, { feedback_id })
}
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { Card, Col, Row, message, Rate, Button, Popconfirm } from 'antd';
import { getFeedbacks, deleteFeedback } from '../../../_actions/feedback_actions';
import { customFeedbackSelector } from '../../../_reducers/feedback_reducer';


function Feedbacks() {
    const dispatch = useDispatch()
    const feedbacks = useSelector(customFeedbackSelector)

    useEffect(() => {
        dispatch(getFeedbacks())
            .catch(err => {
                message.error('An error occured while fetching feedbacks.')
            })
    }, [dispatch])

    console.log('rendered')

    return (
        <div className="app">
            <Row gutter={16}>
                <div style={{ background: '#ECECEC', padding: '30px', height: '100%' }}>
                {
                    feedbacks.map((feedback, i) => (
                        <Col span={24} key={i} style={{ padding: '10px' }}>
                            <Card title={feedback.title} bordered hoverable extra={
                                <Popconfirm placement="top" title="Are you sure to delete this feedback?" onConfirm={() => handleDelete(feedback._id)} okText="Yes" cancelText="No">
                                    <Button icon="delete"></Button>
                                </Popconfirm>
                            }>
                                <div> <Rate defaultValue={feedback.star} disabled /> </div>
                                <h4 style={{whiteSpace: 'pre-line'}}>{ feedback.content }</h4>
                            </Card>
                        </Col>
                    ))
                }
                </div>,
            </Row>
        </div>
    )

    function handleDelete(feedback_id) {
        dispatch(deleteFeedback(feedback_id))
            .then((res) => {
                message.success('A feedback was successfully deleted.')
                dispatch(getFeedbacks())
            })
            .catch(err => {
                message.error('An error occured during deleting a user.')
            })
    }
}

export default Feedbacks
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FaCode } from "react-icons/fa";
import { Form, Rate, Button, Input, message } from 'antd'
import { createFeedback } from '../../../api'
const { TextArea } = Input

function FeedbackCreate(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [name, setName] = useState('')
    const [star, setStar] = useState(3)

    const { getFieldDecorator } = props.form
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    }

    return (
        <div className="app">
          <h2>Please leave a feedback.</h2>
          <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
            <Form.Item label="Title">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input your title!' }],
                    onChange: (e) => setTitle(e.target.value),
                    initialValue: title
                })(<Input placeholder="Please input title."/>)}
            </Form.Item>
            <Form.Item label="Content">
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'Please input your content!' }],
                    initialValue: content,
                    onChange: (e) => setContent(e.target.value)
                })(<TextArea placeholder="Please input content."/>)}
            </Form.Item>
            <Form.Item label="Name">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your name!' }],
                    initialValue: name,
                    onChange: (e) => setName(e.target.value)
                })(<Input placeholder="Please input name."/>)}
            </Form.Item>

            <Form.Item label="Rate">
              {getFieldDecorator('star', {
                initialValue: star,
                onChange: (num) => setStar(num)
              })(<Rate />)}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
    )

    function handleSubmit(e) {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
            createFeedback(values)
                .then(res => {
                    message.success('A feedback has successfully created.')
                    props.history.push('/feedbacks')
                })
                .catch(err => {
                    message.error('An error occured while creating a feedback.')
                })
        })
    };
}

export default withRouter(Form.create({ name: 'validate_other' })(FeedbackCreate))
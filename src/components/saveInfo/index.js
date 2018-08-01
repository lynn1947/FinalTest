import React from 'react'
import {Form, Input, Button} from 'antd'
import './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const commitLayout ={
    labelCol:{
        span: 8
    },
    wrapperCol: {
        span:16
    }
}

class SaveInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    handleCommit=()=>{
        const {getFieldValue} = this.props.form
        console.log(getFieldValue('commitInfo'))
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="saveInfo">
                <FormItem label="commit messages" {...commitLayout}>
                    {
                        getFieldDecorator('commitInfo',{
                            rules:[{
                                required: true,
                                message: 'commit messages is required'
                            }]
                        })( <TextArea col='3'  className="message-textarea"/>)
                    }
                </FormItem>
                <div className="saveInfo-submit">
                    <Button type="primary" onClick={this.handleCommit}>保存</Button>
                </div>
            </div>
        )
    }
}

export default Form.create()(SaveInfo)
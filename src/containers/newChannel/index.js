import React from 'react'
import {Form,Input, Button, Icon} from 'antd'
import './index.less'


const FormItem = Form.Item 
const inputLayout = {
    labelCol: {
        span:8
    },
    wrapperCol: {
        span:12 
    },
}
const tipLayout = {
    labelCol:{
        span:8
    },
    wrapperCol: {
        span:12
    },
}

class NewChannel extends React.Component {
    constructor(props){
        super(props)
    }

    handleSubmit =()=> {
        const {getFieldValue} = this.props.form
        console.log(getFieldValue('channelname'))
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return <div className="channelName">
           <Form>
                <FormItem label="ChannelName" {...inputLayout} style={{marginBottom:0}}>
                    {
                        getFieldDecorator('channelname',{
                            rules:[{
                                required: true,
                                message: "channelname is required",
                            }],
                        })( <Input className="channelName-input"/>)
                    }
                </FormItem>
                <div className="channelName-tip">
                    <Icon type="exclamation-circle-o" />
                    <p >文件名即channel名，谨慎选取您的channel名</p>
                </div>
                <div className="channelName-submit"><Button className="channelName-submit-button" type="primary" onClick={this.handleSubmit}>提交</Button></div>
           </Form>
        </div>
    }
}

export default Form.create({})(NewChannel)


 // 页面需要和redux进行联系，新增的
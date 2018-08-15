import React from 'react'
import {Form,Input, Button, Icon} from 'antd'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
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

class NewChannelPage extends React.Component {
    constructor(props){
        super(props)
    }

    handleSubmit =()=> {
        const {getFieldValue} = this.props.form
        const channelName = getFieldValue('channelname')
        const articlename = getFieldValue('articlename')


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
                <FormItem label="articlelName" {...inputLayout} style={{marginBottom:0}}>
                    {
                        getFieldDecorator('articlename',{
                            rules:[{
                                required: true,
                                message: "article name is required",
                            }],
                        })( <Input className="articleName-input"/>)
                    }
                </FormItem>
                <div className="channelName-submit"><Button className="channelName-submit-button" type="primary" onClick={this.handleSubmit}>提交</Button></div>
           </Form>
        </div>
    }
}

const NewChannel = Form.create({})(NewChannelPage)
export default connect((state)=>{
    return {
        ...state.channelList
    }
},actions)(NewChannel)


 // 页面需要和redux进行联系，新增的 
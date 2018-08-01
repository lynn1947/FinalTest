import React from 'react'
import {Input} from 'antd'
import './index.less'

const { TextArea } = Input

class ChatPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<div className="chatpane">
            <div className="upper">
                <div className="upper-head">
                    <h3 className="upper-head-title">讨论</h3>
                    <div className="upper-head-tip"><p>---良好的沟通是协同的基础</p></div>
                </div>
                <div className="upper-messages">
                    消息列表
                </div>
            </div>
            <div className="bottom"> 
                <TextArea  
                    className="bottom-input"
                    placeholder="此处输入你的消息。。" 
                />
            </div>
        </div>)
    }
}

export default ChatPane

// 聊天面板，包含聊天情况和聊天输入框
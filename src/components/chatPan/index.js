import React from 'react'
import {Input} from 'antd'
import './index.less'

const { TextArea } = Input

class ChatPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMessage: ''
        }
    }

    handleMessageChange =(e)=> {
        this.setState({
            inputMessage:e.target.value
        })
    }

    handlePressEnter =(e)=> {
        console.log(e.target.value)
        this.setState({
            inputMessage: ''
        })
        e.preventDefault()
    }

    render() {
        const {inputMessage} = this.state
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
                    value={inputMessage}
                    onChange={this.handleMessageChange}
                    onPressEnter={this.handlePressEnter}
                />
            </div>
        </div>)
    }
}

export default ChatPane

// 聊天面板，包含聊天情况和聊天输入框
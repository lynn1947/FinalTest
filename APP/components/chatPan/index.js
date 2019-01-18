import React from 'react'
import {Input, Popover, Avatar} from 'antd'
import './index.less'

const { TextArea } = Input

class ChatPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMessage: '',
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
        const partnerList = [{
            nickname: 'Lynn Xu',
            nodeid:'QmQTALT6UyiUWJYzpWXnjhQcvyX79eLifunyYag5ummffR',
            hex: '040c668ea6546ebef538761e63bf476a5f229a86f1e833b2ada3bbe12c8ff7fb50d8cb49c0ab6ee3a6de21dcddbbabb9592ed6105eb23eb11922824c34969c0e40',
        }]
        return (<div className="chatpane">
            <div className="upper">
                <div className="upper-head">
                    <h3 className="upper-head-title">讨论</h3>
                    <div className="upper-head-tip"><p>---良好的沟通是协同的基础</p></div>
                </div>
                <div className="upper-partnerList">{
                    partnerList && partnerList.map((item)=>{
                        if(item){
                            const content =<div className="upper-partnerList-popover-content">
                                <div>ipfs nodeId: { item.nodeid }</div>
                                <div>orbitdb Hex: {item.hex } </div>
                            </div>
                            return (
                                <Popover 
                                    className="upper-partnerList-popover"
                                    title={`${item.nickname} 信息项`} 
                                    content={content} 
                                >
                                    <Avatar>{item.nickname.slice(0,1)}</Avatar>
                                </Popover>
                            )
                        }else{
                            return ''
                        }

                    })
                }</div>
                <div className="upper-messages">
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
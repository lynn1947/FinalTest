import React from 'react'
import {Modal} from 'antd'
import components from './../../components/index'
import './index.less'

const {ChatPane, SaveInfo, History, QuillEditor} = components

export default class LeftBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveInfo: false,
            showHistory: false,
        }
    }

    render() {
        const {showHistory,showSaveInfo} = this.state
        return (
            <div className="main">
                <div className="main-header">{/*顶部操作栏，新建文件和保存文件以及提供文件的历史记录列表*/}
                        <div className="operation">
                            <a onClick={()=>{this.setState({showSaveInfo: true})}}>保存</a>
                            <a onClick={()=>{this.setState({showHistory: true})}}>历史记录</a>
                        </div>
                        <Modal visible={showSaveInfo} footer={null} title="保存 channel1" onCancel={()=>{this.setState({showSaveInfo: false})}}><SaveInfo /></Modal>
                        <Modal visible={showHistory} footer={null} title="channel1 历史记录" 
                            onCancel={()=>{this.setState({showHistory: false})}}
                            width={1200}
                        ><History /></Modal> {/*文件名写入到modal的title中*/}
                </div>
                <div className="main-body">
                    <div className="main-body-left">
                        <QuillEditor />
                    </div>
                    <div className="main-body-right">
                        <ChatPane />
                    </div>
                </div> 
        </div>)
    }
}


// 右侧页面主题，包含文本编辑面板和聊天面板
// 检测url，根据url决定加载文件内容和历史聊天内容。还要加载聊天内容。有点烦！
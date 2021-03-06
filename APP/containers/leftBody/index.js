import React from 'react'
import {Modal} from 'antd'
import components from './../../components/index'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
import './index.less'

const {ChatPane, SaveInfo, History, QuillEditor} = components

class LeftBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveInfo: false,
            showHistory: false,
            roomName: '',
            channelName: ''
        }
    }

    async componentDidMount() {
        // open filedb
        // joinChannel
        // 实现的思路是，当当前有channnel on show的话，那么应该是要先关闭的，问题是如何完成？
        // 替换之前检查是否和当前的channelOnshow一致？不一致肯定是要检查的，但是并没有解决当前页面需要先关闭之前的文件数据表问题
        //  const { channelOnShow, pubInstance  } = this.props
        const { pubInstance } = this.props
        const {ipfsNode, orbitCore, orbitNode } = pubInstance
        const channelOnShow = {
             channelName: 'testChannel',
             channelAddr: '/orbitdb/QmbAdwzv9mwefhe5MFq8ShGs96nQNnSSHcPaGCcopG51Nk/555',
         }
         const channelName = channelOnShow.channelName
         const channelAddr = channelOnShow.channelAddr
        
         try{
            const fileStore =  await orbitNode.open(channelAddr)
            // let roomName = fileStore.get('roomName')
            let roomName = 'testRoomName'
            if(roomName){
                this.setState({roomName, channelName})
            }  
         }catch(err){
             console.log(err)
         }
         
    }

    render() {
        const {showHistory,showSaveInfo, roomName, channelName} = this.state
        console.log(channelName, roomName)
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
                        <QuillEditor ipfs={this.props.pubInstance.ipfsNode} roomName={roomName} channelName={channelName}/>
                    </div>
                    <div className="main-body-right">
                        <ChatPane />
                    </div>
                </div> 
        </div>)
    }
}

export default connect((state)=>{
    return {
        ...state.LeftBody,
        ...state.login,
        ...state.mainLayout

    }
},actions)(LeftBody)


// 右侧页面主题，包含文本编辑面板和聊天面板
// 检测url，根据url决定加载文件内容和历史聊天内容。还要加载聊天内容。有点烦！
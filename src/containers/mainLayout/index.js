import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Layout,Icon, Modal } from 'antd'
import components from './../../components/index'
import LeftBody from './../leftBody/index'
import './index.less'

const {ChannelDetail, NewChannel, HomeInfo, NewFile, History, SaveInfo} = components
const { Header,Content, Footer, Sider } = Layout

export default class MainLayout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showMore: false, // 展示channel信息
            showPlus: false, // 添加channel
            showHome: false, // 展示个人信息
            showOperationBar: false, // 展示操作行，该行只在点击channel名之后展现
            showNewFile: false, // 新建文档
            showSaveInfo: false, // 保存
            showHistory: false, // 展示历史记录
           
        }
    }

    handleDelete =()=> {
        console.log("this channel will be deleted")
    }

    render() {
        const { showMore,showPlus,showHome,showNewFile,showHistory,showSaveInfo } = this.state
        const channelList = [{
            channelName: 'channel1',
            channelId: 'id is also a long string',
            channelCreater: {nickName:'creater_name',nodeId:'creater_nodeid'},
            channelJoiner:[{nickName:'joiner1_name',nodeId:'joiner1_nodeid'},{nickName:'joiner2_name',nodeId:'joiner2_nodeid'}],
            article: {filename: 'filename',filehash:"filehash is a very long string"},
            createDate:'2018-07-15 19:00',
        }]
        return <div style={{height:"100%",width:"100%"}}>
            <Layout className="layout">
                <Sider 
                    className="layout-sider"
                > {/*侧栏：channel列表，动态的添加channel来创建文件*/}
                    <div className='sider-header'>
                        <div className="sider-header-logo" />{/*Logo*/}
                        <span className="sider-header-title">IPFS上的协同编辑</span>
                    </div>  
                    <div className="sider-body">
                    {   
                        channelList.map(((item, index)=>{
                            return <div className="sider-body-channelList" key={index}>
                                <Link className="name" to={item.channelName}>{item.channelName}</Link> {/*路由，在此处进入到对应channelName所对应的页面*/}
                                <div className="operation">
                                    <a className="more" onClick={()=>{this.setState({showMore: true})}}>more</a>{/*点击展示channel的详细信息*/}
                                    <a className="close" onClick={this.handleDelte}>delete</a> {/*删除符号，点击后在列表中删除该channel*/}
                                </div>
                                <Modal visible={showMore}
                                    footer={null}
                                    title={`${item.channelName} 基本信息`}
                                    onCancel={()=>{this.setState({showMore: false})}}
                                >
                                    <ChannelDetail info={item}/>
                                </Modal>
                            </div>
                        }))     
                    }
                    </div>
                    <div className="sider-footer">
                        <Icon type="plus" onClick={()=>{this.setState({showPlus: true})}}/> {/*添加新channel*/}
                        <Icon type="home" onClick={()=>{this.setState({showHome:true})}}/> {/*个人信息展示*/}
                        <Icon type="logout" /> {/*退出*/}
                        <Modal visible={showPlus} footer={null} title="New Channel" onCancel={()=>{this.setState({showPlus: false})}}><NewChannel /></Modal>
                        <Modal visible={showHome} footer={null} title="Personal Page" onCancel={()=>{this.setState({showHome: false})}}><HomeInfo /></Modal>
                    </div>
                </Sider>
                <Layout className="layout-main"> {/*主体网页：包含头部的操作栏和主体部分的文本编辑和聊天对话框*/}
                    <Header className="layout-main-header">{/*顶部操作栏，新建文件和保存文件以及提供文件的历史记录列表*/}
                        <div className="operation">
                            <a onClick={()=>{this.setState({showNewFile: true})}}>新建文档</a>
                            <a onClick={()=>{this.setState({showSaveInfo: true})}}>保存</a>
                            <a onClick={()=>{this.setState({showHistory: true})}}>历史记录</a>
                        </div>
                        <Modal visible={showNewFile} footer={null} title="New File" onCancel={()=>{this.setState({showNewFile: false})}}><NewFile /></Modal>
                        <Modal visible={showSaveInfo} footer={null} title="Save Your File" onCancel={()=>{this.setState({showSaveInfo: false})}}><SaveInfo /></Modal>
                        <Modal visible={showHistory} footer={null} title="Edit History" onCancel={()=>{this.setState({showHistory: false})}}><History /></Modal>
                    </Header>
                    <Content className="layout-main-body">
                        {
                            channelList.map((item,index)=>{
                                return <Route exact path={`/${item.channelName}`} key={index} component={LeftBody}/>
                            })
                        }
                    </Content>
                    <Footer className="layout-main-footer">
                        <span>copyright@2018 By北京邮电大学1017</span>
                    </Footer>
                </Layout> 
            </Layout>
        </div>
    }
}
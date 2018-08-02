import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Layout,Icon, Modal, Popconfirm } from 'antd'
import components from './../../components/index'
import LeftBody from './../leftBody/index'
import NewChannel from './../newChannel/index'
import './index.less'

const {ChannelDetail, Welcome} = components
const { Content, Footer, Sider } = Layout

export default class MainLayout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showMore: false, // 展示channel信息
            showPlus: false, // 添加channel
            showOperationBar: false, // 展示操作行，该行只在点击channel名之后展现
        }
    }

    handleDeleteConfirm =()=> {
        // 删除channel的回调，删除channel意味着同时要删除channel当中的文档，删除聊天信息
        // 同时要删除channel中参与协同的节点当中的数据
        console.log("this channel will be deleted")
    }

    render() {
        const { showMore,showPlus} = this.state
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
                                <Link className="name" to={`/mainPage/${item.channelName}`}>{item.channelName}</Link> {/*路由，在此处进入到对应channelName所对应的页面*/}
                                <div className="operation">
                                    <a className="more" onClick={()=>{this.setState({showMore: true})}}>more</a>{/*点击展示channel的详细信息*/}
                                    <Popconfirm 
                                        title="删除该channel将同时删除该channel下的文档，聊天信息，仍旧要删除吗？"
                                        okText="删除" cancelText="取消"
                                        onConfirm={this.handleDeleteConfirm}
                                        placement="bottomRight"
                                        overlayStyle={{width:'200px'}}
                                    >
                                        <a className="close">delete</a> {/*删除符号，点击后在列表中删除该channel*/}
                                    </Popconfirm>
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
                        <Icon type="plus" onClick={()=>{this.setState({showPlus: true})}} style={{cursor:'pointer'}}/> {/*添加新channel*/}
                        <Link to="/personalPage"><Icon type="home" style={{color:'#FFF'}}/></Link> {/*个人信息展示*/}
                        <Link to="/"><Icon type="logout" style={{color:'#FFF'}} /></Link> {/*退出*/}
                        <Modal visible={showPlus} footer={null} title="New Channel" onCancel={()=>{this.setState({showPlus: false})}}><NewChannel /></Modal>
                    </div>
                </Sider>
                <Layout className="layout-main"> {/*主体网页：包含头部的操作栏和主体部分的文本编辑和聊天对话框*/}
                    <Content className="layout-main-body">
                        <Switch>
                            <Route exact path="/mainPage/" component={Welcome} />
                            {
                                channelList.map((item,index)=>{
                                    return <Route path={`/mainPage/${item.channelName}`} key={index} component={LeftBody}/>
                                })
                            }
                        </Switch>
                    </Content>
                    <Footer className="layout-main-footer">
                        <span>copyright@2018 By北京邮电大学1017</span>
                    </Footer>
                </Layout> 
            </Layout>
        </div>
    }
}
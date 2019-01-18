import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Layout,Icon, Modal, Popconfirm } from 'antd'
import components from './../../components/index'
import LeftBody from './../leftBody/index'
import NewChannel from './../newChannel/index'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
import './index.less'

const {ChannelDetail, Welcome} = components
const { Content, Footer, Sider } = Layout

class MainLayout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showMore: false, // 展示channel信息
            showPlus: false, // 添加channel
            emptyChannel: false,
            channelList: [],
        }
        this.userStore = this.props.pubInstance.userStore || null
        this.testChannelList =  [{
            channelName: 'channel1',
            channelAddr: '',
            creator: {nickname:'',hex: '' },
            createDate: '2018-07-15 19:00',
            joiners: [],
            article: {filename: 'testfile',filehash:"QmfYsCfy5SjaWjpQGnpjRfk5g1rFeVhdsWEHQGEJuryGxt"},
        }]
    }

    componentDidMount() {
        const {updateChannelList} = this.props
        try{
            const channelList = this.userStore.get('channelList')
            // if(channelList && channelList.length!==0){
            //     this.setState({
            //         channelList: JSON.parse(channelList),
            //         emptyChannel: false
            //     })
            // }
            this.setState({
                channelList: this.testChannelList,
                emptyChannel: false
            }) 

        }catch(error) {
            // 以弹窗形式提示获取channel失败
            console.error(error)
        }
    }

    handleDeleteConfirm =async (index)=> {
        // 删除数据库，更新页面中显示的列表
        // 更新user数据库中的内容
        const { updateChannelList } = this.props
        const { channelList } = this.state
        if(index !== channelList.length-1){
            const newChannelList = Object.assign({}, channelList.slice(0,index), channelList,slice(index+1))
        }else{
            const newChannelList = Object.assign({}, channelList.slice(0,index))
        }
        this.setState({
            channelList: newChannelList
        })
        await this.userStore.set('channelList', JSON.stringify(newChannelList))
    }

    changeVisible= (stateName, value)=>{
        this.setState({
            [stateName]: value
        })
    }

    enterChannel = (index)=>{
        // 拿到channel数据库，同时写入到redux中
        const { channelOnShow, enterChannel } = this.props
        const { channelList } = this.state
        if(!(channelOnShow && channelOnShow.channelId===channelList[index].channelId)){
            // 当channelOnShow中没有内容或者是channelOnShow发生变化时才会触发redux中的list更新
            enterChannel(channelList[index]) 
        }
    }

    handleExit =()=> {

    }

    render() {
        const { showMore,showPlus, emptyChannel, channelList} = this.state
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
                        !emptyChannel ? channelList.map(((item, index)=>{
                            return <div className="sider-body-channelList" key={index}>
                                <Link to={`/mainPage/${item.channelName}`} className="name" onClick={()=>this.enterChannel(index)}>{item.channelName}</Link>  
                                <div className="operation">
                                    <a className="more" onCancel={()=>{this.changeVisible('showMore', true)}}>more</a>{/*点击展示channel的详细信息*/}
                                    <Popconfirm 
                                        title="删除该channel将同时删除该channel下的文档，聊天信息，仍旧要删除吗？"
                                        okText="删除" cancelText="取消"
                                        onConfirm={()=>this.handleDeleteConfirm(index)}
                                        placement="bottomRight"
                                        overlayStyle={{width:'200px'}}
                                    >
                                        <a className="close">delete</a> {/*删除符号，点击后在列表中删除该channel*/}
                                    </Popconfirm>
                                </div>
                                <Modal visible={showMore}
                                    footer={null}
                                    title={`${item.channelName} 基本信息`}
                                    onCancel={()=>{this.changeVisible('showMore', false)}}
                                >
                                    <ChannelDetail info={item}/>
                                </Modal>
                            </div>
                        }))  : <div className="sider-body-tip">no channels found</div>    
                    }
                    </div>
                    <div className="sider-footer">
                        <Icon type="plus" onClick={()=>{this.changeVisible('showPlus', true)}} style={{cursor:'pointer'}}/> {/*添加新channel*/}
                        <Link to="/personalPage"><Icon type="home" style={{color:'#FFF'}}/></Link> {/*个人信息展示*/}
                        <a onClick={this.handleExit}><Icon type="logout" style={{color:'#FFF'}} /></a> {/*退出*/}
                        <Modal 
                            visible={showPlus} 
                            footer={null} 
                            title="New Channel" 
                            onCancel={()=>{this.changeVisible('showPlus', false)}}
                        ><NewChannel changeVisible={this.changeVisible}/></Modal>
                    </div>
                </Sider>
                <Layout className="layout-main"> {/*主体网页：包含头部的操作栏和主体部分的文本编辑和聊天对话框*/}
                    <Content className="layout-main-body">
                        <Switch>
                            <Route exact path="/mainPage/" component={Welcome} />
                            {
                                channelList.map((item,index)=>{
                                    return <Route path="/mainPage/:channelName" key={index} component={LeftBody} />
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

export default connect((state)=>{
    return {
        ...state.login,
        ...state.mainLayout
    }//觉得这样的设计是有问题的
},actions)(MainLayout)
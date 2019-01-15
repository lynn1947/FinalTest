import React from 'react'
import { Layout, Tabs, Table, Button, Modal } from 'antd'
import components from './../../components/index'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
import './index.less'

const TabPane = Tabs.TabPane
const {Header, Content, Footer} = Layout
const { PartnerTab, FilesTab} = components

class PersonalPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            personalInfo: {},
            fileList: [],
            partnerList: [],
            showHistory: false,
            fileOnshow: 'testfile01'
        }
        this.nickname = ''
        this.orbitHex = ''
    }

    componentDidMount(){
        const { orbitNode } = this.props.pubInstance
    
        this.orbitHex = orbitNode.key.getPublic('hex')

        const partnerList = this.getOrbitInfo().partnerList
        const fileList = this.getOrbitInfo().fileList
        this.setState({
            partnerList: JSON.parse(JSON.stringify(partnerList)),
            fileList: JSON.parse(JSON.stringify(fileList))
        })
        
    }

    getPersonInfo =()=>{
        return {
            ipfsNode: '',
            orbitHex: '',
        }
    } // 事实是，这段的信息在页面初始化时即应该存储于redux中，所以不设这个函数

    getOrbitInfo=()=>{
        return {
            nickname: 'Lynn Xu',
            partnerList: [{
                index: 1,
                nickname:'',
                nodeid:'',
                hex: '',
            }],
            fileList: [{
                index: 1,
                fileName: 'testfile01',
                hash: 'QmfYsCfy5SjaWjpQGnpjRfk5g1rFeVhdsWEHQGEJuryGxt',
                creator: 'test01',
                timestamp: new Date().valueOf(),
                commit: '这是一段测试内容',
            }],
        }
    }

    getHistory =()=>{}

    render() {
        const nickname= "Lynn Xu"
        const { fileList, partnerList, showHistory, fileOnshow } = this.state


        return (
            <Layout className="personalPage">
                <Header className="header">
                    <div className="header-slogan">
                        <div className="header-slogan-logo"/>{/*Logo*/}
                        <p className="header-slogan-title">IPFS上的协同编辑</p>
                    </div>  
                    <div className="header-welcome">
                        <span>{`Welcome, ${nickname}`}</span>
                        <a href="./#/mainPage">返回</a>
                    </div>
                </Header>
                <Content className="content">
                    <div className="content-infocard">
                        <div className="content-infocard-orbit"> 
                            <span>您的orbit hex是：</span>
                            { this.orbitHex}
                        </div>
                    </div>
                    <div className="content-tab">
                        <Tabs >
                            <TabPane tab="历史文件项" key="filesTab">
                                <FilesTab fileList={fileList} getHistory={this.getHistory}/>
                            </TabPane>
                            <TabPane tab="协同好友项" key="pertnerTab">
                                <PartnerTab partnerList={partnerList} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
                <Footer className="footer">
                    <span>copyright@2018 By北京邮电大学1017</span>
                </Footer>
            </Layout>
        )
    }
}

export default connect((state)=>{
    return {
        ...state.login,
    }
},actions)(PersonalPage)
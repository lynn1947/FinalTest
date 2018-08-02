import React from 'react'
import { Layout, Tabs, } from 'antd'
import './index.less'

const TabPane = Tabs.TabPane
const {Header, Content, Footer} = Layout

export default class PersonalPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const nickname= "Lynn Xu"
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
                    <Tabs className="content-tab">
                        <TabPane tab="your files" key="filesTab">
                            <div>your files</div>
                        </TabPane>
                        <TabPane tab="your parterns" key="pertnerTab">
                            <div>your partners</div>
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer className="footer">
                    <span>copyright@2018 By北京邮电大学1017</span>
                </Footer>
            </Layout>
        )
    }
}
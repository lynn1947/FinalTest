import React from 'react'
import {Layout, Menu} from 'antd'

const {Header, Content} = Layout
const MenuItem = Menu.Item

export default class MainLayout extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Layout>
                <Header>
                    <h3>基于区块链的物联网数据管理平台</h3>
                    <Menu >
                        <MenuItem>数据检索</MenuItem>
                    </Menu>
                </Header>
                {this.props.children }
            </Layout>
        )
    }
}
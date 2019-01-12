import React from 'react'
import {Link} from 'react-router-dom'
import {Input, Icon, Button, Modal} from 'antd'
import './index.less'


export default class RegisterUser extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ethAccount: '',
            ethPassword: '',
            repeatEthPassword: '',
            fileAddr: '',
            nickName: '',
            showModal: false
        }
    }

    handleInputChange=(e, property)=>{
        this.setState({
            [property]: e.target.value
        })
    }

    handleSignIn =()=>{   
        window.location.href = './#/mainPage'
    }
 
    render() {
        const { ethAccount, ethPassword, repeatEthPassword, fileAddr, nickName, showModal } = this.state
        return ( 
            <div className="login">
                <div className="loginPage">
                    <div className="loginPage-slogan">
                        <div className="loginPage-slogan-logo" > </div>
                        <p className="loginPage-slogan-title">IPFS上的协同编辑</p>
                    </div>
                    <div className="loginPage-form">
                        <Input 
                            className="loginPage-form-input"
                            placeholder="输入以太坊用户地址"
                            prefix={<Icon type="user" />}
                            value={ethAccount}
                            onChange={(e)=>{this.handleInputChange(e, 'ethAccount')}}
                        />
                        <Input.Password
                            className="loginPage-form-input" 
                            placeholder="输入账号密码"
                            prefix={<Icon type="lock" />}
                            value={ethPassword}
                            onChange={(e)=>{this.handleInputChange(e, 'ethPassword')}}
                        />
                        <Input.Password 
                            className="loginPage-form-input"
                            placeholder="重复输入密码以确认"
                            prefix={<Icon type="lock" />}
                            value={repeatEthPassword}
                            onChange={(e)=>{this.handleInputChange(e, 'repeatEthPassword')}}
                        />
                        <Input 
                            className="loginPage-form-input"
                            placeholder="输入ipfs数据存储地址名称"
                            prefix={<Icon type="folder-open" />}
                            value={fileAddr}
                            onChange={(e)=>{this.handleInputChange(e, 'fileAddr')}}
                        />
                        <Input 
                            className="loginPage-form-input"
                            placeholder="输入昵称，汉字字母均可"
                            prefix={<Icon type="smile" />}
                            value={nickName}
                            onChange={(e)=>{this.handleInputChange(e, 'nickName')}}
                        />
                        <div 
                            className="loginPage-form-login"
                            onClick={this.handleSignIn}
                        ><a>注册</a></div>
                <div className="loginPage-form-tip">
                    没有以太坊账号？不懂合约部署？点击<a onClick={()=>{
                        this.setState({showModal: true})
                    }}>此处</a>查看教程
                </div>
            </div>
        </div>
        <Modal 
            visible={showModal}
            onCancel={()=>{this.setState({showModal: false})}}
        >
            一大段教程
        </Modal>    
        </div>)
    }
}

import React from 'react'
import {Input, Icon, Modal} from 'antd'
import path from 'path'
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import OrbitCore from 'orbit_'
import {connect} from './../../common/util/index'
import configFunc from './../../common/config/index'
import * as actions from './state/action'
import './index.less'

const { genIpfsDaemonSettings, genOrbitSettings} = configFunc

class RegisterUser extends React.Component {
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

    genIpfsSetting =(username, isFirst)=> {
        let ipfsDatadir = path.join('orbit','/'+username,'/ipfs')// 生成形如/orbit/username/ipfs路径
        return Object.assign( {}, genIpfsDaemonSettings(ipfsDatadir, isFirst) ) 
    }

    genOrbitSetting =(username)=> {
        let orbitDatadir = path.join('/orbit/','/'+username) // 生成形如/orbit/username路径
        return Object.assign({}, genOrbitSettings(orbitDatadir))
    }


     handleSignIn = ()=>{
        // 根据username去产生相应的setting
        const {ethAccount, ethPassword, nickName, fileAddr} = this.state
        const { startLogin } = this.props
        const ipfsSetting = this.genIpfsSetting(fileAddr, true) // 注册状态下必须是init一个节点
        const orbitSetting = this.genOrbitSetting(fileAddr)

        const orbitCoreOption = {
            // path where to keep generates keys
            keystorePath: path.join(orbitSetting.OrbitDataDir, "/data/keys"),
            // path to orbit-db cache file
            cachePath: path.join(orbitSetting.OrbitDataDir, "/data/orbit-db"),
            // how many messages to retrieve from history on joining a channel
            maxHistory: 2,
        } 
        const ipfsNode = new IPFS(ipfsSetting)
        ipfsNode.on('ready',async ()=>{
            const orbitNode = new OrbitDB(ipfsNode, orbitSetting.OrbitDataDir)
            const orbitCore = new OrbitCore(ipfsNode,orbitCoreOption)
            console.log(orbitNode)
            console.log(orbitCore)
            
            try{
                const userStore = await orbitNode.create(nickName, 'keyvalue',{
                    overwrite: false,
                })
                //调用合约存储该参数
                const userAdrrString = `/orbit/${userStore.address.root}/${userStore.address.path}` 

                // 存储实例函数，在之后的页面中也有调用
                startLogin({ipfsNode,orbitNode,orbitCore, userStore})
                window.location.href = './#/mainPage'
            }catch(error){
                console.log(error)
            }
        })
    }
 
    render() {
        const { ethAccount, ethPassword, repeatEthPassword, fileAddr, nickName, showModal } = this.state
        return ( 
            <div className="signin">
                <div className="signinPage">
                    <div className="signinPage-slogan">
                        <div className="signinPage-slogan-logo" > </div>
                        <p className="signinPage-slogan-title">IPFS上的协同编辑</p>
                    </div>
                    <div className="signinPage-form">
                        <Input 
                            className="signinPage-form-input"
                            placeholder="输入以太坊用户地址"
                            prefix={<Icon type="user" />}
                            value={ethAccount}
                            onChange={(e)=>{this.handleInputChange(e, 'ethAccount')}}
                        />
                        <Input.Password
                            className="signinPage-form-input" 
                            placeholder="输入账号密码"
                            prefix={<Icon type="lock" />}
                            value={ethPassword}
                            onChange={(e)=>{this.handleInputChange(e, 'ethPassword')}}
                        />
                        <Input.Password 
                            className="signinPage-form-input"
                            placeholder="重复输入密码以确认"
                            prefix={<Icon type="lock" />}
                            value={repeatEthPassword}
                            onChange={(e)=>{this.handleInputChange(e, 'repeatEthPassword')}}
                        />
                        <Input 
                            className="signinPage-form-input"
                            placeholder="输入ipfs数据存储地址名称"
                            prefix={<Icon type="folder-open" />}
                            value={fileAddr}
                            onChange={(e)=>{this.handleInputChange(e, 'fileAddr')}}
                        /> {/*这货是repoName*/}
                        <Input 
                            className="signinPage-form-input"
                            placeholder="输入昵称，汉字字母均可"
                            prefix={<Icon type="smile" />}
                            value={nickName}
                            onChange={(e)=>{this.handleInputChange(e, 'nickName')}}
                        />
                        <div 
                            className="signinPage-form-signin"
                            onClick={this.handleSignIn}
                        >
                            <a>注册</a>
                        </div>
                    <div className="signinPage-form-tip">
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
            <div className="signin-footer">
                        <span>copyright@2018 By北京邮电大学1017</span>
             </div>  
        </div>
    )}
}

export default connect((state)=>{
    return {
        ...state.login
    }
}, actions)(RegisterUser)

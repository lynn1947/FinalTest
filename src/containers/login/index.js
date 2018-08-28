import React from 'react'
import {Input, Icon} from 'antd'
import path from 'path'
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import OrbitCore from 'orbit_'
import {connect} from './../../common/util/index'
import configFunc from './../../common/config/index'
import * as actions from './state/action'
import './index.less'

const { genIpfsDaemonSettings, genOrbitSettings} = configFunc

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            isFirst: true,
            userArray:[]
        }
    }

    componentWillMount() {
        // 获取本地存储username数组
        const userArray = JSON.parse(localStorage.getItem('username'))
        this.setState({
            userArray
        })
    }

    handleInputChange =(e)=> {
        const name = e.target.value
        const {userArray} = this.state
        this.setState({
            username: name
        }) // 同时将根据设定的username判定是否是第一次访问,同时要更新localStorage中的username
        if(userArray !== null&& userArray.indexOf(name)>-1){
            this.setState({
                isFirst: false
            })
        }
    }

    resetUserArray =(username)=>{
        // 根据username的值重新排布localstorgae中的username
        const userArray = this.state.userArray ? this.state.userArray : []
        let newUserArray = []
        if(userArray !== null&& userArray.indexOf(username)>-1){ // 确保userArray存在并且username存在于userArrays
            let userIndex = userArray.indexOf(username)
            if(userIndex == userArray.length-1) {
                newUserArray = newUserArray.concat(userArray) // username正好是userArray的最后一位，则直接复制userArray
            }else{
                newUserArray = newUserArray.concat(userArray.slice(0,userIndex),userArray.slice(userIndex+1),[username])
            }
            console.log(newUserArray)
            localStorage.setItem('username',JSON.stringify(newUserArray))
        }else{ // userArray为空或者不包含username
            userArray.push(username)
            localStorage.setItem('username',JSON.stringify(userArray))
        }
    }

    genIpfsSetting =(username, isFirst)=> {
        let ipfsDatadir = path.join('orbit','/'+username,'/ipfs')// 生成形如/orbit/username/ipfs路径
        return Object.assign( {}, genIpfsDaemonSettings(ipfsDatadir, isFirst) )
    }

    genOrbitSetting =(username)=> {
        let orbitDatadir = path.join('/orbit/','/'+username) // 生成形如/orbit/username路径
        return Object.assign({}, genOrbitSettings(orbitDatadir))
    }

    handleLogin =()=>{   
        // 根据username去产生相应的setting
        const {username, isFirst} = this.state
        const {startLogin, updateFirst} = this.props
        const ipfsSetting = this.genIpfsSetting(username, isFirst)
        const orbitSetting = this.genOrbitSetting(username)
        this.resetUserArray(username) // 存储usename，或者重新排布userArray
        console.log(this.state.isFirst)

        const orbitCoreOption = {
            // path where to keep generates keys
            keystorePath: path.join(orbitSetting.OrbitDataDir, "/data/keys"),
            // path to orbit-db cache file
            cachePath: path.join(orbitSetting.OrbitDataDir, "/data/orbit-db"),
            // how many messages to retrieve from history on joining a channel
            maxHistory: 2,
        } 

        const ipfsNode = new IPFS(ipfsSetting)
        ipfsNode.on('ready',()=>{
            const orbitNode = new OrbitDB(ipfsNode, orbitSetting.OrbitDataDir)
            const orbitCore = new OrbitCore(ipfsNode,orbitCoreOption)
            console.log(orbitNode)
            console.log(orbitCore)
            startLogin({ipfsNode,orbitNode,orbitCore})
            updateFirst(isFirst)
            window.location.href = './#/mainPage'
        })
    }
 
    render() {
        const { username } = this.state
        return (
            <div className="login">
                <div className="loginPage">
                    <div className="loginPage-slogan">
                        <div className="loginPage-slogan-logo" />
                        <p className="loginPage-slogan-title">IPFS上的协同编辑</p>
                    </div>
                    <div className="loginPage-form">
                        <Input 
                            className="loginPage-form-username" 
                            placeholder="input your username"
                            value={username}
                            onChange={e=>this.handleInputChange(e)}
                        />
                        <div className="loginPage-form-tip">
                            <Icon type="exclamation-circle-o" />
                            <span>需要使用Geth与以太坊进行交互，请准备好Geth客户端</span>
                        </div>
                        <div 
                            className="loginPage-form-login"
                            onClick ={this.handleLogin}
                        ><a>Sign In</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        ...state.login
    }
},actions)(Login)


// 无账户密码的登陆过程
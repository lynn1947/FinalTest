import React from 'react'
import {Link} from 'react-router-dom'
import {Input, Icon, Modal, Form} from 'antd'
import path, { resolve } from 'path'
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import OrbitCore from 'orbit_'
import {connect} from './../../common/util/index'
import configFunc from './../../common/config/index'
import * as actions from './state/action'
import FileContract from './../../contract/index'
import './index.less'

const { genIpfsDaemonSettings, genOrbitSettings} = configFunc
const FormItem = Form.Item

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            ethAccount: '',
            ethPassword: '',
            isFirst: true,
            userArray:[],
            showModal: false
        }
    }

    componentWillMount() {
        // 获取本地存储username数组
        const userArray = JSON.parse(localStorage.getItem('username'))
        this.setState({
            userArray
        })
    }

    // 输入未做debunce处理
    handleInputChange =(e, property)=> {
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

    getLoginParams =(ethAccount, ethPassword)=>{
        // 根据输入的以太坊地址和密码解锁相应的账号并且调用登录合约返回相应的地址。
        FileContract.methods.login().call({from:ethAccount}).then(
            function(r){
                if(r){
                    const orbitAddr = r.orbitdbAddr
                    const ipfsId = r.ipfsId
                    const repo = r.repo
                    return { orbitAddr, ipfsId, repo}
                }else{
                    return {
                        orbitAddr:'',
                        ipfsId: '',
                        repo: ''
                    }
                }

            }
        )
    }

    handleLogin =()=>{ 
        const { validateFields } = this.props.form
        const { startLogin } = this.props
        this.props.form.validateFields((error,values)=>{
            if(!error){
                const {ethAccount, ethPassword} = values
                const returnFromContract = this.getLoginParams(ethAccount, ethPassword)
                const ipfsSetting = this.genIpfsSetting(returnFromContract.repo, false)
                const orbitSetting = this.genOrbitSetting(returnFromContract.repo)

                const orbitCoreOption = {
                    // path where to keep generates keys
                    keystorePath: path.join(orbitSetting.OrbitDataDir, "/data/keys"),
                    // path to orbit-db cache file
                    cachePath: path.join(orbitSetting.OrbitDataDir, "/data/orbit-db"),
                    // how many messages to retrieve from history on joining a channel
                    maxHistory: 2,
                }

                const ipfsNode = new IPFS(ipfsSetting)
                ipfsNode.on('ready', async()=>{
                    try{
                        const orbitNode = new OrbitDB(ipfsNode, orbitSetting,orbitDatadir)
                        const orbitCore = new OrbitCore(ipfsNode, orbitCoreOption)
                        const userStore = await orbitNode.open(returnFromContract.orbitAddr)
                        startLogin({ipfsNode,orbitNode,orbitCore, userStore})
                        window.location.href = './#/mainPage'
                    }catch(error){
                        console.log(error)
                    }  
                })

            }else{
                        console.log(error)
                    }  
                })
    }
 
    render() {
        const { username, showModal, ethAccount, ethPassword } = this.state
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
        return (
            <div className="login">
                <div className="loginPage">
                    <div className="loginPage-slogan">
                        <div className="loginPage-slogan-logo" >
                        </div>
                        <p className="loginPage-slogan-title">IPFS上的协同编辑</p>
                    </div>
                    <Form className="loginPage-form">
                        <FormItem>{
                            getFieldDecorator('ethAccount',{
                                rules: [{
                                    required: true,
                                    message: '请输入以太坊账号'
                                }]
                            })(
                                <Input 
                                    className="loginPage-form-input"
                                    placeholder="输入以太坊用户地址"
                                    prefix={<Icon type="user" />}
                                    onChange={(e)=>{this.handleInputChange(e, 'ethAccount')}}
                                />
                            )
                        }</FormItem>
                        <FormItem>{
                            getFieldDecorator('ethPassword',{
                                rules: [{
                                    required: true,
                                    message: '请输入以太坊账号密码'
                                }]
                            })(
                                <Input.Password
                                    className="loginPage-form-input" 
                                    placeholder="输入账号密码"
                                    prefix={<Icon type="lock" />}
                                    onChange={(e)=>{this.handleInputChange(e, 'ethPassword')}}
                                />
                            )
                        }</FormItem>
                        <div 
                            className="loginPage-form-login"
                            onClick ={this.handleLogin}
                        ><a>登录</a></div>
                        <div className="loginPage-form-tip">
                            没有以太坊账号？不懂合约部署？点击<a onClick={()=>{
                                this.setState({showModal: true})
                            }}>此处</a>查看教程
                        </div>
                        <div className="loginPage-form-tip">
                            没有账号？去<Link to="/register">注册</Link>
                        </div>
                    </Form>
                </div>
                <Modal 
                    visible={showModal}
                    onCancel={()=>{this.setState({showModal: false})}}
                >
                    一大段教程
                </Modal>
                <div className="login-footer">
                        <span>copyright@2018 By北京邮电大学1017</span>
                </div>     
            </div>
        )
    }
}

Login = Form.create({})(Login)

export default connect((state)=>{
    return {
        ...state.login
    }
},actions)(Login)


// 无账户密码的登陆过程
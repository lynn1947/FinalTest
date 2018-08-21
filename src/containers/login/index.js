import React from 'react'
import {Form, Input, Icon} from 'antd'
import {mergeWith, isArray} from 'lodash'
import path from 'path'
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import {connect} from './../../common/util/index'
import configFunc from './../../common/config/index'
import * as actions from './state/action'
import './index.less'

const { genIpfsDaemonSettings, genOrbitSettings} = configFunc

const FormItem = Form.Item
const inputLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    }
}

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            dataDir: {
                IpfsDataDir : '/orbit/ipfs',
                OrbitDataDir : '/orbit'
            }
        }
        this.ipfsDaemonSettings = {}
        this.settings = {}
    }

    componentWillMount() {
        let ipfsDataDir = localStorage.getItem('dataDir') || this.state.dataDir.IpfsDataDir
        let orbitDataDir = localStorage.getItem('dataDir') || this.state.dataDir.IpfsDataDir
        let settings = [genIpfsDaemonSettings(ipfsDataDir), genOrbitSettings(orbitDataDir)]

        settings.forEach(item => {
            mergeWith(this.ipfsDaemonSettings, item, (obj, src) => {
              return isArray(src) ? src : undefined
            })
        })
    }

    handleLogin =()=>{
        const {form, startLogin} = this.props
        const username =form.getFieldValue('username')

        let settings = Object.assign({}, this.ipfsDaemonSettings)

        if (settings.IpfsDataDir.includes(settings.OrbitDataDir + '/ipfs')) {
            settings.IpfsDataDir = settings.IpfsDataDir.replace(settings.OrbitDataDir + '/ipfs', settings.OrbitDataDir)
            settings.IpfsDataDir = path.join(settings.IpfsDataDir, '/' + username, '/ipfs')
        }
        settings.OrbitDataDir = path.join(settings.OrbitDataDir, '/' + username)
        this.settings = Object.assign({}, settings)

        // 实例化orbit过程中应该是还有一个keystore来存储过程中产生的orbit的key
        const ipfsNode = new IPFS(this.settings)
        ipfsNode.on('ready',()=>{
            const orbitNode = new OrbitDB(ipfsNode)
            startLogin({ipfsNode,orbitNode})
            window.location.href = './#/mainPage'
        })
        
        
    }
 
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <div className="loginPage">
                    <div className="loginPage-slogan">
                        <div className="loginPage-slogan-logo" />
                        <p className="loginPage-slogan-title">IPFS上的协同编辑</p>
                    </div>
                    <div className="loginPage-form">
                        <Form style={{width:'100%'}}>
                            <FormItem label="用户名" {...inputLayout} style={{margin:0,padding:0}}>
                                {
                                    getFieldDecorator('username',{
                                        rules:[{
                                            required: true,
                                            message: 'Login needs your username firstly'
                                        }]
                                    })(<Input 
                                            className="loginPage-form-username" 
                                            placeholder="input your username"
                                        />)   
                                }
                            </FormItem>
                        </Form>
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

const Login =  Form.create()(LoginPage)

export default connect((state)=>{
    return {
        ...state.login
    }
},actions)(Login)


// 无账户密码的登陆过程
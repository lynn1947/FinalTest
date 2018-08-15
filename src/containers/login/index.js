import React from 'react'
import Orbit from 'orbit_' // orbit_core,用于实现通信
import OrbitDB from 'orbit-db'
import IPFS from 'ipfs'
import {Form, Input, Icon} from 'antd'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
import './index.less'

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
        this.orbit = this.props.orbit
    }

    componentDidMount() {
        
    }

    handleLogin =()=>{
        // 需要检测是否已经存在database
        // 登录以后生成以username命名的database，数据保存在本地硬盘上
        // 保存现有的ipfs setting？？还是一次生成，只保存ipfs实例？？
        const {form, publicInfo,startLogin} = this.props
        const username = form.getFieldValue('username')
        console.log(publicInfo)
        startLogin(username)
        console.log(this.props.publicInfo)
        window.location.href = "./#/mainPage"
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
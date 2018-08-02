import React from 'react'
import {Form, Input, Icon} from 'antd'
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

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
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
                                    })(<Input className="loginPage-form-username" placeholder="input your username"/>)   
                                }
                            </FormItem>
                        </Form>
                        <div className="loginPage-form-tip">
                            <Icon type="exclamation-circle-o" />
                            <span>需要使用Geth与以太坊进行交互，请准备好Geth客户端</span>
                        </div>
                        <div className="loginPage-form-login"><a href="./#/mainPage">Sign In</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Login)


// 无账户密码的登陆过程
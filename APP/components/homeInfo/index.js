import React from 'react'

export default class HomeInfo extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {} = this.props
        const perosonalInfo = {
            ipfsId: 'its a very long string', // 登陆即生成，不可选，不可自己生成
            ethId: 'its a verlong string', // 采用以太坊方案时，该项可以重新设置
            nickname: 'nickname', //作为登陆的凭证，不可更改
            uport: 1234, // 登陆备选方案之一，不可更改
        }
        return <div>
            hello HomeInfo
        </div>
    }
}
import React from 'react'

export default class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<div>
            <h3>欢迎使用物联网区块链数据存储平台</h3>
            <p>
                系统为物联网数据在区块链和IPFS存储的一次实践，以IPFS为媒介，
                将物联网中数据存储在区块链网络中，以实现数据的安全透明存储。
            </p>
        </div>)
    }
}
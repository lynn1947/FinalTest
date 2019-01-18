import React from 'react'
import { Modal, Button, Table } from 'antd'
import './index.less'

class PartnerTab extends React.Component {
    state={
        showModal: false
    }

    handleAdd =()=>{
        this.setState({
            showModal: true
        })
    }

    handleAddConfirm =()=>{
        const { handleAddPartner } = this.props
        this.setState({
            showModal:false
        })
    }



     

    render() {
        const { partnerList, handleAddPartner } = this.props
        const {showModal} = this.state
        const partnerColumn = [{
            title: '序号',
            dataIndex:'index',
            key: 'index',
            width: '10%',
        },{
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            width: '15%',
        },{
            title: 'ipfs nodeid',
            dataIndex: 'nodeid',
            key: 'nodeid',
            width: '30%',
        },{
            title: 'orbitdb hex',
            dataIndex: 'hex',
            key: 'hex',
            width: '30%',
            render:(text)=>{
                return (
                    <div>
                    {
                        // 差不多是个自动换行的方法，当hex字段的长度超过多少时，就去换一哈行，感觉是十分愚蠢的方法
                        text.split(/\d{0,50}/g).map((item)=><div>{item}</div>)
                    }
                    </div>
                ) 
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '15%',
            render: ()=>{
                return <Button onClick={this.handleDeletePartner}>删除</Button>
            }
        }]


        return (
            <div className="partnerList">
                <div className="partnerList-button">
                    <Button 
                        type="primary"
                        onClick={()=>{this.setState({showModal: true})}}
                    >
                        添加好友
                    </Button>
                </div>
                <Table 
                    className="partnerList-table"
                    columns={partnerColumn}
                    dataSource={ partnerList }
                />
                <Modal
                    visible={showModal}
                    cancelText="取消"
                    okText="确定"
                    onCancel={()=>{this.setState({showModal: false})}}
                    onOk={this.handleAddConfirm}
                >
                    这里添加好友列表
                </Modal>
            </div>
        )
    }
}

export default PartnerTab
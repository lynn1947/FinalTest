import React from 'react'
import dayjs from 'dayjs'
import { Modal, Button, Table } from 'antd'
import History from './../history/index'
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

    handleGetHistory =()=>{
        const {getHistory} = this.props
        this.setState({
            showModal: true
        },()=>{
            
        })
    }
    

    render() {
        const fileColumns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
        },{
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
            width: '15%',
        }, {
            title: '文件哈希',
            dataIndex: 'hash',
            key:'hash',
            width:'25%',
        }, {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            width: '15'
        }, {
            title: 'create time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            width: '20%',
            render:(text)=>{
                return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:'20%',
            render: (text, record)=>{
                return (
                    <div className="historyModal-table-operation">
                        <Button className="personal-table-operation-button">查看文档</Button>
                        <Button 
                            className="personal-table-operation-button" 
                            type="primary" 
                            onClick={this.handleGetHistory}>查看历史记录</Button>
                    </div>
                )
            }
        }]

        const { fileList, fileOnshow } = this.props
        const {showModal} = this.state

        return (
            <div className="partnerList">
                <Table 
                    className="partnerList-table"
                    columns={fileColumns}
                    dataSource={ fileList }
                />
                <Modal 
                    visible={showModal}
                    width='90%'
                    title={`${fileOnshow} 历史记录`}
                    footer={null}
                    onCancel={()=>{this.setState({showModal: false})}}
                >
                    <History />
                </Modal>
            </div>
        )
    }
}

export default PartnerTab
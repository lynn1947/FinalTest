import React from 'react'
import {Divider, Table} from 'antd'
import './index.less'

export default class History extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const historyInfo = [{
            commitInfo: 'longString,预计会留出两行的空间',
            modifyDate: '2018-07-15 22:30:15',
            modifyer: {
                nickname: 'nickname',
                nodeid: 'nodeid'
            },
            version: '',
            fileHash:''
        }]
        const columns = [{
            title: "摘要信息",
            dataIndex: "commitInfo",
            key:"commitInfo", // 太长了的话就用。。。代替，hover展示完整内容
            width:'25%'
        },{
            title:"文件哈希",
            dataIndex:'fileHash',
            key:'fileHash',
            width:'20%'
            // 不提供点击文件进行下载，历史信息做在了modal框中，加预览或者下载交互更复杂
        },{
            title:"保存者",
            dataIndex:'modifyer',
            key:'modifyer', 
            width:'30%',
            render: (text)=>{
                // 要展示的是两个内容，用竖线隔开
                return <div className="modifyerInfo">
                    <span>{text['nickname']}</span>
                    <Divider type="vertival" />
                    <span>{text['nodeid']}</span>
                </div>
            }
        },{
            title: "版本号",
            dataIndex:'version',
            key:'version',
            width: '10%',
        },{
            title: "修改日期",
            dataIndex: 'modifyDate',
            key:'modifyDate',
            width:'20%',
        },]
        return (
            <div className="history">
                <Table borderd
                    columns={columns} 
                    dataSource={historyInfo}
                    rowKey={record=>record.fileHash}
                />
            </div>
        )     
    }
}
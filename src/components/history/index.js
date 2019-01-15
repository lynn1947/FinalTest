import React from 'react'
import {Divider, Table, Button} from 'antd'
import dayjs from 'dayjs'
import './index.less'

export default class History extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const historyInfo = [{
            index: 1,
            hash: 'QmfYsCfy5SjaWjpQGnpjRfk5g1rFeVhdsWEHQGEJuryGxt',
            creator: 'test01',
            timestamp: new Date().valueOf(),
            commit: '这是一段测试内容',
        }]
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%',
        },{
            title:"文件哈希",
            dataIndex:'hash',
            key:'fileHash',
            width:'25%'
            // 不提供点击文件进行下载，历史信息做在了modal框中，加预览或者下载交互更复杂
        },{
            title: "版本描述",
            dataIndex: "commit",
            key:"commitInfo", // 太长了的话就用。。。代替，hover展示完整内容
            width:'25%'
        },,{
            title:"版本创建者",
            dataIndex:'creator',
            key:'creator', 
            width:'10%',
        },{
            title: "修改日期",
            dataIndex: 'timestamp',
            key:'timestamp',
            width:'15%',
            render:(text)=>{
                return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '15%',
            render: ()=>{
                return (
                    <div className="history-tablle-operation">
                        <Button>查看</Button>
                        <Button>删除</Button>
                        <Button>修改</Button>

                    </div>
                )
            }
        }]
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
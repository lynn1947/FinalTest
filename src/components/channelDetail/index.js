import React from 'react'
import './index.less'

export default class ChannelDetail extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const {info} = this.props 
        return <div className="channelDetail">
            <div className="info id">
                <span className="label">ID:</span>
                <span>{info.channelId}</span>
            </div>
            <div className="info creator">
                <span className="label">Creator:</span>
                <span>{`${info.channelCreater.nickName}  ${info.channelCreater.nodeId}`}</span>
            </div>
            <div className="info joiners">
                <span className="label">Joiners:</span>
                <div>
                {
                    info.channelJoiner.map((item, index)=>{
                        return <div key={index}>{`${item.nickName} ${item.nodeId}`}</div>
                    })
                }
                </div>
            </div>
            <div className="info article"> {/*此处上方有空行隔开节点信息和文章信息*/}
                <span className="label">Article:</span>
                <span>{`${info.article.filename} ${info.article.filehash}`}</span>
            </div>
            <div className="info datetime">
                <span className="label">Create-datetime:</span>
                <span>{info.createDate}</span>
            </div>
        </div>
    }
}
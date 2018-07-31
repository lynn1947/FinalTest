import React from 'react'
import {} from 'antd'
import './index.less'

export default class LeftBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<div className="main">
            <div className="left">文本编辑面板</div>
            <div className="right">聊天面板</div>
        </div>)
    }
}


// 右侧页面主题，包含文本编辑面板和聊天面板
// 检测url，根据url决定加载文件内容和历史聊天内容。还要加载聊天内容。有点烦！
import React from 'react'

export default class History extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const historyInfo = {
            commitInfo: 'longString,预计会留出两行的空间',
            modify_date: '2018-07-15 22:30:15',
            modifyer: {
                nickname: 'nickname',
                nodeid: 'nodeid'
            },
            version: ''

        }
        return <div>
            Hello History
        </div>
    }
}
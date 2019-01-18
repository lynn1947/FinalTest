import React from 'react'
import {Modal} from 'antd'

const MessageModal =(props)=> {
    const { modalVisible, onCancel, messages } = props

    return (
        <Modal
            visible={modalVisible}
            onCancel={onCancel}
        >
            <div>
                {messages}
            </div>
        </Modal>
    )
}

export default MessageModal


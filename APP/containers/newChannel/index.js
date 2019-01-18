import React from 'react'
import {Radio,Input, Button, Select} from 'antd'
import OrbitDB from 'orbit-db'
import {connect} from './../../common/util/index'
import * as actions from './state/action'
import './index.less'
import 'babel-polyfill'

const RadioGroup = Radio.Group
const Option = Select.Option

class NewChannel extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            joinManner: 'create',
            channelName: '',
            articleName: '',
            joiners: [],
            channelAddr: '',
        }
        this.parternList = this.props.parternList
        this.orbitNode = this.props.pubInstance.orbitNode
        this.channeldb = null
    }

    async componentWillUnMount() {
        consolee.log(' channeldb was closed')
        await this.channeldb.close()
    }

    changeInput =(inputName, e)=>{
        const newValue= e.target.value
        if(typeof newValue){
            this.setState({
                [inputName]: JSON.parse(JSON.stringify(newValue))
            })
        }else{
            this.setState({
                [inputName]: newValue
            })
        }
    }

    genWriteArray =()=> {
        const {joiners} = this.state
        const writeAccess = joiners.map((item)=>{
            const pubKey = item.split(':')[1]
            if(this.parternList.find(item.pubKey===pubKey)){ // 此处应该是要做parternList空校验的，但是未做
                writeAccess.push(this.parternList.find(item.pubKey===pubKey).pubKey)
            }
        })
        return writeAccess
    }

    handleCraete =()=> {
        // 创建一个数据库，并将其默认打开？？？
        // 刷新当前的channelList列表，并做存储
        const {channelName} = this.state
        const writeAccess = this.genWriteArray()
    }

    handleJoin = async()=>{
        const {channelAddr} = this.state
        const {changeVisible} = this.props
        if(OrbitDB.isValidAddress(channelAddr)){
            try{
                console.log(this.orbitNode)
                this.channeldb = await this.orbitNode.open(channelAddr,{
                    directory: '/orbitdb/channelList',
                    sync: true
                })
                this.channeldb.events.on('ready',()=>{
                    console.log('ready')
                })
                this.channeldb.events.on('replicate',()=>{
                    console.log('replicate')
                })
                this.channeldb.events.on('replicated',()=>{
                    console.log('replicated')
                })
                this.channeldb.events.on('replicate.progress',()=>{
                    console.log('replicating')
                })
                this.channeldb.load()
            }
            catch(err){
                if(err) console.log(err)
            }
        }
    }

    render() {
        const {joinManner, channelName, articleName, channelAddr} = this.state
        return <div className="newChannel">
            <RadioGroup className="newChannel-radiogroup" value={joinManner} onChange={(e)=>{this.changeInput('joinManner',e)}}>
               <Radio value='create'>创建协同</Radio>
               <Radio value='join'>加入协同</Radio>
            </RadioGroup>
            {
                joinManner === 'create' ? <div className="newChannel-newInfo">
                    <div className="newChannel-newInfo-infoItem channelName">
                        <p className="label">channelName:</p>
                        <Input className="input" value={channelName} onChange={(e)=>{this.changeInput('channelName',e)}}/>
                    </div>
                    <div className="newChannel-newInfo-infoItem articleName">
                        <p className="label">articleName:</p>
                        <Input className="input" value={articleName} onChange={(e)=>{this.changeInput('articleName',e)}}/>
                    </div>
                    <div className="joiners">
                        <div className="newChannel-newInfo-infoItem">
                            <p className="label">joiners:</p>
                            <Select 
                                className="input"
                                mode="multiple"
                                placeholder="select your joiners"
                                onChange={(e)=>{this.changeInput('joiners',e)}}
                            >{
                                this.parternList.map(item=><Option key={item.nodeId}>{`${item.nickname}:${item.nodeId}`}</Option>)
                            }</Select>
                        </div>
                        <p className="joiners-tip">
                            no wanted friends? go homePage, <a href="./#/personalPage">add</a> your friends...
                        </p>
                    </div>
                    <Button type="primary" className="newChannel-newInfo-button" onClick={this.handleCraete}>create</Button>
                </div> : <div className="newChannel-newInfo">
                    <div className="newChannel-newInfo-infoItem">
                        <p className="label">channelAddr: </p>
                        <Input className="input" value={channelAddr} onChange={(e)=>{this.changeInput('channelAddr', e)}}/>
                    </div>
                    <Button type="primary" className="newChannel-newInfo-button" onClick={this.handleJoin}>join</Button>
                </div>
            }
        </div>
    }
}

export default connect((state)=>{
    return {
        ...state.mainLayout,
        ...state.login
    }
},actions)(NewChannel)


 // 页面需要和redux进行联系，新增的 
import IMU from 'immutable'

const initialState = {
    channelNameList: [{
        channelName: '',
        creater: '', // 创建者的名字
        joiners: [],
        databaseAddr: '', // channelHash
    }],
    parternList: [],
    channelOnShow: {}
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'UPDATE_CHANNEL':
            return updateChannelList(state,action)
        case 'ADD_CHANNEL':
            return addChannel(state,action)
        case 'DELETE_CHANNEL':
            return  deletechannel(state, action)
        case 'DETAIL_CHANNEL':
            return detailchannel(state,action)
        case 'ENTER_CHANNEL': 
            return enterChannel(state,action)
        default:
            return state
    }
} // 加载mainLayout页面action
// 1. 数据加载，加载channelList的数据，这个channelList是保存在orbitdb当中的
// 2. 根据username加载向对应的userlist

function updateChannelList(state,action) {
    console.log(action.data)
    state = IMU.Map(state)
    let newChannelList = JSON.parse(JSON.stringify(action.data))
    let newState = state.set('channelNameList', newChannelList)

    return newState.toJS()
}

function enterChannel(state,action){
    state = IMU.Map(state)
    let newChannelOnShow = JSON.parse(JSON.stringify(action.data))
    let newState = state.set('channelOnShow', newChannelOnShow)

    return newState.toJS()
}

function addChannel(state,action){

}// 新增channel，需要更新channelName,redux当中不需要相应的操作，但是在调用这个reducer的同时应该需要将相应的信息保存在orbit当中

function deletechannel(state,action) {

}// 删除channel，与addChannel操作一致

function detailchannel(state,action) {

}// 加载与channelName相对应的channel的具体信息
const initialState = {
    channelnameList:[],
    channelIndetail:{
        channelName: '',
        channelId: '',
        channelCreater: {nickName:'',nodeId:''},
        channelJoiner:[{nickName:'',nodeId:''}],
        article: {filename: '',filehash:""},
        createDate:'',
    }
}

export function reducer(state=initialState, action) {
    let newState 
    switch(action.type) {
        case 'LOADING_CHANNEL':
            return getChannelList(state,action)
        case 'ADD_CHANNEL':
            return addChannel(state,action)
        case 'DELETE_CHANNEL':
            return  deletechannel(state, action)
        case 'DETAIL_CHANNEL':
            return detailchannel(state,action)
        default:
            return state
    }
} // 加载mainLayout页面action
// 1. 数据加载，加载channelList的数据，这个channelList是保存在orbitdb当中的
// 2. 根据username加载向对应的userlist

function getChannelList(state,action) {

}// 加载与username相对应的channelListName

function addChannel(state,action){

}// 新增channel，需要更新channelName,redux当中不需要相应的操作，但是在调用这个reducer的同时应该需要将相应的信息保存在orbit当中

function deletechannel(state,action) {

}// 删除channel，与addChannel操作一致

function detailchannel(state,action) {

}// 加载与channelName相对应的channel的具体信息
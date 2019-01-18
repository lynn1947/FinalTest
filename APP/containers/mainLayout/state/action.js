

export const updateChannelList =(data)=>(dispatch,getState)=> {
    dispatch({
        type: 'UPDATE_CHANNEL',
        data
    })
} // 进入页面时展示channelList

export const delChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'DELETE_CHANNEL',
    })
} // 删除channel， 更改channelList中内容

export const detailChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'DETAIL_CHANNEL',
    })
} // 展示选择channel的具体内容，更改channelInDetail中内容

export const enterChannel =(data, sucfunc)=>(dispatch, getState)=> {
    dispatch({
        type: 'ENTER_CHANNEL',
        data
    })
}// 选择channel动作，存储当前channnel的内容，同时展示相应的编辑页面
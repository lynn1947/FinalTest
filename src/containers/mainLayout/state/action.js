

export const getChannelList =(sucFun)=>(dispatch,getState)=> {
    dispatch({
        type: 'LOADING_CHANNEL',

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

export const enterChannel =(sucfunc)=>(dispatch, getState)=> {
    dispatch({
        type: ''
    })
}// 选择channel动作，选择了这个channel，那么需要处理和这个channel相关的内容
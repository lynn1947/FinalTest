export const channelList =(sucFun)=>(dispatch,getState)=> {
    dispatch({
        type: 'LOADING_CHANNEL',

    })
}

export const addChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'ADD_CHANNEL',
    })
}

export const delChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'DELETE_CHANNEL',
    })
}

export const detailChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'DETAIL_CHANNEL',
    })
}
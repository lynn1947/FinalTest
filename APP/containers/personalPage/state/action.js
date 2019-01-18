export const getPatternList =(sucFunc)=>(dispatch,getState)=>{
    dispatch({
        type: 'LOADING_PATTERNLIST'
    })
}

export const getArticalList =(sucFunc)=>(dispatch, getState)=>{
    dispatch({
        type: 'LOADING_ARTICALLIST'
    })
}

// 因为这两个action应当是同时触发，在完全获取到列表之后才会进行下一步动作，故可以通过redux-saga来完成事件的并发和异步处理
// 触发saga的动作和触发reducer发生列表更改的action可能会产生不一致，这里暂时按照无saga来处理
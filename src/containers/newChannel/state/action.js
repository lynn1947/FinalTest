export const addChannel =(sucfunc)=>(dispatch,getState)=> {
    dispatch({
        type: 'ADD_CHANNEL',
    })
}

// 有添加channelList的动作
// 虽然动作在NewChannel当中触发，但是action的调用和reducer的更新是在mainLayout当中定义，所以NewChannel需要绑定mainLayout作为其prop
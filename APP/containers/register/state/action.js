export const startLogin =(data)=>(dispatch, getState)=>{
    dispatch({
        type: 'INIT_APP',
        data
    })
} // dispatch这个action的时候传入参数username
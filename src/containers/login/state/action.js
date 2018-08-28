export const startLogin =(data)=>(dispatch, getState)=>{
    dispatch({
        type: 'INIT_APP',
        data
    })
} // dispatch这个action的时候传入参数username

export const updateFirst =(data)=>(dispatch, getState)=>{
    dispatch({
        type: 'UPDATE_FIRST',
        data
    })
} 

export const startLogin =(data)=>(dispatch, getState)=>{
    dispatch({
        type: 'START_APP',
        data: {
            username: data,
        }
    })
} // dispatch这个action的时候传入参数username

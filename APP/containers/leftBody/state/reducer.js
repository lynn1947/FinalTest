const initialState = {
    
}

export default function reducer(state=initialState, action) {
    let newState
    switch (action.type) {
        case 'LOADING_CHAT_HISTORY':
            return getChatHistory(state, action)
        default:
            return state;
    }
} 


function getChatHistory(state, action) {

}//加载历史消息，暂时还不知道历史消息的保存是怎么实现的，先用redux这么标记着

// 另外页面需要同时加载文章的内容，文章在articalList中获取，匹配channelName

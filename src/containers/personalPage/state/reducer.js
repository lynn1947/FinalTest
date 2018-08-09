const initialState = {
    patternList: [],
    articalList: [],
}

export default function reducer(state=initialState, action) {
    let newState
    switch (action.type) {
        case LOADING_PATTERNLIST:
            return getPatternList(state,action)
        case LOADING_ARTICALLIST:
            return getArticalList(state,action)
        default:
            return state;
    }
}

function getPatternList(state, action) {

} // 点击home之后加载用户的合作对象列表

function getArticalList(state,action){

}// 点击home之后加载用户的文章列表

//加载pattern和加载文章是两个并行操作，可以通过redux-saga当中的call去执行完成

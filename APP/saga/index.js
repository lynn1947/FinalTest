import {call, put, takeEvery} from 'redux-saga/effects'

// saga,用于实现异步动作主要是想用它来实现一个动作监听的作用
function* fetchSaga() {
} // 获取存在的saga并进行处理


function* watchSaga() {

} // 监听saga，并将saga中对应的action dispatch出去

const rootSaga =(otherSaga)=> function* (){
    console.log('entered rootSaga')
    yield otherSaga ? [call(watchSaga),call(otherSaga)] : call(watchSaga)
}// 立即执行函数，用于检测是否还存在其他的saga处理函数

export default rootSaga
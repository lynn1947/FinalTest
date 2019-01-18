import {takeLatest,put} from 'redux-saga/effects'

function* startLogin(action) {
    console.log(action.data)
    yield put({
        type: 'START_APP',
        data: {
            username: action.data.username,
        }
    })
}

const loginSaga = function* () {
    while (true) {
        yield takeLatest(startLogin)
        return
    }
}


export default loginSaga
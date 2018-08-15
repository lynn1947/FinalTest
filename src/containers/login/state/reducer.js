import Immutable from 'immutable'
import configFunc from './../../../common/config/index'
import path from 'path'
const { genIpfsDaemonSettings, genOrbitSettings} = configFunc

const initIpfsDataDir = window.ipfsDataDir   || '/orbit/ipfs'
const initOrbitDataDir = window.orbitDataDir || '/orbit'

const initialState = {
    publicInfo: {
        username: '',
        settings: {
            ipfsSettings: genIpfsDaemonSettings(initIpfsDataDir), //对象
            orbitSettings: genOrbitSettings(initOrbitDataDir) // 对象
        }
    }
}

export default function reducer(state=initialState,action) {
    switch (action.type) {
        case 'START_APP' :
            return startApp(state,action)
        default:
            return state
    }
}

function startApp(state,action) {
    console.log('startApp')
    let newState = Immutable.fromJS(state) // 使用fromJS生成的新对象回从里到外都是map对象，应该是只能通过immutable提供的方法来进行更改的
    
    let username = action.data.username
    console.log(username)
    newState.setIn(['publicInfo','username'],username)
    console.log(newState.getIn(['publicInfo','username']))

    let ipfsDataDir = newState.getIn(['publicInfo','settings','ipfsSettings','IpfsDataDir']) // 字符串
    let orbitDataDir = newState.getIn(['publicInfo','settings','orbitSettings','OrbitDataDir']) // 字符串

    if(ipfsDataDir.includes(orbitDataDir+'/ipfs')){
        let newIpfsDir = path.join(orbitDataDir,'/'+username,'/ipfs' )
        newState.setIn(['publicInfo','settings','ipfsSettings','IpfsDataDir'],newIpfsDir)
    }
    newState.setIn(['publicInfo','settings','orbitSettings','OrbitDataDir'],path.join(orbitDataDir, '/' + username))

    console.log(newState.getIn(['publicInfo','settings','ipfsSettings','IpfsDataDir']))
    console.log(newState.getIn(['publicInfo','settings','orbitSettings','OrbitDataDir']))

    return newState.toJS()
}// 登陆时保存相关对象
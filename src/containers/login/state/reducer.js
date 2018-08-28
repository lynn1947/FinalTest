import IMU from 'immutable'

const initialState = {
    pubInstance: {
        ipfsNode: null,
        orbitNode: null,
        orbitCore: null
    },
    isFirst: true
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'INIT_APP': 
            return initInstance(state, action)
        case 'UPDATE_FIRST':
            return updateFirst(state,action)
        default:
            return state
    }
}

function initInstance(state,action) {
    state = IMU.Map(state)
    let ipfsNode = action.data.ipfsNode
    let orbitNode = action.data.orbitNode
    let orbitCore = action.data.orbitCore
    
    let newState = state.set('pubInstance', {ipfsNode, orbitNode, orbitCore})
    return newState.toJS()
}

function updateFirst(state, action) {
    state = IMU.Map(state)
    let newFirst = action.data
    
    let newState = state.set('isFirst', newFirst)
    return newState.toJS()
}
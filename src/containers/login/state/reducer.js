import IMU from 'immutable'

const initialState = {
    pubInstance: {
        ipfsNode: null,
        orbitNode: null
    }
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'INIT_APP': 
            return initInstance(state, action)
        default:
            return state
    }
}

function initInstance(state,action) {
    state = IMU.Map(state)
    let ipfsNode = action.data.ipfsNode
    let orbitNode = action.data.orbitNode
    
    let newState = state.set('pubInstance', {ipfsNode, orbitNode})
    return newState.toJS()
}
const initialState = {
    ipfs: {}
}

// 设想的是在登录的同时初始化一个ipfs节点，但是好像这部分可以放在登录的处理函数里面
// 作为ipfs的onready事件的回调函数
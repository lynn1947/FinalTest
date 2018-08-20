const appAction = {
    init: 'initialize', // 刚进入页面时的action，加载login页面
    login: 'login', // 登录，获取username以及相应的ipfsSetting，orbitSetting。创建orbit实例

}

const networkActions = {
    connectting: "connectting", // 理解对应为开始连接
    connected:"connected", // 连接成功
    disconnect:"disconnect", //断开连接
    rigister:"register", // 注册
    registerError:"registerError", // 注册失败
    joinChannel:"joinChannel", // 加入channel
    joinedChannel: "joinedChannel", // 加入channel成功
    joinChannelError:"joinChannelError", // 加入channel失败 
    leaveChannel:"leaveChannel", // 离开channel
    getChannel:"getChannel", // 获取当前channel，这个没明白是什么意思
    getUserInfo:"getUserInfo", // 获取用户信息
    getOpenChannels:"getOpenChannels", //获取开放的channels----这个好像没什么用 
    getChannels:"getChannels", // 获取channel列表
    updateNetwork:"updateNetwork",  // 更新当前网络信息
    updateUser:"updateUser",  // 更新用户信息----能够用在用户的列表信息更改上
    getPeers:"getPeers" // 获取加入到channel当中的节点，这个在orbitchat中表示为peers-----能够应用在获取当前channel的参与节点信息上
}

const channelActions = {
    reachedChannelStart:"reachedChannelStart", // 进入channel
    channelInfoReceived: "channelInfoReceived", // 接收channelInfo
    loadMessages:"loadMessages", // 加载channel中的message
    loadMoreMessages: "loadMoreMessages", // 加载更多消息
    sendMessage:"sendMessage", // 发送消息
    addFile:"addFile", // 添加文件
    // loadPost:"loadPost", // 
    loadFile: "loadFile",// 加载文件---更改为从channel列表中展现文件内容
    loadDirectoryInfo:"loadDirectoryInfo", //加载路径信息
    // setChannelMode:"setChannelMode", // 
    // channelModeUpdated:"channelModeUpdated" ,//     
    createFile: 'createFile '   // 创建新文件
}

const ipfsDaemonAction = {
    // initConfiguration:"initConfiguration", 
    // saveConfiguration:"saveConfiguration",
    start: "start", // new一个ipfs的实例
    stop:"stop", // 关闭ipfs的实例
    daemonStarted:"daemonStarted" // 实例创建好之后
}

const userAction = {
    getUser: "getUser", 
    addUser:"addUser",
    // 这个应该是从本地账户来讲，本地可以存储与多个账户相对应的数据库
}
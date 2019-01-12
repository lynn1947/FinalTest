var loginOutput = {
    orbitdbAddr: '',
    ipfsId:'',
    repo: '',
}

var siginInput ={
    ethAccont: '',
    ipfsId: '',
    repo: '',
    orbitdbAddr: ''
}

var signinOutput = {
    code: 0,
    message: '',
}

var addRecordInput ={
    filehash: '',
    timestamp: '',
    channelId: '',
    creator: '',
    commit: '',
}

var addRecordOutput = {
    code: '',
    message: ''
}

var getAllRedcordsInput = {
    channelId: '',
}

var getAllRedcordsOutput = {
    // record数组
    /*
    {
        filehash: '',
        creator: '',
        timestamp: '',
        commit: '',
    }
    */
    // 当没有记录时返回空数组即可
}

var getSpacifiedRecordInput = {
    timestamp: '',
    channelId: ''
}

var getSpacifiedRecordOutput ={
    filehash: '',
}


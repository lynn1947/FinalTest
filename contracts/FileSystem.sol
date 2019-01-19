pragma solidity ^0.5.0;

contract FileSystem {
    struct userInfo {
		string orbitdbAddr;
		string ipfsId;
		string repo;
		bool isUsed;
	}
	
	mapping (address => userInfo) users;
	
    struct fileDetails {
        string fileName;
        string timestamp;
        string channelId;
        string creator;
        string commit;
        bool isUsed;
    }
    
    mapping (string => fileDetails) fileVersion;       // fileHash => fileDetails
    mapping (string => string[]) fileTimestampHistory; // channelId => timestamp[]
    mapping (string => string[]) fileVersionHistory;   // channelId => fileHash[]
    
    // 注册
	function signIn (string memory _orbitdbAddr, string memory _ipfsId, string memory _repo) public returns (uint, string memory){
		if (users[msg.sender].isUsed) {
			return (2001, "already have an account");
		}
		users[msg.sender] = userInfo(_orbitdbAddr, _ipfsId, _repo, true);
		return (1001, "successfully registered");
	}
	
	// 登录
	function login () 
	    public 
	    view
	    returns (
	        string memory orbitdbAddr, 
	        string memory ipfsId, 
	        string memory repo
        ) 
    {
	    return (users[msg.sender].orbitdbAddr, users[msg.sender].ipfsId, users[msg.sender].repo);
	}
    
	// 文件存储
    function addRecord (
        string memory _fileHash, 
        string memory _fileName,
        string memory _timestamp,
        string memory _channelId,
        string memory _creator,
        string memory _commit
    ) 
        public 
        returns (uint, string memory)
    {
        if (fileVersion[_fileHash].isUsed) {
            return (2001, "file already exists");
        }
        fileVersion[_fileHash] = fileDetails(_fileName, _timestamp, _channelId, _creator, _commit, true);
        fileVersionHistory[_channelId].push(_fileHash);
        fileTimestampHistory[_channelId].push(_timestamp);
        return (1001, "successfully added record");
    }
    
    // 根据channelId获取这个文件的最近一个版本相关信息
    function getLastestRecord (string memory _channelId) 
        public 
        view 
        returns (
            string memory fileHash,
            string memory fileName,
            string memory timestamp,
            string memory channelId,
            string memory creator,
            string memory commit
        )
    {
        uint length;
        string memory hash;
        length = fileVersionHistory[_channelId].length;
        if (length ==0) {
            return ("", "", "", "", "", "");
        }
        hash = fileVersionHistory[_channelId][length-1];
        return (hash, fileVersion[hash].fileName, fileVersion[hash].timestamp, fileVersion[hash].channelId, fileVersion[hash].creator, fileVersion[hash].commit);
    }
    
    // 根据channelId和timestamp找到某一个文件的指定版本，返回该版本文件所有相关信息
    function getSpecificRecord (string memory _channelId, string memory _timestamp) 
        public 
        view 
        returns (
            string memory fileHash,
            string memory fileName,
            string memory timestamp,
            string memory channelId,
            string memory creator,
            string memory commit
        ) 
    {
        uint length = fileVersionHistory[_channelId].length;
        for (uint i = 0; i < length; i++) {
            string memory temp_timestamp = fileTimestampHistory[_channelId][i];
            if (keccak256(abi.encodePacked(_timestamp)) == keccak256(abi.encodePacked(temp_timestamp))) {
                string memory hash = fileVersionHistory[_channelId][i];
                return (hash, fileVersion[hash].fileName, fileVersion[hash].timestamp, fileVersion[hash].channelId, fileVersion[hash].creator, fileVersion[hash].commit);
            }
        }
        return ("", "", "", "", "", "");
    }
    
	// 根据channelid获取这个文件总版本数
    function getRecordCount (string memory _channelId)
        public
        view
        returns (
            uint count
        )
    {
        return fileVersionHistory[_channelId].length;
    }
    
	// 根据channelid和指定版本号获取其时间戳
    function getRecordTimestamp (string memory _channelId, uint index)
        public
        view
        returns (
            string memory timestamp
        )
    {
        if (fileTimestampHistory[_channelId].length == 0) {
            return "";
        }
        return fileTimestampHistory[_channelId][index];
    }
    
    // function getAllrecord (string memory _channelId) 
    //     public 
    //     returns (
    //         string[] memory,
    //         string[] memory,
    //         string[] memory,
    //         string[] memory,
    //         string[] memory
    //     ) 
    // {
    //     uint length = fileVersionHistory[_channelId].length;
    //     if (length > 0) {
    //         for (uint i = 0; i < length; i++) {
    //             string memory hash = fileVersionHistory[_channelId][i];
    //             creatorArray.push(fileVersion[hash].creator);
    //             fileNameArray.push(fileVersion[hash].fileName);
    //             timestampArray.push(fileVersion[hash].timestamp);
    //             commitArray.push(fileVersion[hash].commit);
    //         }
    //     }
        
    //     return (
    //         fileVersionHistory[_channelId],
    //         fileNameArray,
    //         timestampArray,
    //         creatorArray,
    //         commitArray
    //     );
    // }
    
}
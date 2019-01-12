pragma experimental ABIEncoderV2;

contract FileSystem {
    struct fileDetails {
        string nodeId;
        string fileName;
        string timestamp;
    }
    
    string[] nodeIdArray;
    string[] fileNameArray;
    string[] timestampArray;
    
    mapping (string => fileDetails) fileVersion;     // fileHash => fileDetails
    mapping (string => string[]) fileVersionHistory;   // channelId => fileHash[]
    
    function addRecord (
        string _nodeId, 
        string _fileName, 
        string _fileHash, 
        string _timestamp, 
        string _channelId
    ) 
        public 
    {
        fileVersion[_fileHash] = fileDetails(_nodeId, _fileName, _timestamp);
        fileVersionHistory[_channelId].push(_fileHash);
    }
    
    function getLastestRecord (string _channelId) 
        public 
        view 
        returns (
            string nodeId, 
            string fileName, 
            string fileHash, 
            string timestamp
        ) 
    {
        uint length = fileVersionHistory[_channelId].length;
        if (length == 0) {
            return (
                "",
                "",
                "",
                ""
            );
        }
        else {
            string hash = fileVersionHistory[_channelId][length-1];
            return (
                fileVersion[hash].nodeId,
                fileVersion[hash].fileName,
                hash,
                fileVersion[hash].timestamp
            );
        }
        
    }
    
    // function getAllrecord (string _channelId) 
    //     public 
    //     view 
    //     returns (
    //         string[],
    //         string[],
    //         string[],
    //         string[]
    //     ) 
    // {
    //     uint length = fileVersionHistory[_channelId].length;
    //     if (length > 0) {
    //         for (uint i = 0; i < length; i++) {
    //             string hash = fileVersionHistory[_channelId][i];
    //             nodeIdArray.push(fileVersion[hash].nodeId);
    //             fileNameArray.push(fileVersion[hash].fileName);
    //             timestampArray.push(fileVersion[hash].timestamp);
    //         }
    //     }
        
    //     return (
    //         nodeIdArray,
    //         fileNameArray,
    //         fileVersionHistory[_channelId],
    //         timestampArray
    //     );
    // }
    
    function getSpecificRecord (string _channelId, uint _index) 
        public 
        view 
        returns (
            string nodeId, 
            string fileName, 
            string fileHash, 
            string timestamp,
            bool endOfArray
        ) 
    {
        uint length = fileVersionHistory[_channelId].length;
        if (_index < length) {
            string hash = fileVersionHistory[_channelId][_index];
            if (_index == length-1) {
                return (
                    fileVersion[hash].nodeId,
                    fileVersion[hash].fileName,
                    hash,
                    fileVersion[hash].timestamp,
                    true
                );
            }
            else {
                return (
                    fileVersion[hash].nodeId,
                    fileVersion[hash].fileName,
                    hash,
                    fileVersion[hash].timestamp,
                    false
                );
            }
            
        }
        else {
            return (
                "",
                "",
                "",
                "",
                false
            );
        }
    }
}
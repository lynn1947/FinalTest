
import Web3 from 'web3'
import file_artifacts from './../../build/contracts/FileSystem.json'

const web3 = new Web3(Web3.currentProvider || new Web3.providers.HttpProvider("http://localhost:10002"))
const FileContract = new web3.eth.Contract(file_artifacts.abi,"0x08e5A47E6aB4226B039ca802e65dE1cf223c3D0F")

export default FileContract
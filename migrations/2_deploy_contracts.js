const ConvertLib = artifacts.require("ConvertLib");
const FileSystem = artifacts.require("FileSystem");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, FileSystem);
  deployer.deploy(FileSystem);
};

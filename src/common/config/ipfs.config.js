// defaultIpfsDaemonSettings
const genIpfsDaemonSettings= function(ipfsDataDir, isFirst=true) {
    return {
      repo: ipfsDataDir,
      init: isFirst, // 根据所输入的名称来决定是否初始化一个ipfs节点
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          API: '/ip4/127.0.0.1/tcp/0',
          Swarm: [
            '/ip4/0.0.0.0/tcp/0'
          ],
          Gateway: '/ip4/0.0.0.0/tcp/0'
        },
        Discovery: {
          MDNS: {
            Enabled: false,
            Interval: 10
          },
          webRTCStar: {
            Enabled: true
          }
        },
        Bootstrap: [
          '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
          '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
          '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
          '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
          '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
          '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
          '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
          '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
        ]
      }
    }
  } 

  export default genIpfsDaemonSettings 

  
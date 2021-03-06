import { Chain } from 'types/ethers'

const supportedChains: Chain[] = [
  {
    name: 'Ethereum Mainnet',
    shortName: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chainId: 1,
    networkId: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    shortName: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chainId: 3,
    networkId: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    shortName: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chainId: 4,
    networkId: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    shortName: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chainId: 5,
    networkId: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'RSK Mainnet',
    shortName: 'rsk',
    chain: 'RSK',
    network: 'mainnet',
    chainId: 30,
    networkId: 30,
    rpc_url: 'https://public-node.rsk.co',
    nativeCurrency: {
      symbol: 'RSK',
      name: 'RSK',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    shortName: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chainId: 42,
    networkId: 42,
    rpc_url: 'https://kovan.infura.io/v3/%API_KEY%',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Classic Mainnet',
    shortName: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chainId: 61,
    networkId: 1,
    rpc_url: 'https://ethereumclassic.network',
    nativeCurrency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Sokol',
    shortName: 'poa',
    chain: 'POA',
    network: 'sokol',
    chainId: 77,
    networkId: 77,
    rpc_url: 'https://sokol.poa.network',
    nativeCurrency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Core',
    shortName: 'skl',
    chain: 'POA',
    network: 'core',
    chainId: 99,
    networkId: 99,
    rpc_url: 'https://core.poa.network',
    nativeCurrency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'xDAI Chain',
    shortName: 'xdai',
    chain: 'POA',
    network: 'dai',
    chainId: 100,
    networkId: 100,
    rpc_url: 'https://dai.poa.network',
    nativeCurrency: {
      symbol: 'xDAI',
      name: 'xDAI',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Callisto Mainnet',
    shortName: 'clo',
    chain: 'callisto',
    network: 'mainnet',
    chainId: 820,
    networkId: 1,
    rpc_url: 'https://clo-geth.0xinfra.com/',
    nativeCurrency: {
      symbol: 'CLO',
      name: 'CLO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Smart Chain',
    shortName: 'bsc',
    chain: 'smartchain',
    network: 'mainnet',
    chainId: 56,
    networkId: 56,
    rpc_url: 'https://bsc-dataseed1.defibit.io/',
    nativeCurrency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Celo Mainnet',
    shortName: 'celo',
    chain: 'celo',
    network: 'mainnet',
    chainId: 42220,
    networkId: 42220,
    rpc_url: 'https://forno.celo.org',
    nativeCurrency: {
      symbol: 'CELO',
      name: 'CELO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Celo Alfajores Testnet',
    shortName: 'celo',
    chain: 'celo',
    network: 'alfajores',
    chainId: 44787,
    networkId: 44787,
    rpc_url: 'https://alfajores-forno.celo-testnet.org',
    nativeCurrency: {
      symbol: 'CELO',
      name: 'CELO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Celo Baklava Testnet',
    shortName: 'celo',
    chain: 'celo',
    network: 'baklava',
    chainId: 62320,
    networkId: 62320,
    rpc_url: 'https://baklava-forno.celo-testnet.org',
    nativeCurrency: {
      symbol: 'CELO',
      name: 'CELO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]

export default supportedChains

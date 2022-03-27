import Web3 from 'web3'

export const SM_ADDRESS = '0xd50eb0ef159e717f42b8dae6F03f873d62Cc9A7A'


export const SM_ABI = [
  {'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'},
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': '_address',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'message',
        'type': 'string',
      }],
    'name': 'SmVuaNhanDuocTien',
    'type': 'event',
  },
  {
    'inputs': [],
    'name': 'countMember',
    'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [{'internalType': 'string', 'name': 'content', 'type': 'string'}],
    'name': 'deposit',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'getBalance',
    'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'odering',
        'type': 'uint256',
      }],
    'name': 'getDetail',
    'outputs': [
      {'internalType': 'address', 'name': '', 'type': 'address'},
      {'internalType': 'uint256', 'name': '', 'type': 'uint256'},
      {'internalType': 'string', 'name': '', 'type': 'string'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }]


const ROPSTEN_URL = 'wss://ropsten.infura.io/ws/v3/fa862fb136c44af3900e211a82c42a88'
const provider = new Web3.providers.WebsocketProvider(ROPSTEN_URL);
const web3Infura = new Web3(provider)
export const infuraContract = new web3Infura.eth.Contract(SM_ABI, SM_ADDRESS)
export const FAUCET_ADDRESS = '0x42f70f24d1e1c3161891e82d15ca6ba22bcc00a3'

export const FAUCET_ABI = [
  {'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'},
  {'stateMutability': 'payable', 'type': 'fallback'},
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
    'inputs': [
      {
        'internalType': 'address payable',
        'name': 'receiver',
        'type': 'address',
      }],
    'name': 'sendToAddress',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {'stateMutability': 'payable', 'type': 'receive'}]
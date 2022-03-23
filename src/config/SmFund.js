export const SM_FUND_ADDRESS = '0x8ab09f969581fce9c0ae2dbc957d75cb52c4294f'

export const SM_FUND_ABI = [
  {'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'},
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

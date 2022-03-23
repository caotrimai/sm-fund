import React, {useCallback, useEffect, useReducer} from 'react'
import Web3 from 'web3'
import {SM_ETH_DEV_ABI, SM_ETH_DEV_ADDRESS} from '../../config/SmEthDev'


const web3 = new Web3(window.ethereum)

const ethContract = new web3.eth.Contract(SM_ETH_DEV_ABI, SM_ETH_DEV_ADDRESS)

export default function EthDev(){
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      balance: '0',
      currentAccount: null,
      connectMsg: '',
    }, undefined,
  )
  const {
    currentAccount,
  } = state

  const connectMetamask = useCallback(() => {
    if(!window.ethereum) {
      return
    }
    const requestAccounts = window.ethereum.request({method: 'eth_requestAccounts'})
    requestAccounts.then(accounts => {
      setState({accounts, currentAccount: accounts[0]})
    })
  }, [])
  
  const loadNumOwners = useCallback(() => {
    ethContract.methods.m_numOwners().call()
    .then((numOwners) => console.log({numOwners}))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      console.log('MetaMask is installed!')
      connectMetamask()
      loadNumOwners()
    } else {
      setState({connectMsg: 'Please install meta mask'})
    }

  }, [connectMetamask, loadNumOwners])
  
  return (
    <div className='EthDev'>
      <h4>EthDev</h4>
      <h5>{currentAccount}</h5>
    </div>
  )
}
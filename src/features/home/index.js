import React, {useCallback, useEffect, useReducer} from 'react'
import Web3 from 'web3'
import {SM_FUND_ABI, SM_FUND_ADDRESS} from '../../config/SmFund'

const web3 = new Web3(window.ethereum) // ? tại sao truyển window.ethereum vào đây, không truyền có được không. 
// tại vì nếu đã dùng web3 thì phải dùng cho cái mạng rồi, nên đúng ra mặc định nó phải tự lấy window.ethereum truyền vào luôn chứ sao mình cần truyền nhỉ

const smFundContract = new web3.eth.Contract(SM_FUND_ABI, SM_FUND_ADDRESS)
export default function Home () {

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      balance: '0',
      accounts: [],
      currentAccount: null,
      connectMsg: '',
      bnbValue: '',
      depositMsg: '',
    }, undefined,
  )
  const {
    balance,
    currentAccount,
    connectMsg,
    bnbValue,
    depositMsg,
  } = state

  const connectMetamask = useCallback(() => {
    const requestAccounts = window.ethereum.request({method: 'eth_requestAccounts'})
    requestAccounts.then(accounts => {
      setState({accounts, currentAccount: accounts[0]})
    })
  }, [])

  const loadBalances = useCallback(() => {
    smFundContract.methods.getBalance().call()
      .then((balance) => setState({balance}))
  },[])

  useEffect(() => {
    if (window.ethereum) {
      console.log('MetaMask is installed!')
      connectMetamask()
      loadBalances()
    } else {
      setState({connectMsg: 'Please install meta mask'})
    }

  }, [connectMetamask, loadBalances])
  
  function convertWeiToBnb(value) {
    return web3.utils.fromWei(value, 'ether')
  }

  function deposit () {
    if (!bnbValue || !depositMsg) {
      alert('Please type bnb & message')
      return
    }
    if (!currentAccount) {
      setState({connectMsg: 'Please connect meta mask'})
      return
    }

    smFundContract.methods.deposit(depositMsg)
      .send({
        from: currentAccount,
        value: web3.utils.toWei(bnbValue.toString(), 'ether'),
      })
      .then(() => {
        console.log('deposit success')
        setState({
          bnbValue: '',
        })
      })
      .catch(err => console.log(err))
  }

  function loadMembers () {
    smFundContract.methods.countMember().call()
      .then((total) => {
        const totalNumber = parseInt(total)
        if (totalNumber > 0) {
           
        }
      })
  }
 

  return (
    <div>
      Fund
      <button onClick={connectMetamask}>Connect metamask</button>
      <button onClick={loadBalances}>Load balances</button>
      <div>{currentAccount}</div>
      <div>{connectMsg}</div>
      <div>{convertWeiToBnb(balance)} BNB</div>
      <button onClick={loadMembers}>Load members</button>

      <hr/>
      BNB:
      <input
        type='text'
        value={bnbValue}
        placeholder='BNB'
        onChange={(e) => setState({bnbValue: e.target.value})}
      />
      <br/>
      Message:
      <input
        type='text'
        value={depositMsg}
        placeholder='message'
        onChange={(e) => setState({depositMsg: e.target.value})}
      />
      <br/>
      <button onClick={deposit}>Deposit</button>
      <hr/>
      
    </div>
  )
}
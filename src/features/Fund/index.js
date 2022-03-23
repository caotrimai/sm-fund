import {makeStyles} from '@mui/styles'
import React, {useCallback, useEffect, useReducer} from 'react'
import Web3 from 'web3'
import {SM_FUND_ABI, SM_FUND_ADDRESS} from '../../config/SmFund'
import CustomButton from '../common/components/CustomButton'

const web3 = new Web3(window.ethereum) // ? tại sao truyển window.ethereum vào đây, không truyền có được không. 
// tại vì nếu đã dùng web3 thì phải dùng cho cái mạng rồi, nên đúng ra mặc định nó phải tự lấy window.ethereum truyền vào luôn chứ sao mình cần truyền nhỉ

const smFundContract = new web3.eth.Contract(SM_FUND_ABI, SM_FUND_ADDRESS)

const useStyles =  makeStyles({
  textRed: {
    color: 'red'
  },
  marginEven: {
    margin: '8px'
  }
})

export default function Home () {
  const classes = useStyles()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      owner: '',
      balance: '0',
      accounts: [],
      currentAccount: null,
      connectMsg: '',
      bnbValue: '',
      depositMsg: '',
    }, undefined,
  )
  const {
    owner,
    balance,
    currentAccount,
    connectMsg,
    bnbValue,
    depositMsg,
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

  const loadContractInfo = useCallback(() => {
    smFundContract.methods.getBalance().call()
      .then((balance) => setState({balance}))
    smFundContract.methods.owner().call()
      .then((owner) => setState({owner}))
  },[])

  useEffect(() => {
    if (window.ethereum) {
      console.log('MetaMask is installed!')
      connectMetamask()
      loadContractInfo()
    } else {
      setState({connectMsg: 'Please install meta mask'})
    }

  }, [connectMetamask, loadContractInfo])
  
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
      .catch(err => console.log(err))
  }
 

  return (
    <div>
      <h2>Fund created by {owner}</h2>
      <h5 className={classes.textRed}>{connectMsg}</h5>
      <CustomButton onClick={connectMetamask}>Connect metamask</CustomButton>
      <CustomButton onClick={loadContractInfo}>Load balances</CustomButton>
      <div>{currentAccount}</div>
      <div>{convertWeiToBnb(balance)} BNB</div>
      <CustomButton onClick={loadMembers}>Load members</CustomButton>

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
      <CustomButton onClick={deposit}>Deposit</CustomButton>
      <hr/>
      
    </div>
  )
}
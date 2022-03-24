import detectEthereumProvider from '@metamask/detect-provider'
import {makeStyles} from '@mui/styles'
import React, {useCallback, useEffect, useReducer} from 'react'
import {SM_FUND_ABI, SM_FUND_ADDRESS} from '../../config/SmFund'
import CustomButton from '../common/components/CustomButton'
import Web3 from 'web3'

const useStyles = makeStyles({
  donate: {
    textAlign: 'center'
  },
  redText: {
    color: 'red'
  },
  block: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
})

export default function Faucet () {
  const classes = useStyles()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      provider: null,
      web3: null,
      contract: null,
      currentAccount: '',
      balance: 0,
      errorMsg: '',
      faucetMoney: 0,
      donateInput: '',
      donateMsg: '',
    }, undefined,
  )
  const {
    provider,
    web3,
    contract,
    currentAccount,
    balance,
    errorMsg,
    donateMoney,
    donateInput,
    donateMsg,
  } = state

  const loadBalance = useCallback(() => {
    provider && currentAccount
    && provider.request({
      method: 'eth_getBalance',
      params: [currentAccount, 'latest'],
    })
    .then((response) => {
      const balance = web3.utils.fromWei(
        web3.utils.hexToNumberString(response), 'ether')
      setState({balance})
    })
    .catch((err) => console.error(err))
  },[provider, currentAccount])
  
  // load balance
  useEffect(() => {
    loadBalance()
  }, [loadBalance])
  
  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', (accounts) => {
        setState({currentAccount: accounts[0]})
      })
      provider.on('chainChanged', (chainId) => {
        window.location.reload()
      })
    }
  }, [provider])

  const loadDonateMoney = useCallback(() => {
    web3 && web3.eth.getBalance(contract.options.address)
    .then((balance) => {
      const donateMoney = web3.utils.fromWei(balance)
      setState({donateMoney})
    })
    .catch((error) => console.log(error))
  },[web3])
  
  useEffect(() => {
    if (contract) {
      loadDonateMoney()
    }
  },[contract, loadDonateMoney])
  
  const handleConnectWallet = async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      provider.request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        const web3 = new Web3(provider)
        const contract = new web3.eth.Contract(SM_FUND_ABI, SM_FUND_ADDRESS)
        setState({
          provider,
          web3,
          contract,
          currentAccount: accounts[0],
          errorMsg: '',
        })
      })
      .catch((err) => console.log(err))
    } else {
      setState({errorMsg: 'Please install metamask!'})
    }
  }

  const handleDonate = () => {
    if(!contract) {
      setState({errorMsg: 'Please connect to metamask'})
      return
    }
    contract.methods.deposit(donateMsg)
    .send({
      from: currentAccount,
      value: web3.utils.toWei(donateInput.toString(), 'ether'),
    })
    .then(() => {
      loadBalance()
      loadDonateMoney()
      console.log('Donate success!')
    })
    .catch((err) => console.log(err))
  }
  
  const handleWithdraw = () => {
    if(!contract) {
      setState({errorMsg: 'Please connect to metamask'})
      return
    }
    contract.methods.withdraw()
      .send({from: currentAccount})
      .then(() => {
        console.log('Withdraw success')
        loadBalance()
        loadDonateMoney()
      })
      .catch((err) => console.log(err))
  }
  
  return (
    <div className={classes.donate}>
      <h2>DONATE PAGE</h2>
      <h4 className={classes.redText}>{errorMsg}</h4>
      <h4> Current account: {currentAccount}</h4>
      <h4>Balance: {balance} BNB</h4>
      <CustomButton onClick={handleConnectWallet}>
        Connect metamask
      </CustomButton>
      <div>
        <h2>Donate contract</h2>
        <h5>WALLET ADDRESS: {SM_FUND_ADDRESS}</h5>
        <h5>TOTAL MONEY: {donateMoney} BNB</h5>
        <div>
          <input 
            type='text'
            value={donateInput} 
            placeholder='donate value'
            onChange={(e) => setState({donateInput: e.target.value})}
          />
          <input
            type='text'
            value={donateMsg}
            placeholder='message' 
            onChange={(e) => setState({donateMsg: e.target.value})}
          />
        </div>
        <div className={classes.block}>
          <CustomButton color='success' onClick={handleDonate}>
            Submit donate
          </CustomButton>
        </div>
        <div className={classes.block}>
          <CustomButton color='success' onClick={handleWithdraw}>
            Withdraw
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
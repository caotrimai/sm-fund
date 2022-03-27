import detectEthereumProvider from '@metamask/detect-provider'
import {makeStyles} from '@mui/styles'
import React, {useCallback, useEffect, useReducer} from 'react'
import Web3 from 'web3'
// import {SM_FUND_ABI, SM_FUND_ADDRESS} from '../../config/SmFund'
import {infuraContract, SM_ABI, SM_ADDRESS} from '../../config/SmFundRopsten'
import CustomButton from '../common/components/CustomButton'

const useStyles = makeStyles({
  donate: {
    textAlign: 'center'
  },
  redText: {
    color: 'red'
  },
  donateForm: {
    padding: '8px',
    maxWidth: '500px',
    margin: '8px auto',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: `
      0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%)`
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
      contractAddress: '',
      donateInput: '',
      donateMsg: '',
      reload: false,
    }, undefined,
  )
  const {
    provider,
    web3,
    contract,
    currentAccount,
    balance,
    errorMsg,
    contractAddress,
    donateMoney,
    donateInput,
    donateMsg,
    reload
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
      setState({contractAddress: contract.options.address})
      loadDonateMoney()
    }
  },[contract, loadDonateMoney])
  
  useEffect(() => {
    loadBalance()
    loadDonateMoney()
  },[reload])

  useEffect(() => {
    web3 && infuraContract.events.SmVuaNhanDuocTien(
      {filter:{}, fromBlock:"latest"}, 
      (error, event) => {
        const address = event.returnValues[0]
        const amount = web3.utils.fromWei(event.returnValues[1], "ether")
        const message = event.returnValues[2]
        console.log({address, amount, message})
      }
    );
  },[web3])
  
  const handleConnectWallet = async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      provider.request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        const web3 = new Web3(provider)
        const contract = new web3.eth.Contract(SM_ABI, SM_ADDRESS)
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
  
  const reloadEffect = () => setState({reload: !reload})

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
      reloadEffect()
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
        reloadEffect()
      })
      .catch((err) => console.log(err))
  }
  
  return (
    <div className={classes.donate}>
      <h4 className={classes.redText}>{errorMsg}</h4>
      <h4> Current account: {currentAccount}</h4>
      <h4>Balance: {balance} BNB</h4>
      <CustomButton onClick={handleConnectWallet}>
        Connect metamask
      </CustomButton>
      <div className={classes.donateForm}>
        <h2>Donate</h2>
        <h5>WALLET ADDRESS: {contractAddress}</h5>
        <p>Current Balance: <strong> {donateMoney} BNB</strong></p>
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
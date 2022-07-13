import React,{useState,useEffect} from "react";
import {ethers}from 'ethers'
import {contractAddress,contractABI} from '../../utils/utils'
export const TransactionContext = React.createContext();
const {ethereum} = window;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress,contractABI,signer)
    return TransactionContract;
}

export const TransactionProvider = ({children} )=>{
    const [currentAccount, setCurrentAccounts] = useState()
    const [formData , setformData ] = useState({addressTo:'',
amount:'',keyword:'',message:''})
const [loading, setLoading] = useState()
const [transactionCount,settransactionsCount] = useState(localStorage.getItem('transactionCount'))
const handleChange = (e, name) =>{
setformData((preSatte) =>({...preSatte,[name]:e.target.value}))
}
    const checkIfWalletIsConnected = async () =>{
        try{
            if(!ethereum) return alert('please install metamask');

            const accounts = await ethereum.request({method:'eth_accounts'})
            if(accounts.length){
                setCurrentAccounts(accounts[0]);
            }
            else{
                console.log('No Accounts found');
            }
            console.log(accounts,'acconts') 
        }
        catch(error){
            console.log(error)
            throw new Error('No Accounts founds')
        }
    }


    const connectWallet = async () =>{
        try{
            if(!ethereum) return alert('please install metamask');
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            setCurrentAccounts(accounts[0])
            console.log(accounts,'acconts') 
        }catch(error){
            console.log(error)
            throw new Error('No eth availble')
        }
    }

    const sendTransactions = async() =>{
        try{
if(!ethereum)return alert('please install metamask first');
//get data from 
const {addressTo,amount, message,keyword} = formData;
const transactionContract = getEthereumContract();
const parsedAmount = ethers.utils.parseEther(amount);
await ethereum.request({method:'eth_sendTransaction',
params:[{
from:currentAccount,
to:addressTo,
gas:'0x5208',
value:parsedAmount._hex}]})
const transactionHash = await transactionContract.addBlockChain(addressTo,parsedAmount,message,keyword);
setLoading(!loading) ;
await transactionHash.await();
console.log('loading',`${transactionHash.hash}`)
setLoading(loading);
console.log('cuccess');
const transactionCount = await transactionContract.getTransactionCount();
settransactionsCount(transactionCount.toNumber())
        }
        catch(error){
            console.log(error)
        }

    }


   useEffect(()=>{
        checkIfWalletIsConnected();
    },[])
return (
    <TransactionContext.Provider value= {{connectWallet,currentAccount,handleChange,formData,setformData,sendTransactions}}>
        {children}
    </TransactionContext.Provider>
)
}
import {
    Flex,
    Grid,
    Box,
    Input,
    Text,
    Button,
    FormControl,
    FormLabel,
    NumberInputField,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputGroup,
    InputRightAddon,
    useDisclosure,
    Stack ,
    RadioGroup,
    Radio, 
    Select,
    useProps
       
  } from '@chakra-ui/react'
  import { useForm, useFieldArray,Controller, useWatch  } from 'react-hook-form'

  import { getLayout, WithPageLayout } from '@components/Layout'

  import AppModal from '@components/AppModal'
  import { ErrorMessage } from '@hookform/error-message'

  import { TCreateSwapFormSchema, createSwapFormSchema } from '../components/CreateTransfer/validation'
  import { yupResolver } from '@hookform/resolvers/yup';
  import * as yup from "yup";
  import { useCallback, useState, useEffect } from 'react' 
  import { setValues } from 'framer-motion/types/render/utils/setters'

  import useEthers  from '@hooks/useEthers'
  import { useEthersStore  } from '@stores/ethersStore'
  import {SwapTokenTransaction} from 'types/ethers'
  import hre, { ethers } from 'hardhat';
  import  fs from 'fs';
  import { TokenSwapcontractABI, TokenSwapcontractAddress } from 'constants/constants' 
  import { Signer, BigNumber, ContractFactory, Contract } from "ethers";
  import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

  import { expect } from "chai";
  import chai   from "chai";
  import chaiaspromised from "chai-as-promised";
  import { Wallet } from "ethers";
import { TransactionResponse } from '@ethersproject/abstract-provider'

import useSafeInfo, { useSafe } from 'hooks/useSafe'
import useSafeSdk from 'hooks/useSafeSdk'
import {useSafeProps} from 'hooks/useSafe'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { useSafeStore} from 'stores/safeStore'
import enableModule from '@utils/enableSafeModule'
import ApproveTransfer from '@components/ApproveTransfer'
import Safe, { SafeFactory, SafeAccountConfig,EthSignSignature, ContractNetworksConfig } from '@gnosis.pm/safe-core-sdk';

import SafeServiceClient, { ProposeTransactionProps, SafeInfoResponse } from '@gnosis.pm/safe-service-client'
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import {TokenDepositvalue,   TokenType, TokenTypesDetails } from 'types/index'



/*
return { signer, safeSdk, safeService, safeAddress,safeTransaction, executeTxResponse, isTxnExecutable, approveTransfer, rejectTransfer }
}
 */




/*
return {
  enableSafeModule,
  isLoading,
  safe,
  isCurrentUserAlreadySigned,
  refetch,
  hasReachedThreshold,
  executeSafeModule,
}
}

export default useSafe
*/






 // time for approval 
      // create transaction 
      // propose and ensure confirmations
      //  execute the transaction, or create transfer 
      // provide results
      // the receipients of the swap or the swap itself 
     // 


     // Things to do
     // Check for inputs
     // CHeck for sensistivity to schema
     //  Populate object into them


     
    interface newSafeAddress {
      safeAddress: string
      userAddress: string
    }

   
    interface SwapExecutionFormProps{
     
     tokentxhash: string,
     nonce:string ,
     amount:number,
     tokenname:string,
     symbol:string,
     logoUri:string 


    }
   
    // Hard Coded but we could set up a page where it can be put into it to be hardcoded
    const tokenLists: TokenType[] = [

    {
      tokenname: 'TokenBTC',
      symbol: 'TOKBTC',
      decimals: 100,
      logoUri: '0xef719f31e4F71392cDAda87E94e3a9C25Fce88B6'


    },

 
    {
      tokenname: 'TokenABC',
      symbol: 'TABC',
      decimals: 100,
      logoUri: '0xd065dE9F870cb6a6C1A71120f5bF85CaDa2Ef862'
 
    },

    {
      tokenname: 'TokenXYZ',
      symbol: 'TXYZ',
      decimals: 100,
      logoUri: '0x987F2B70576CC8BED9c1bbB09acCF324DC5a0EC4'

    }
  ]

 const schema = yup.object({
    amount: yup.number().required(),
    tokentxhash: yup.string().required(), 
    tokenname:yup.string().required(),
    symbol: yup.string().required(),
    signer:yup.string().required(),
    
  }).required();

 
      const {
      register,
      handleSubmit,
      watch,
      // Read the formState before render to subscribe the form state through the Proxy
      formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
    } = useForm<SwapTokenTransaction>(

      {  
        defaultValues: 
        {
        amount: 0.0,
        tokentxhash: 'TransactionHash', 
        tokenname: 'Ethereum',
        symbol: 'ETH',
        signer:'0X'
        },
        resolver: yupResolver(schema)
       
       }  );
 
    const amountWatch = watch("amount")
    const {onConnect,  onDisconnect } = useEthers()
    
      tokenname:string,
      export const TokenSwapOriginal:  React.FC<SwapExecutionFormProps> = ( tokentxhash, nonce,amount,tokenname, symbol, logoUri) => {
  
      const [isLoading, setIsLoading] = useState(false)
      const [isSwapping, setIsSwapping] = useState(true)
     
      const [isTyping, setIsTyping] = useState(true)  
      const [transaction,setTransaction] = useState('')
      const [token, setToken] = useState('')
      const [safemodule, setSafemodule] = useState(false) 
      const [execTxn, setexecTxn ] = useState(true)
      const [safeInfo, setSafeInfo] = useState({})

      
       /*
 const schema = yup.object({
    symbol: yup.string().required(),
    tokenstring: yup.string().required(),
    decimals: yup.string().required(),
    logoUri: yup.string().required(),
    address: yup.string().required(),
  }).required();
 */



    const handleChange = (event) => { 
      isTyping
      setAmount(event.target.value)
      !isTyping
      // Logic of token conversion must be here
    
    }
    
    // onchange handling, to post text

    // submission

     // getting address and state of address
  const address = useEthersStore((state) => state.address)
  const provider = useEthersStore((state) => state.provider)
  const setAddress = useEthersStore((state) => state.setAddress)
  const setEtherStore = useEthersStore((state) => state.setEtherStore)
    
    const selectedSafe = useSafeStore((state) => state.selectedSafe)
    const isModuleEnabled = useSafeStore((state) => state.isModuleEnabled)
    const setIsModuleEnabled = useSafeStore((state) => state.setIsModuleEnabled)

    // Provider information to be provided
   
    
    const {signer, safeSdk, safeService, safeAddress,safeTransaction, approveTransfer, rejectTransfer} = useSafeSdk()
    const { enableSafeModule, safe,isCurrentUserAlreadySigned,safeTxHash, status,  checkIsSigned,refetch,checkIfWaitingForExecution,hasReachedThreshold,executeSafeModule} = useSafe({safeAddress, userAddress:address } );
 
  const onSubmit = async ({ amount, nameoftoken, symbol, nameofclient, date}   ) => {

     
    // We will be executing via a multisig approach here 
    // We will professing sending a swap token which we must 
    // etherjs connecting the swap account
      // Transactional opbject
      // swaptransaction object
       // etherjs stuff
        //Gnosis safe 
      // create transaction
      // propose
      // sign 
      //execute transactiono
      //sign with gnosis safe
      // send transaction
    //  let transactionsend: TransactionResponse = await signer.sendTransaction(swapTransaction);
    //  console.log(transactionsend);
                
      setIsLoading(true)
      onConnect()     
    
      setTransaction(transaction)
      setToken(nameoftoken)         
      
      let SwapContract:Contract = new ethers.Contract(TokenSwapcontractAddress,TokenSwapcontractABI, provider )
      let depositamount: BigNumber = BigNumber.from(10000)
        
     // let swapcontracttx: number = SwapContract.connect(provider).swapTKA(depositamount)
    
     let swapcontracttx:TransactionResponse = await SwapContract.swapTKA(depositamount)
      
     let swapcontracttxreceipt = swapcontracttx.wait() 
     console.log ("contract receipt ", await swapcontracttxreceipt );
       
     let transactionreceipthash = (await swapcontracttxreceipt).transactionHash
     
     
      const swapTransaction: SwapTokenTransaction ={                      
        amount: amount,
        tx: transactionreceipthash,         
        tokenname: nameoftoken,
        symbol: symbol,

      }
     if (!safeAddress && selectedSafe){
             
         getnewsafeAddress(safeAddress)
          
        }
      else {
             setIsLoading(true)
             const safeInfo = await safeService.getSafeInfo(safeAddress)
      }
       if (!isModuleEnabled){
            let {status, safeTxHash, nonce} = await enableSafeModule()
            setexecTxn(true)
            
          }

       checkIsSigned()
    
       if ( !isCurrentUserAlreadySigned && hasReachedThreshold){
        checkIfWaitingForExecution() 
        executeSafeModule()
                 }
          
        approveTransfer({safeTxHash, execTxn})           
           
        rejectTransfer({ safeTxHash, execTxn, nonce })
           


 // approve the transaction to be done
        
    }
     
   

    
    const getnewsafeAddress = useCallback(async (safeAddress) => {
       let safeInfo; 
      setIsLoading(true)
      if (safeAddress) {
          safeInfo = await safeService.getSafeInfo(safeAddress)
          setSafeInfo(safeInfo)
      }
      setIsLoading(false)
      return {safeAddress, safeInfo}

    }, [safeAddress])

 /*
      let fulltransaction:Transaction =  contract.connect(signer).storeGnosisSafeAddress(String(process.env.DEV_ADDRESS),String(process.env.SAFEADDRESS) );
    
      let receiptdata = await fulltransaction.data;
       console.log(receiptdata) 
      let txhash = fulltransaction.hash;
      
      const tx = await safeService.getTransaction(txhash)

        const GnosisSafeContractFileabi  = "./artifacts/contracts/GnosisSafeGetAddresses.json";
 
     let myabi = JSON.parse(fs.readFileSync('GnosisSafeContractFileabi').toString());


*/

    

  return (
    <chakra.form py={2}>
    {fields.map((f, idx) => {
      const assetError = errors.recipients?.[idx].asset
      const amountError = errors.recipients?.[idx].amount
      const recipientError = errors.recipients?.[idx].recipient
      const isLastItem = fields.length - 1 === idx

    <Grid placeItems="center" w="full" h="100vh">
      <Box w="500px" shadow="md" p="10" borderRadius="md" bg="gray.50">
        <Flex
          direction="column"
          css={{
            gap: '20px',
          }}
        >
      
        <form onSubmit={handleSubmit(onSubmit)}>
             
             <FormControl>
                <FormLabel htmlFor="tokenswapinputs" fontWeight="normal">
                 Swap Input Form 
                <Flex flexDirection="column" mt="20px">
                </Flex>
                  </FormLabel>               
                  
                <InputGroup  size="sm">
              
                <Input  value={amount} onChange={handleChange}   size='sm'   variant='outline' placeholder='inputamount'  {...register("amount", { required: true })} mb="5px" bg="white" />
                <p>{errors.amount?.message}</p>

               <InputRightAddon> 
              { tokenLists.map(({ nameoftoken, symbol }) => (<Select placeholder='Select Tokens'>
              <option  value= { nameoftoken}> { symbol}</option>
                  
              </Select> ))}
              
              </InputRightAddon>
                
                
                </InputGroup>             
                {!isTyping ? (<Text fontSize='50px' color='tomato'>  Amount is  {amount} </Text>): (<Text fontSize='50px' color='tomato'>  Amount is {0.0} </Text>)  }
              </FormControl>


              <Text fontSize='xl'>(xl) Click To Swap Tokens</Text>  
             
             
              <Button
              isLoading
              bg="blue.200"
              _hover={{ bg: 'blue.300' }}
              textColor="white"
              type="submit"
              w="full"
              mt="20px"
              onClick={() => onSubmit}
              loadingText='Swapping'
            >
                 Swap Now
          
            </Button>
            <Text fontSize='25px' color='tomato'>
                Calculated Token Value 
            </Text>
            <FormControl w="150px" id={`${idx}`} isInvalid={!!assetError?.message} mx={2}>
              <FormLabel>Asset</FormLabel>
              <FormErrorMessage>{assetError?.message}</FormErrorMessage>
            </FormControl> 
            <InputRightAddon> 
            { tokenLists.map(({ tokenname, symbol }) => (<Select placeholder='Select Tokens'>
              <option value= { tokenname}> { symbol}</option>
                  
              </Select> ))}
            </InputRightAddon>
                      
          </form>
        </Flex>
      </Box>
    </Grid>
  )  
  }


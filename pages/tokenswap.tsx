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
       
  } from '@chakra-ui/react'
  import { useForm, useFieldArray,Controller } from 'react-hook-form'
  import createSafe from '@utils/createSafe'
  import { TokenType } from 'types'
  import { getLayout, WithPageLayout } from '@components/Layout'
  import { SafeTransactionData } from '@gnosis.pm/safe-core-sdk-types'  
  import { useRouter } from 'next/router'
  import { useSafeStore, Safe } from 'stores/safeStore'
  import { MySafeTransactionData } from 'types'
  import hre from 'hardhat'
  import  fs from 'fs'
  import { useCallback, useState } from 'react' 
  import { useEffect } from 'react'
  import AppModal from '@components/AppModal'
  import abi from '@constants/abi'
  import ReactDatePicker from "react-datepicker";
  import { utils as ethersUtils, constants, Transaction } from 'ethers'
  import useSafeSdk from 'hooks/useSafeSdk'
  require ("../hardhat.config")
  import { ErrorMessage } from '@hookform/error-message' 

import { TCreateSwapFormSchema, createSwapFormSchema } from '../components/CreateTransfer/validation'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
  
// Question, how are the values passed
 // We find CreateTransferInput

 const schema = yup.object({
  symbol: yup.string().required(),
  tokenstring: yup.string().required(),
  decimals: yup.string().required(),
  logoUri: yup.string().required(),
  address: yup.string().required(),
}).required();


  type TokenTypeInfo ={
    
    symbol: string
    tokenstring: string
    decimals: number
    logoUri: string
    address:string
    date: string
    
  }

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(true)
  const [value, setValue] = useState('')
  const [tokenamount, setTokenAmount] = useState('')
  
  const [startDate, setStartDate] = useState(new Date());


  const handleChange = (event) => setValue(event.target.value)
  const handleBlur = (event ) => event.target.value.toLowerCase()
  const handleDate = (date:Date ) =>setStartDate(date)
// Question, how are the values passed
 // We find CreateTransferInput


  // So let us get the list of tokens and then we send each of these tokens
  export const TokenSwap: WithPageLayout = () => {

    const {
      control,
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<TokenTypeInfo>({
      resolver: yupResolver(schema)
    })
// airdrop component must be made
    const submit   = async ({symbol,tokenstring,decimals,logoUri,address,date }: TokenTypeInfo)=> {
    const modalDisclosure = useDisclosure()
   
    const { pathname } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
      
        // EXEC
    const isModuleEnabledInternal = useSafeStore(({ isModuleEnabled }: Safe) => isModuleEnabled)
      
        // Destruction, we are setting it to the compponent
    const { safeSdk, safeService, signer, safeAddress } = useSafeSdk()
        //has those information easily and already 
      
      //  asset: string
      // amount: number
       // recipient: string
      // createBulkTransferTxnCb = useCallBack() {


        setIsLoading(true)
        setIsSubmitting(true)
        const GnosisSafeContractFileabi  = "./artifacts/contracts/GnosisSafeGetAddresses.json";
       
        let myabi = JSON.parse(fs.readFileSync('GnosisSafeContractFileabi').toString());
      
        let contract  = await hre.ethers.getContractAtFromArtifact(myabi,'0xF117D1a20aaAE476Df7e00d9aA81F59b22c93F90');
        let fulltransaction:Transaction =  contract.connect(signer).storeGnosisSafeAddress(String(process.env.DEV_ADDRESS),String(process.env.SAFEADDRESS) );
      

        // Smart Contract Token Swap
        let receiptdata = await fulltransaction.data;
         console.log(receiptdata) 
        let txhash = fulltransaction.hash;
        
        const tx = await safeService.getTransaction(txhash)
    
        const safeTransactionData: SafeTransactionData = {
          to: tx.to,
          value: tx.value,
          data: tx.data ? tx.data : '0x',
          operation: tx.operation,
          safeTxGas: tx.safeTxGas,
          baseGas: tx.baseGas,
          gasPrice: Number(tx.gasPrice),
          gasToken: tx.gasToken,
          refundReceiver: tx.refundReceiver ? tx.refundReceiver : '0x0000000000000000000000000000000000000000',
          nonce: tx.nonce,
        }
  
         // we set ot to something and then we set to object
       // either create by sdk or create by hardhat transactions and set and send via sdk 
       // create bulk sdk 
       // create transactions

       const safeTransaction = await safeSdk.createTransaction(safeTransactionData)
       console.log(safeTransaction);
  
       // time for approval 
      // create transaction 
      //  execute the transaction, or create transfer 
      // provide results
      // the receipients of the swap 
     // 
    }


    return (
      <Grid placeItems="center" w="full" h="100vh">
        <Box w="500px" shadow="md" p="10" borderRadius="md" bg="gray.50">
          <Flex
            direction="column"
            css={{
              gap: '20px',
            }}
          >
        
          <form onSubmit={handleSubmit(submit)}>
               
               <FormControl>
                  <FormLabel htmlFor="amount" fontWeight="normal">
                    Swapping Form  
                  <Flex flexDirection="column" mt="20px">
                  </Flex>
                    </FormLabel>               

       
              {Boolean(!isLoading )}                
                  
                <InputGroup  size="sm">
                  <Input  variant='outline' placeholder='Amount'  value={value}   onChange={handleChange} {...register("symbol", { required: true })} mb="5px" bg="white" />
                  
                  <InputRightAddon>    <Text >  SYMBOL</Text>  </InputRightAddon>
                  <Input variant='outline' placeholder='Amount'  value={value}   onChange={handleChange} {...register("tokenstring", { required: true })} mb="5px" bg="white" />
                  
                  <InputRightAddon>    <Text >  TOK</Text>  </InputRightAddon>
                  <Input   variant='outline' placeholder='Amount'  value={value}   onChange={handleChange} {...register("decimals", { required: true })} mb="5px" bg="white" />
                  
                  <InputRightAddon>    <Text >  DEC</Text>  </InputRightAddon>

                  <Input   variant='outline' placeholder='Amount'  value={value}   onChange={handleChange} {...register("logoUri", { required: true })} mb="5px" bg="white" />
                  
                  <InputRightAddon>    <Text >  LOGURI</Text>  </InputRightAddon>

                  <Input  variant='outline' placeholder='Amount'  value={value}   onChange={handleChange}  {...register("address", { required: true })} mb="5px" bg="white" />
                  
                  <InputRightAddon>    <Text >  ADD</Text>  </InputRightAddon>

                 
                </InputGroup>             

                </FormControl>
              
              <Text>Create Token Swap</Text>
              <Button
                bg="blue.200"
                _hover={{ bg: 'blue.300' }}
                textColor="white"
                type="submit"
                w="full"
                mt="20px"
                isLoading
                loadingText='Submitting'
              >
                Create Safe
            
              </Button>


              <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            
            onBlur={onBlur}
            onChange={handleChange}
            value={value}
          />
        )}
        name="symbol"
      />
      {errors.symbol && <Text>This is required.</Text>}

          <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <RadioGroup defaultValue='1'  name="form-name">
        <Stack spacing={4} direction='row'>
         <Radio value='1' isDisabled> SUSHI </Radio>
         <Radio value='2'  onChange={handleChange}>SOL</Radio>
         <Radio value='3' onChange={handleChange}>ETH</Radio>
        </Stack>
       </RadioGroup>
        )}
        name="tokenstring"
      />
       <Controller
        control={control}
        name="date"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
          />
        )}
      />
       {isSubmitting} 
      {errors.tokenstring && <Text>This is required.</Text>} 
            
            </form>
          </Flex>
        </Box>
      </Grid>
    )
 
   }
  
  TokenSwap.getLayout = getLayout('Token Swap')
  export default TokenSwap
  
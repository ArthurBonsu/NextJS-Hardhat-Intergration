import { Box, Button, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import AppModal from '@components/AppModal'
import abi from '@constants/abi'
import { yupResolver } from '@hookform/resolvers/yup'
import { utils as ethersUtils, constants, Transaction } from 'ethers'
import useSafeSdk from 'hooks/useSafeSdk'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateTransferInput } from 'types'
import CreateTransferForm from './CreateTransferForm'
import { createTransferFormSchema, TCreateTransferFormSchemaValues } from './validation'
import { useSafeStore, Safe } from 'stores/safeStore'
import { MySafeTransactionData } from 'types'
import hre from 'hardhat';
import  fs from 'fs';
import { SafeTransactionData } from '@gnosis.pm/safe-core-sdk-types'

import useTransactions from '@hooks/useTransactions'
import { useHashTransactionStore } from '@stores/transactionStore'


const setTransaction = useHashTransactionStore((state) => state.setTransaction)
const setTransactionData = useHashTransactionStore((state) => state.setTransactionData)
// UI
const { pathname } = useRouter()
const [isLoading, setIsLoading] = useState(false)
  // Destruction, we are setting it to the compponent
  const { safeSdk, safeService, signer, safeAddress } = useSafeSdk()
 /// This is where we will be creating our transfer 


 const modalDisclosure = useDisclosure()

 const { isOpen, onOpen, onClose } = useDisclosure()
 // EXEC
 const isModuleEnabledInternal = useSafeStore(({ isModuleEnabled }: Safe) => isModuleEnabled)

 const CreateTransfer = () => {

  //has those information easily and already 

//  asset: string
// amount: number
 // recipient: string
// createBulkTransferTxnCb = useCallBack() {
/*
  const GnosisSafeContractFileabi  = "./artifacts/contracts/GnosisSafeGetAddresses.json";
 
  let myabi = JSON.parse(fs.readFileSync('GnosisSafeContractFileabi').toString());


  const createTransferForArthur = async (mytransactions: MySafeTransactionData) => {
   setIsLoading(true)

      let contract  = await hre.ethers.getContractAtFromArtifact(myabi,'0xF117D1a20aaAE476Df7e00d9aA81F59b22c93F90');
      let fulltransaction:Transaction =  contract.connect(signer).storeGnosisSafeAddress(String(process.env.DEV_ADDRESS),String(process.env.SAFEADDRESS) );
    
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

   }


  // It has to create something before we can 
       // we create a transaction
       // we set the values 
       // se semd it to the blockchain
       // we receive receipts

 // We  are creating a transaction from this 

//}
  ///
*/
const txhash  = useHashTransactionStore((state) => state.txhash)
const txdata = useHashTransactionStore((state) => state.txdata)

  const createSwapTransaction  =useCallback(   

  async ( ) => {
    if (safeSdk && signer) {
      setIsLoading(true)      

      const tx = await safeService.getTransaction(txhash)
  
      const safeTransactionData: SafeTransactionData = {
        to: tx.to,
        value: tx.value,
        data: tx.data ? txdata : '0x',
        operation: tx.operation,
        safeTxGas: tx.safeTxGas,
        baseGas: tx.baseGas,
        gasPrice: Number(tx.gasPrice),
        gasToken: tx.gasToken,
        refundReceiver: tx.refundReceiver ? tx.refundReceiver : '0x0000000000000000000000000000000000000000',
        nonce: tx.nonce,
      }
      const safeNextTransaction = await safeSdk.createTransaction(safeTransactionData)
      await safeSdk.signTransaction(safeNextTransaction)
      const safeTxHash = await safeSdk.getTransactionHash(safeNextTransaction)
    
      await safeService.proposeTransaction({
        safeAddress,
        safeNextTransaction,
        safeTxHash,
        senderAddress: await signer.getAddress(),
      })
      setIsLoading(false)
      modalDisclosure.onClose()
    }
  },
  [safeAddress, safeSdk, signer, safeService, modalDisclosure]
)

//amount, tokentransfer, and a react hook


  const createBulkTransferTxnCb = useCallback(
 
    async (recipients: Array<CreateTransferInput>) => {
      if (safeSdk && signer) {
      setIsLoading(true)
        // We create a transaction with this receipients
      const txValue = recipients.reduce<string[][]>(
        (ac, cv) => [
          ...ac,
          [
            cv.recipient,
            ethersUtils.parseEther(`${cv.amount}`).toString(),
            constants.AddressZero, 
          ],
        ],
        []
      )
   
      
    
            //
        const smartContract = new ethersUtils.Interface(abi)
   
            /// execute bulk transfer via a smart contract that does it 
        const data = smartContract.encodeFunctionData('executeBulkTransfer', [safeAddress, txValue])
            
        // You have to get the safe address
         // We create transactions here 
         const safeTransaction = await safeSdk.createTransaction({
          to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
          data,
          value: '0',
          nonce: await safeService.getNextNonce(safeAddress),
        })
        
        await safeSdk.signTransaction(safeTransaction)
        const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
      
        await safeService.proposeTransaction({
          safeAddress,
          safeTransaction,
          safeTxHash,
          senderAddress: await signer.getAddress(),
        })
        setIsLoading(false)
        modalDisclosure.onClose()
      }},
    
    
    [safeAddress, safeSdk, signer, safeService, modalDisclosure]
  )
  
 // Question, how are the values passed
 // We find CreateTransferInput
  const formMethods = useForm<TCreateTransferFormSchemaValues>({
    resolver: yupResolver(createTransferFormSchema),
    defaultValues: {
      recipients: [
        {
          asset: 'ETH',
          amount: 0,
          recipient: '',
        },
      ],
    },
  })



return (
    <Box w="full">
      <AppModal disclosure={modalDisclosure} closeOnOverlayClick={false}>
       
        <FormProvider {...formMethods}>

         
          <CreateTransferForm
            onSubmit={(v) => createBulkTransferTxnCb(v.recipients)}
            disclosure={modalDisclosure}
            isLoading={isLoading}
          />
        </FormProvider>
      </AppModal>

      <Button
        colorScheme="blue"
        w="full"
        size="sm"
        isLoading={isLoading}
       // isDisabled={pathname !== '/safe/[safeAddress]/transfers' || !isModuleEnabledInternal}
        onClick={ ()=> {
          

         
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Create Transfer Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              If you will like to confirm transfer for the following transaction
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Confirm Transfer </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
          
        }
        }>
        Create transfer
      </Button>
    </Box>
  )
  
      }

export default CreateTransfer
 

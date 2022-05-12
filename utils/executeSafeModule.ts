
import { ethers } from 'ethers'
const hre = require ("hardhat")
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'


import Safe, { SafeFactory, SafeAccountConfig,EthSignSignature } from '@gnosis.pm/safe-core-sdk';
import SafeServiceClient, { SafeInfoResponse } from '@gnosis.pm/safe-service-client'
import { moduleAbi } from '@constants/abi'

const MODULE_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
const ENABLE_MODULE_SIG = '0x610b59250000000000000000000000001a8cd04ad268b1dc580f6162083cedfc1a76818e'
const safeService = new SafeServiceClient('https://safe-transaction.rinkeby.gnosis.io', safe)
const iface = new hre.ethers.utils.Interface(moduleAbi)
const data = iface.encodeFunctionData('enableModule', [MODULE_ADDRESS])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any

type ReturnType = {
  status: 'waiting' | 'success'
}

//Execute transactions , so this is the deal
export const executeModule = async (safeAddress: string): Promise<ReturnType> => {
  const { threshold }: SafeInfoResponse = await safeService.getSafeInfo(safeAddress)
  const web3Provider = window.ethereum
  const provider = new hre.ethers.providers.Web3Provider(web3Provider)
  const owner = provider.getSigner(0)
  const safe = await Safe.create({
    ethAdapter: new EthersAdapter({
      ethers,
      signer: owner,
    }),
    safeAddress,
  })

  // create transaction object
  const transaction = await safe.createTransaction({
    to: safeAddress,
    value: '0',
    data,
  })

  const multisigTransactions = await safeService.getMultisigTransactions(safeAddress)
  const sameTransaction = multisigTransactions.results.find(
    ({ data: transactionItem }) => transactionItem === ENABLE_MODULE_SIG
  )

  if (sameTransaction?.confirmations?.length) {
    if (threshold - sameTransaction.confirmations.length <= 1) {
      sameTransaction.confirmations.forEach((confirmation) => {
        const signature = new EthSignSignature(confirmation.owner, confirmation.signature)
        transaction.addSignature(signature)
      })
      const { transactionResponse } = await safe.executeTransaction(transaction)
      await transactionResponse?.wait()
      return { status: 'success' }
    }
  }
  return { status: 'waiting' }
}

export default executeModule

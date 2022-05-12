import axios from 'axios'
import { TransfersType, AssetType, SafeInfoType } from 'types'
/**
 * Should only register GET requests
 */
export default {
  getSafe: (walletAddress: string | null) => async () => {
    const result = await axios.get<{ safes: Array<string> }>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/owners/${walletAddress}/safes/`
    )
    return result.data
  },
  getSafeTransfers: (safeAddress: string) => async () => {
    const result = await axios.get<TransfersType>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/multisig-transactions/`
    )
    return result.data
  },
  getAssets: (safeAddress: string) => async () => {
    const result = await axios.get<Array<AssetType>>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/balances/usd/`
    )
    return result.data
  },
  getSafeInfo: (safeAddress: string) => async () => {
    const result = await axios.get<SafeInfoType>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/`
    )
    return result.data
  },
}

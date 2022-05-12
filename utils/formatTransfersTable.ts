export interface Confirmation {
  owner: string
  submissionDate: string
  transactionHash?: null
  signature: string
  signatureType: string
}

type Action = {
  approve: boolean
  reject: boolean
  show: boolean
}

export type Return = {
  nonce: number
  approvals: number | undefined
  rejections: number | undefined
  status: string
  timestamp: string | null | undefined
  action: Action
  transactionHash: string
  rejectionTransactionHash: string | null
  threshold: string | number | undefined
  isNextTxn: boolean
  isEnableModule: boolean
}

export type Returns = Record<number, Return>

type Asses = Record<string, boolean>

type method = {
  method: string | number | undefined
}

type Result = {
  safe: string
  to: string
  value: string
  data?: string
  operation: number
  gasToken: string
  safeTxGas: number
  baseGas: number
  gasPrice: string
  refundReceiver: string
  nonce: number
  executionDate?: string
  submissionDate: string
  modified: string
  blockNumber?: string
  transactionHash?: string
  safeTxHash: string
  executor?: string
  isExecuted: boolean
  isSuccessful?: string
  ethGasPrice?: string
  gasUsed?: string
  fee?: string
  origin?: string
  dataDecoded?: method | undefined
  confirmationsRequired?: string
  signatures?: string
  confirmations: Confirmation[]
  type: string
}

type GroupedResult = Record<string, Result[]>

export interface Response {
  count: string
  next: string
  previous: string
  results: Result[]
}

export const format = (response: Response, address: string, thresholdParams: number | undefined): Return[] => {
  const included: Record<string, 'pending' | 'executed'> = {
    pending: 'pending',
    executed: 'executed',
  }

  const date: Record<string, 'executionDate' | 'submissionDate'> = {
    rejected: 'executionDate',
    executed: 'executionDate',
    pending: 'submissionDate',
  }

   // We tried to group results and format transfers 
  const group = (grouped: GroupedResult, entry: Result) => {
    const { nonce } = entry
    let type

    if (entry.data !== null) {
      type = 'bulk'
    } else {
      type = entry.value === '0' ? 'rejection' : 'approval'
    }
 // Group all info in the record here 
    if (!grouped[nonce]) {
      return (grouped = { ...grouped, [nonce]: [{ ...entry, type }] })
    }

    // return from the group the result for each, the return type and the entry 
    // we track by the nonce here , from results that are buklk
    // group transactions results as well as index 
    // each group now becomes a key so we know which one is pending or executed based on their output 
    return (grouped = { ...grouped, [nonce]: [...grouped[nonce], { ...entry, type }] })
  }

  //  //Get current group for each of these
  const groupResult: GroupedResult = response.results.reduce(group, {})

  let hasNext = false

  const filteredResult: Return[] = Object.keys(groupResult)
    .map((key) => {
      const { nonce } = groupResult[key][0]

      const pending = groupResult[key].every(({ isExecuted }) => !isExecuted)
      const executed = groupResult[key]
        .filter(({ type }) => type === 'approval' || type === 'bulk')
        .some(({ isExecuted }) => isExecuted)
      const rejected = groupResult[key].filter(({ type }) => type === 'rejection').some(({ isExecuted }) => isExecuted)

      // returns
      //tries to get the status from the groups, remember group is copied into Objects
      const asses: Asses = { pending, executed, rejected }
      const status = Object.keys(asses).filter((statusState: string) => asses[statusState])[0]
      const timestamp = groupResult[key]
        .filter(({ type }) => type === included[status] || 'executed')
        .map((item) => item[date[status]])
        .sort()
        .filter(Boolean)[0]

      const threshold =
        status === 'pending'
          ? thresholdParams
          : groupResult[key].map(({ confirmationsRequired }) => confirmationsRequired).filter(Boolean)[0]

      let approvals = 0
      if (status === 'executed') {
        approvals =
          groupResult[key].find(({ isExecuted, type }) => (isExecuted && type === 'approval') || type === 'bulk')
            ?.confirmations.length || 0
      } else {
        approvals =
          groupResult[key].find(({ type }) => type === 'approval' || type === 'bulk')?.confirmations.length || 0
      }

      let rejections = 0
      if (status === 'rejected') {
        rejections =
          groupResult[key].find(({ isExecuted, type }) => isExecuted && type === 'rejection')?.confirmations.length || 0
      } else {
        rejections = groupResult[key].find(({ type }) => type === 'rejection')?.confirmations.length || 0
      }

      const action: Action = {
        show: false,
        approve: false,
        reject: false,
      }

      if (status === 'pending') {
        action.show = true
        action.approve =
          !groupResult[key]
            .find(({ type }) => type === 'approval' || type === 'bulk')
            ?.confirmations.some(({ owner }) => address === owner) || false
        action.reject =
          !groupResult[key]
            .find(({ type }) => type === 'rejection')
            ?.confirmations.some(({ owner }) => address === owner) || false
      }

      const rejectionTransactionHash =
        groupResult[key].filter(({ type }) => type === 'rejection')?.filter(Boolean)[0]?.safeTxHash || null

      const safeTxHash = groupResult[key]
        .filter(({ type }) => type === 'approval' || type === 'bulk')
        ?.filter(Boolean)[0]?.safeTxHash

      let isNextTxn = false
      if (pending && !hasNext) {
        hasNext = true
        isNextTxn = true
      }

      const isEnableModule = groupResult[key][0].dataDecoded?.method === 'enableModule'

      return {
        nonce,
        status,
        timestamp,
        approvals,
        rejections,
        transactionHash: safeTxHash,
        rejectionTransactionHash,
        action,
        threshold,
        isNextTxn,
        isEnableModule,
      }
    })
    .reverse()
  return filteredResult
}

export default format

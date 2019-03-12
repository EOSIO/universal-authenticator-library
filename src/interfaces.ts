import { Authenticator } from './Authenticator'

export interface AuthenticatorResponse {
  /** List of authenticators */
  availableAuthenticators: Authenticator[]

  /** The Authenticator to use for auto login, if supported and available */
  autoLoginAuthenticator: Authenticator | null
}

/** The fields that an Authenticator can style on their button */
export interface ButtonStyle {
  /** Whatever is provided here will be set as the `src` attribute */
  icon: string

  text: string
  textColor: string

  /** CSS string */
  background: string
}

/** Defines a supported chain */
export interface Chain {
  /** The chainId for the chain */
  chainId: string

  /** One or more rpcEndpoints associated with that chainId */
  rpcEndpoints: RpcEndpoint[]
}

export interface RpcEndpoint {
  protocol: string
  host: string
  port: number
  path?: string
}

/** Optional arguments to signTransaction */
export interface SignTransactionConfig {
  /** If the transaction should also be broadcast */
  broadcast?: boolean

  /** Number of blocks behind (for use with eosjs) */
  blocksBehind?: number

  /** Number of seconds before expiration (for use with eosjs) */
  expireSeconds?: number
}

/** The object returned from signTransaction */
export interface SignTransactionResponse {
  /** Was the transaction broadcast */
  wasBroadcast: boolean

  /** The transcation id (optional) */
  transactionId?: string

  /** The status of the transaction as returned by the RPC API (optional) */
  status?: string

  /** Set if there was an error */
  error?: {

    /** The error code */
    code: string,

    /** The error message */
    message: string,

    /** The error name */
    name: string
  }
  /** The raw transaction object */
  transaction: any
}

export const UALLoggedInAuthType = 'UALLoggedInAuthType'

export const UALAccountName = 'UALAccountName'

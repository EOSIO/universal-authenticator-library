import { RpcEndpoint, SignTransactionConfig, SignTransactionResponse } from './interfaces'

/**
 * Represents a logged in User and provides the ability to sign transactions as that user.
 */
export abstract class User {

  /**
   * @param transaction  The transaction to be signed (a object that matches the RpcAPI structure).
   */
  public abstract signTransaction(transaction: any, config?: SignTransactionConfig): Promise<SignTransactionResponse>

  /**
   * @param publicKey   The public key to use for signing.
   * @param data        The data to be signed.
   * @param helpText    Help text to explain the need for arbitrary data to be signed.
   *
   * @returns           The signature
   */
  public abstract signArbitrary(publicKey: string, data: string, helpText: string): Promise<string>

  /**
   * @param challenge   Challenge text sent to the authenticator.
   *
   * @returns           Whether the user owns the private keys corresponding with provided public keys.
   */
  public abstract verifyKeyOwnership(challenge: string): Promise<boolean>

  public abstract getAccountName(): Promise<string>

  public abstract getChainId(): Promise<string>

  public abstract getKeys(): Promise<string[]>

  protected returnEosjsTransaction(wasBroadcast: boolean, completedTransaction: any): SignTransactionResponse {
    if (wasBroadcast) {
      if (completedTransaction.hasOwnProperty('transaction_id')) {
        return {
          wasBroadcast: true,
          transactionId: completedTransaction.transaction_id,
          status: completedTransaction.processed.receipt.status,
          transaction: completedTransaction,
        }
      } else if (completedTransaction.hasOwnProperty('code')) {
        return {
          wasBroadcast: true,
          error: {
            code: completedTransaction.code,
            message: completedTransaction.message,
            name: completedTransaction.error.name,
          },
          transaction: completedTransaction,
        }
      } else {
        return {
          wasBroadcast: true,
          transaction: completedTransaction,
        }
      }
    } else {
      return {
        wasBroadcast: false,
        transaction: completedTransaction,
      }
    }
  }

  protected buildRpcEndpoint(endPoint: RpcEndpoint): string {
    let rpcEndpointString = `${endPoint.protocol}://${endPoint.host}:${endPoint.port}`
    if (endPoint.path) {
      let separator = '/'
      if (endPoint.path.startsWith('/')) {
        separator = ''
      }
      rpcEndpointString = `${rpcEndpointString}${separator}${endPoint.path}`
    }

    if (rpcEndpointString.endsWith('/')) {
      rpcEndpointString = rpcEndpointString.substring(0, rpcEndpointString.length - 1)
    }

    return rpcEndpointString
  }
}

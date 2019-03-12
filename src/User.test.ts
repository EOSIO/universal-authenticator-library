import { User } from "./User";
import { SignTransactionConfig, SignTransactionResponse, RpcEndpoint } from "./interfaces";

class TestUser extends User {
  public getKeys(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  public getRpcEndpointString(endpoint: RpcEndpoint): string {
    return this.buildRpcEndpoint(endpoint);
  }
  public getEosjsTransaction(wasBroadcast: boolean, completedTransaction: any): SignTransactionResponse {
    return this.returnEosjsTransaction(wasBroadcast, completedTransaction)
  }
  public signTransaction(transaction: any, config?: SignTransactionConfig): Promise<SignTransactionResponse> {
    throw new Error(`Method not implemented: ${transaction}, ${config}`);
  }
  public signArbitrary(publicKey: string, data: string, helpText: string): Promise<string> {
    throw new Error(`Method not implemented: ${publicKey}, ${data}, ${helpText}`);
  }
  public verifyKeyOwnership(challenge: string): Promise<boolean> {
    throw new Error(`Method not implemented: ${challenge}`);
  }
  public getAccountName(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  public getChainId(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

interface MockAction {
  account: string
  name: string
}

interface MockData {
  to: string
  from: string
}

interface MockTransaction {
  actions: MockAction[]
  data: MockData[]
  transaction_id?: number
  processed?: any
  code?: number
  message?: string
  error?: any
}

describe('User', () => {
  let user: TestUser;
  let endpoint: RpcEndpoint;

  beforeEach(() => {
    user = new TestUser();
  });

  describe('builds a correct endpoint', () => {

    it('with a path containing a leading slash', () => {
      endpoint = {
        host: "example.com",
        port: 80,
        protocol: "http",
        path: "/"
      }

      expect(user.getRpcEndpointString(endpoint)).toEqual("http://example.com:80")
    })

    it('with a path containing a trailing slash', () => {
      endpoint = {
        host: "example.com",
        port: 80,
        protocol: "http",
        path: "/somepath/"
      }

      expect(user.getRpcEndpointString(endpoint)).toEqual("http://example.com:80/somepath")
    })

    it('with no path', () => {
      endpoint = {
        host: "example.com",
        port: 80,
        protocol: "http"
      }

      expect(user.getRpcEndpointString(endpoint)).toEqual("http://example.com:80")
    })
  })

  describe('returns a SignTransactionResponse that contains a raw transaction object', () => {
    let transaction: MockTransaction
    beforeEach(() => {
      transaction = {
        actions: [{
          account: 'example',
          name: 'example'
        }],
        data: [{
          to: 'cryptkeeper',
          from: 'example'
        }]
      }
    })

    it('if the transaction was not broadcast', () => {
      expect(user.getEosjsTransaction(false, transaction).hasOwnProperty('transaction')).toEqual(true)
    })

    it('if the transaction was broadcast and contains a transaction id', () => {
      transaction.transaction_id = 1
      transaction.processed = {
        receipt: {
          status: 'ok'
        }
      }
      expect(user.getEosjsTransaction(true, transaction).hasOwnProperty('transaction')).toEqual(true)
    })

    it('if the transaction was broadcast and contains an error code', () => {
      transaction.code = 400
      transaction.message = 'hello world'
      transaction.error = {
        name: 'my error'
      }
      expect(user.getEosjsTransaction(true, transaction).hasOwnProperty('transaction')).toEqual(true)
    })

    it('if the transaction was broadcast and contains neither a transaction id nor an error code', () => {
      expect(user.getEosjsTransaction(true, transaction).hasOwnProperty('transaction')).toEqual(true)
    })
  })
});

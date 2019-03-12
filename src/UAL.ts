import { Authenticator } from './Authenticator'
import { AuthenticatorResponse, Chain } from './interfaces'

/**
 * This class provides the business logic layer for the UAL.
 */
export class UAL {
  /**
   * @param chains          A list of chains the dapp supports.
   *
   * @param appName         The name of the app using the authenticators
   *
   * @param authenticators  A list of authenticator apps that the dapp supports.
   */
  constructor(
    public chains: Chain[],
    public appName: string,
    private authenticators: Authenticator[],
  ) {}

  /**
   * Returns an object with a list of initialized Authenticators that returned true for shouldRender()
   * as well as an authenticator that supports autoLogin
   */
  public getAuthenticators(): AuthenticatorResponse {
    const availableAuthenticators = this.authenticators.filter((authenticator: Authenticator) => {
      return authenticator.shouldRender()
    }) as Authenticator[]

    availableAuthenticators.forEach((authenticator: Authenticator) => authenticator.init())

    let autoLoginAuthenticator: Authenticator | null = null
    if (availableAuthenticators.length === 1) {
      if (availableAuthenticators[0].shouldAutoLogin()) {
        autoLoginAuthenticator = availableAuthenticators[0]
      }
    }

    return {
      availableAuthenticators,
      autoLoginAuthenticator
    }
  }
}

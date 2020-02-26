// tslint:disable:max-classes-per-file
import { Authenticator } from '../src/Authenticator'
import { ButtonStyle, Chain } from '../src/interfaces'
import { UALError } from '../src/UALError'
import { User } from '../src/User'

class MockAuthenticator extends Authenticator {
  constructor(chains: Chain[]) {
    super(chains)
  }

  public init(): Promise<void> {
    return Promise.resolve()
  }

  public reset(): void {}

  public isErrored(): boolean {
    return false
  }

  public getOnboardingLink(): string {
    return ''
  }

  public getError(): UALError | null {
    return null
  }

  public isLoading(): boolean {
    return true
  }

  public getStyle(): ButtonStyle {
    throw new Error('method not implemented')
  }

  public shouldRender(): boolean {
    return true
  }

  public shouldAutoLogin(): boolean {
    return false
  }

  public shouldRequestAccountName(): Promise<boolean> {
    throw new Error('method not implemented')
  }

  public login(accountName?: string): Promise<User[]> {
    throw new Error(`method not implemented for ${accountName}`)
  }

  public logout(): Promise<void> {
    throw new Error('method not implemented')
  }

  public requiresGetKeyConfirmation(): boolean {
    return false
  }
}

export class MockAuthenticatorToRender extends MockAuthenticator {
  constructor(chains: Chain[]) {
    super(chains)
  }

  public shouldRender(): boolean {
    return true
  }
}

export class MockAuthenticatorToNotRender extends MockAuthenticator {
  constructor(chains: Chain[]) {
    super(chains)
  }

  public shouldRender(): boolean {
    return false
  }
}

export class MockAuthenticatorToAutoLogin extends MockAuthenticator {
  constructor(chains: Chain[]) {
    super(chains)
  }

  public shouldAutoLogin(): boolean {
    return true
  }
}

export class MockAuthenticatorToInvalidate extends MockAuthenticator {
  constructor(chains: Chain[]) {
    super(chains)
  }

  public shouldInvalidateAfter(): number {
    return 0
  }
}

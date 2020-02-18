import { Authenticator } from '../src/Authenticator'
import { UALError } from '../src/UALError'
import { ButtonStyle, Chain } from '../src/interfaces'
import { User } from '../src/User'

export class mockAuthenticatorToRender extends Authenticator {
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

export class mockAuthenticatorToNotRender extends Authenticator {
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
    return false
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

export class mockAuthenticatorToAutoLogin extends Authenticator {
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
    return true
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

export class mockAuthenticatorToInvalidate extends Authenticator {
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

  public shouldInvalidateAfter(): number {
    return 0
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

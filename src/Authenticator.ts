import { ButtonStyle, Chain } from './interfaces'
import { UALError } from './UALError'
import { User } from './User'

/**
 * Represents Button that is rendered for, and interfaces with, a specific Authenticator app.
 */
export abstract class Authenticator {

  /**
   * Default value for shouldInvalidateAfter(), 1 week in seconds
   */
  private defaultInvalidateAfter = 604800

  /**
   * @param chains     This represents each of the chains that the dapp provides support for.
   *
   * @param options    Optional argument that is intended for Authenticator specific options.
   */
  constructor(public chains: Chain[], public options?: any) {}

  /**
   * Attempts to render the Authenticator and updates the authenticator's state, accordingly
   */
  public abstract init(): Promise<void>

  /**
   * Resets the authenticator to its initial, default state then calls init method
   */
  public abstract reset(): void

  /**
   * Returns true if the authenticator has errored while initializing.
   */
  public abstract isErrored(): boolean

  /**
   * Returns a URL where the user can download and install the underlying authenticator
   * if it is not found by the UAL Authenticator.
   */
  public abstract getOnboardingLink(): string

  /**
   * Returns error (if available) if the authenticator has errored while initializing.
   */
  public abstract getError(): UALError | null

  /**
   * Returns true if the authenticator is loading while initializing its internal state.
   */
  public abstract isLoading(): boolean

  /**
   * Returns the style of the Button that will be rendered.
   */
  public abstract getStyle(): ButtonStyle

  /**
   * Returns whether or not the button should render based on the operating environment and other factors.
   * ie. If your Authenticator App does not support mobile, it returns false when running in a mobile browser.
   */
  public abstract shouldRender(): boolean

  /**
   * Returns whether or not the dapp should attempt to auto login with the Authenticator app.
   * Auto login will only occur when there is only one Authenticator that returns shouldRender() true and
   * shouldAutoLogin() true.
   */
  public abstract shouldAutoLogin(): boolean

  /**
   * Returns whether or not the button should show an account name input field.
   * This is for Authenticators that do not have a concept of account names.
   */
  public abstract shouldRequestAccountName(): Promise<boolean>

  /**
   * Returns the amount of seconds after the authentication will be invalid for logging in on new
   * browser sessions.  Setting this value to zero will cause users to re-attempt authentication on
   * every new browser session.  Please note that the invalidate time will be saved client-side and
   * should not be relied on for security.
   */
  public shouldInvalidateAfter(): number {
    return this.defaultInvalidateAfter
  }

  /**
   * Login using the Authenticator App. This can return one or more users depending on multiple chain support.
   *
   * @param accountName  The account name of the user for Authenticators that do not store accounts (optional)
   */
  public abstract login(accountName?: string): Promise<User[]>

  /**
   * Logs the user out of the dapp. This will be strongly dependent on each Authenticator app's patterns.
   */
  public abstract logout(): Promise<void>

  /**
   * Returns true if user confirmation is required for `getKeys`
   */
  public abstract requiresGetKeyConfirmation(): boolean
}

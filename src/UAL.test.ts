import {
  MockAuthenticatorToAutoLogin,
  MockAuthenticatorToInvalidate,
  MockAuthenticatorToNotRender,
  MockAuthenticatorToRender
} from '../__mocks__/authenticatorMocks'
import { Authenticator } from './Authenticator'
import { AuthenticatorResponse, Chain } from './interfaces'
import { UAL } from './UAL'

const mockChain: Chain = {
  chainId: '1234',
  rpcEndpoints: [{
    protocol: 'string',
    host: '',
    port: 123,
    path: ''
  }]
}

describe('UAL', () => {
  let ual: UAL
  let authenticators: Authenticator[]
  let renderMe: Authenticator
  let dontRenderMe: Authenticator
  let autoLoginMe: Authenticator
  let invalidateMe: Authenticator

  beforeAll(() => {
    renderMe = new MockAuthenticatorToRender([mockChain])
    dontRenderMe = new MockAuthenticatorToNotRender([mockChain])
    autoLoginMe = new MockAuthenticatorToAutoLogin([mockChain])
    invalidateMe = new MockAuthenticatorToInvalidate([mockChain])
    authenticators = [
      renderMe,
      dontRenderMe,
      autoLoginMe,
      invalidateMe
    ]
    ual = new UAL([mockChain], 'My App', authenticators)
  })

  describe('has a getAuthenticators method', () => {
    let response: any
    beforeAll(() => {
      renderMe.init = jest.fn()
      dontRenderMe.init = jest.fn()
      autoLoginMe.init = jest.fn()
      invalidateMe.init = jest.fn()
    })
    beforeEach(() => {
      response = ual.getAuthenticators()
    })

    it('that returns an AuthenticatorResponse object', () => {
      let trueResponse: AuthenticatorResponse = {
        availableAuthenticators: [],
        autoLoginAuthenticator: null
      }
      expect(response.hasOwnProperty('availableAuthenticators')).toEqual(true)
      expect(response.hasOwnProperty('autoLoginAuthenticator')).toEqual(true)
      expect(Object.keys(response).join('') === Object.keys(trueResponse).join('')).toEqual(true)
    })

    it('that filters in authenticators that should be rendered', () => {
      expect(response.availableAuthenticators.indexOf(renderMe)).not.toEqual(-1)
      expect(response.availableAuthenticators.indexOf(autoLoginMe)).not.toEqual(-1)
      expect(response.availableAuthenticators.indexOf(invalidateMe)).not.toEqual(-1)
    })

    it('that filters out authenticators that cannot be rendered', () => {
      expect(response.availableAuthenticators.indexOf(dontRenderMe)).toEqual(-1)
    })

    it('that calls init on all available authenticators', () => {
      expect(renderMe.init).toHaveBeenCalled()
      expect(autoLoginMe.init).toHaveBeenCalled()
      expect(invalidateMe.init).toHaveBeenCalled()
    })

    it('that does not call init on unavailable authenticators', () => {
      expect(dontRenderMe.init).not.toHaveBeenCalled()
    })

    it('that returns an auto-login authenticator if it is the only one available', () => {
      expect(response.autoLoginAuthenticator).toEqual(null)
    })

    it('that returns an invalidate after authenticator with correct setting', () => {
      expect(invalidateMe.shouldInvalidateAfter()).toEqual(0)
    })

    it('that returns an authenticator without shouldInvalidateAfter to have default setting', () => {
      expect(autoLoginMe.shouldInvalidateAfter()).toEqual(604800)
    })

    it('that does not return an auto-login authenticator if other authenticators are available', () => {
      ual = new UAL([mockChain], 'My App', [dontRenderMe, autoLoginMe])
      response = ual.getAuthenticators()
      expect(response.autoLoginAuthenticator).toEqual(autoLoginMe)
    })

    it('can return name when calling getName', () => {
      let expectedName = 'authenticator'
      authenticators.forEach(authenticator => {
        expect(authenticator.getName()).toEqual(expectedName)
      })
    })
  })
})

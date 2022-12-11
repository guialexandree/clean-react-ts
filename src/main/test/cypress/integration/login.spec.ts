import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.datatype.string(6))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo Obrigatório')
    FormHelper.testInputStatus('password', 'Campo Obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present erro if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.datatype.string(4))
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').type(faker.datatype.string(6))
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredendialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on any others erros', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    FormHelper.testMainError('Algo de errado aconteceu, Tente novamente em breve.')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError invalid data is retuned', () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    FormHelper.testUrl('/login')
  })

  it('Should present save accessToken is valid credentials are provided', () => {
    Http.mockOk()
    cy.clearLocalStorage()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password()).type('{enter}')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should present multiples submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
    FormHelper.testHttpCallsCount(0)
  })
})

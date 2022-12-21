import faker from 'faker'
import * as Helpers from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    })
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu, Tente novamente em breve.')
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helpers.testUrl('/login')
  })
})

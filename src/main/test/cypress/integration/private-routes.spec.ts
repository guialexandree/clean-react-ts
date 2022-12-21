import * as Helpers from '../support/helpers'

describe('Private Routes', () => {
  it('Should logout if survey-list has now token', () => {
    cy.visit('')
    Helpers.testUrl('/login')
  })
})

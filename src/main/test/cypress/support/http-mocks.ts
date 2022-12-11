import faker from 'faker'

export const mockInvalidCredendialsError = (url: string): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockEmailInUseError = (url: string): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 403,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: string, method: string): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: faker.random.arrayElement<number>([400, 403, 404]),
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (url: string, method: string, response: any): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 200,
    response
  }).as('request')
}

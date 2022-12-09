import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present erro if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.datatype.string(4))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on any others erros', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: faker.random.arrayElement<number>([400, 403, 404]),
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu, Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError invalid data is retuned', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: 200,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu, Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present save accessToken is valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    })
    cy.clearLocalStorage()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password()).type('{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    // cy.window().then(window => window.localStorage.getItem('accessToken'))
  })

  it('Should present multiples submits', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /signin/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})

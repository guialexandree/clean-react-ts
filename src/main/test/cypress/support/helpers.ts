const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  // cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object): void => {
  // cy.window().then(window => assert.isOk(window.localStorage.setItem(JSON.stringify(value))))
}

export const getLocalStorageItem = (key: string): any => {
  // cy.window().then(window => return JSON.parse(window.localStorage.getItem(key))))
}

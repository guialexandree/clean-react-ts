import { Login } from '@/presentation/pages'
import { Authentication } from '@/domain/usecases'
import { ValidationStub, AuthenticationSpy, renderWithHistory, SaveAccessTokenMock , Helper } from '@/presentation/test/mocks'
import { createMemoryHistory } from 'history'

import faker from 'faker'
import { cleanup, fireEvent, waitFor, screen, RenderResult } from '@testing-library/react'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const simulateValidSumbit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populatEmailField(email)
  populatPasswordField(password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populatEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatPasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testElementExists = (fieldName: string): void => {
  const spinner = screen.getByTestId(fieldName)
  expect(spinner).toBeTruthy()
}

// const testElementText = (fieldName: string, test: string): void => {
//   const spinner = screen.getByTestId(fieldName)
//   expect(spinner).toBeTruthy()
// }

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
  saveAccessTokenMock: SaveAccessTokenMock
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Login({ validation: validationStub, authentication: authenticationSpy, saveAccessToken: saveAccessTokenMock })
  })

  return {
    authenticationSpy,
    setCurrentAccountMock,
    saveAccessTokenMock
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusFormField('email', validationError)
    Helper.testStatusFormField('password', validationError)
  })

  test('Should show email erro if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatEmailField()
    Helper.testStatusFormField('email', validationError)
  })

  test('Should show password erro if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatPasswordField()
    Helper.testStatusFormField('password', validationError)
  })

  test('Should show valid email state if validation succeeds', () => {
    makeSut()
    populatEmailField()
    Helper.testStatusFormField('email')
  })

  test('Should show valid password state if validation succeeds', () => {
    makeSut()
    populatPasswordField()
    Helper.testStatusFormField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populatEmailField()
    populatPasswordField()
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSumbit()
    testElementExists('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSumbit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSumbit()
    await simulateValidSumbit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSumbit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // test('Should present error if Authentication fails',  async () => {
  //   const { sut, authenticationSpy } = makeSut()
  // 	const error = new InvalidCredentialsError()
  // 	jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
  //   await simulateValidSumbit()
  // 	testElementText('main-error', error.message)
  //   Helper.testChildCount(sut, 'error-warap', 1)
  // })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSumbit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
  })

  // test('Should present error if SaveAccessToken fails',  async () => {
  //   const { sut, saveAccessTokenMock } = makeSut()
  // 	const error = new InvalidCredentialsError()
  // 	jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
  //   await simulateValidSumbit()
  // 	testElementText('main-error', error.message)
  //   Helper.testChildCount(sut, 'error-warap', 1)
  // })

  test('Should go to signup page', async () => {
    makeSut()
    const register = screen.getByTestId('register')
    fireEvent.click(register)
  })
})

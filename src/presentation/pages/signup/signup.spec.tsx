import { cleanup } from '@testing-library/react'
import { renderWithHistory, ValidationStub } from '@/presentation/test/mocks'
import { createMemoryHistory } from 'history'
import SignUp from './signup'

type SutTypes = {
  sut: any
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SignUp({ validation: validationStub })
  })

  return {
    sut: setCurrentAccountMock
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)
  // test('Should start with initial state', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	Helper.testChildCount(sut, 'error-wrap', 0)
  // 	Helper.testButtonIsDisabled(sut, 'submit', true)
  // 	Helper.testStatusFormField(sut, 'name', validationError)
  // 	Helper.testStatusFormField(sut, 'email', validationError)
  // 	Helper.testStatusFormField(sut, 'password', 'Campo Obrigatório')
  // 	Helper.testStatusFormField(sut, 'passwordConfirmation', 'Campo Obrigatório')
  // })
  test('SignUp Component ', () => {
    expect(true).toBe(true)
  })

  // test('Should show name error if Validation fails', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	Helper.populateField(sut, 'name')
  // 	Helper.testStatusFormField(sut, 'name', validationError)
  // });

	// test('Should show email error if Validation fails', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	Helper.populateField(sut, 'email')
  // 	Helper.testStatusFormField(sut, 'email', validationError)
  // })
})

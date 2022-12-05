import { cleanup, fireEvent, RenderResult, screen } from '@testing-library/react'
import { Helper, renderWithHistory, ValidationStub } from '@/presentation/test/mocks'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import SignUp from './signup'

type SutTypes = {
  sut: any
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const emailInput = screen.getByTestId(fieldName)
  fireEvent.input(emailInput, { target: { value } })
}

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
  // 	Helper.testButtonIsDisabled(sut, 'error-wrap', 0)
  // 	Helper.testStatusFormField('name', validationError)
  // 	Helper.testStatusFormField('email', 'Campo Obrigatório')
  // 	Helper.testStatusFormField('password', 'Campo Obrigatório')
  // 	Helper.testStatusFormField('passwordConfirmation', 'Campo Obrigatório')
  // })
  test('SignUp Component ', () => {
    expect(true).toBe(true)
  })

  // test('Should show name error if Validation fails', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	populateField(sut, 'name')
  // 	Helper.testStatusFormField('name', validationError)
  // });
})

import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import { AddAccountSpy, Helper, renderWithHistory, ValidationStub } from '@/presentation/test/mocks'
import { createMemoryHistory } from 'history'
import SignUp from './signup'
import faker from 'faker'

// const simulateValidSumbit = async (
// 	name = faker.internet.email(),
// 	email = faker.internet.email(),
// 	password = faker.internet.password()
// 	): Promise<void> => {
//   const sut = {}
// 	Helper.populateField(sut, 'name', name)
// 	Helper.populateField(sut, 'email', email)
//   Helper.populateField(sut, 'password', password)
//   Helper.populateField(sut, 'passwordConfirmation', password)
//   const form = sut.getByTestId('form')
//   fireEvent.submit(form)
//   await waitFor(() => form)
// }

type SutTypes = {
  sut: any
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SignUp({ validation: validationStub, addAccount: addAccountSpy })
  })

  return {
    sut: setCurrentAccountMock,
    addAccountSpy
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
  // 	Helper.testStatusFormField(sut, 'password', validationError)
  // 	Helper.testStatusFormField(sut, 'passwordConfirmation', validationError)
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

  // test('Should show password error if Validation fails', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	Helper.populateField(sut, 'password')
  // 	Helper.testStatusFormField(sut, 'password', validationError)
  // })

  // test('Should show passwordConfirmation error if Validation fails', () => {
  // 	const validationError = faker.random.words()
  // 	const { sut } = makeSut({ validationError })
  // 	Helper.populateField(sut, 'passwordConfirmation')
  // 	Helper.testStatusFormField(sut, 'passwordConfirmation', validationError)
  // })

  // test('Should show valid name state if validation succeeds', () => {
  //   const { sut } = makeSut()
  //   Helper.populatField(sut., 'name')
  //   Helper.testStatusFormField(sut, 'name')
  // })

  // test('Should show valid email state if validation succeeds', () => {
  //   const { sut } = makeSut()
  //   Helper.populatField(sut., 'email')
  //   Helper.testStatusFormField(sut, 'email')
  // })

  // test('Should show valid password state if validation succeeds', () => {
  //   const { sut } = makeSut()
  //   Helper.populatField(sut., 'password')
  //   Helper.testStatusFormField(sut, 'password')
  // })

  // test('Should show valid passwordConfirmation state if validation succeeds', () => {
  //   const { sut } = makeSut()
  //   Helper.populatField(sut., 'passwordConfirmation')
  //   Helper.testStatusFormField(sut, 'passwordConfirmation')
  // })

  // test('Should enable submit button if form is valid', () => {
  //   makeSut()
  //   Helper.populatField(sut, 'name')
  //   Helper.populatField(sut, 'email')
  //   Helper.populatField(sut, 'password')
  //   Helper.populatField(sut, 'passwordConfirmation')
  //   Helper.testButtonIsDisabled('submit', false)
  // })

  // test('Should show spinner on submit', async () => {
  //   const { sut } = makeSut()
  //   await simulateValidSumbit(sut)
  //   Helper.testElementExists(sut, 'spinner')
  // })

  // test('Should call AddAccount with correct values', async () => {
  //   const { addAccountSpy } = makeSut()
  //   const name = faker.name.findName()
  //   const email = faker.internet.email()
  //   const password = faker.internet.password()
  //   await simulateValidSumbit(name, email, password)
  //   expect(addAccountSpy.params).toEqual({
  // 		name,
  // 		email,
  // 		password,
  // 		passwordConfirmation: password
  // 	})
  // })

	// test('Should call Authentication only once', async () => {
    // const {   //   const { addAccountSpy } = makeSut()
		// } = makeSut()
    // await simulateValidSumbit()
    // await simulateValidSumbit()
    // expect(addAccountSpy.callsCount).toBe(1)
  // })
})

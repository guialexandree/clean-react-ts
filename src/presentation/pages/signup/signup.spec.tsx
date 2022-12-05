import { RenderResult, screen } from '@testing-library/react'

type SutParams = {
  sut: RenderResult
}

// const makeSut = (params?: SutParams): SutTypes => {
//   const sut = new ValidationStub()
//   validationStub.errorMessage = params?.validationError
//   const authenticationSpy = new AuthenticationSpy()
//   const saveAccessTokenMock = new SaveAccessTokenMock()
//   const { setCurrentAccountMock } = renderWithHistory({
//     history,
//     Page: () => Login({ validation: validationStub, authentication: authenticationSpy, saveAccessToken: saveAccessTokenMock })
//   })

//   return {
//     authenticationSpy,
//     setCurrentAccountMock,
//     saveAccessTokenMock
//   }
// }

const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = screen.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

const testStatusFormField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Ok')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId<HTMLButtonElement>(fieldName)
  expect(button.disabled).toBe(isDisabled)
}

describe('SignUp Component', () => {
  // test('Should start with initial state', () => {
	// 	const sut = null
	// 	const validationError = 'Campo Obrigatório'
	// 	testChildCount(sut, 'error-wrap', 0)
	// 	testButtonIsDisabled('submit', true)
	// 	testStatusFormField('email', validationError)
	// 	testStatusFormField('password', validationError)
  // })
	test('SignUp Component ', () => {
		expect(true).toBe(true)
	});
})

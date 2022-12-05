import { RenderResult, screen } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = screen.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

export const testStatusFormField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Ok')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId<HTMLButtonElement>(fieldName)
  expect(button.disabled).toBe(isDisabled)
}

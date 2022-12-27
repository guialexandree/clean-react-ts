import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test/mocks'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  render(
		<ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
			<SurveyResult loadSurveyResult={loadSurveyResultSpy} />
		</ApiContext.Provider>
  )

  return { loadSurveyResultSpy }
}

describe('SuveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
		const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-12-10T00:00:00')
    })
		loadSurveyResultSpy.surveyResult = surveyResult
    makeSut(loadSurveyResultSpy)

    expect(await screen.findByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percent = screen.queryAllByTestId('percent')
    expect(percent[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percent[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })

	// test('Should render error on UnexpectedError', async () => {
  //   const loadSurveyListSpy = new LoadSurveyResultSpy()
  //   const error = new UnexpectedError()
  //   jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(error)
  //   makeSut(loadSurveyListSpy)
  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   expect(screen.queryByTestId('question')).not.toBeInTheDocument()
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })
})

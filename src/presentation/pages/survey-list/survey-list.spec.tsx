import { LoadSurveyList } from '@/domain/usecases'
import SurveyList from './survey-list'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test/mocks'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0
	surveys = mockSurveyListModel()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty item on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
		await waitFor(() => surveyList)
	})

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
		await waitFor(() => screen.getByRole('heading'))
  })

	test('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
		expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
	})
})

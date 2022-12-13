import { LoadSurveyList } from '@/domain/usecases'
import SurveyList from './survey-list'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
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
  test('Should present 4 empty item on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})

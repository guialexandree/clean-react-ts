import React from 'react'
import { mockSurveyModel } from '@/domain/test/mocks'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import { IconName } from '@/presentation/components'

const makeSut = (surveyModel = mockSurveyModel()): void => {
  render(<SurveyItem survey={surveyModel} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-12-10T00:00:00')
    })
    makeSut(survey)

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2020-11-03T00:00:00')
    })
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('nov')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})

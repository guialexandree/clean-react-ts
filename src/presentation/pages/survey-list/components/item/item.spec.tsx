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
      didAnswer: true
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
   })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    })
})

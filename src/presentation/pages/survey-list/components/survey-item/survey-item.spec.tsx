import React from 'react'
import { mockSurveyModel } from '@/domain/test/mocks'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import { IconName } from '@/presentation/components'

describe('SurveyItem Component', () => {
	test('Should render with correct values', () => {
		const survey = 	mockSurveyModel()
		survey.didAnswer = true
		survey.date = new Date('2022-12-10T00:00:00')
		render(<SurveyItem survey={survey} />)	
		expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
		expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
		expect(screen.getByTestId('day')).toHaveTextContent('10')
		expect(screen.getByTestId('month')).toHaveTextContent('dez')
		expect(screen.getByTestId('year')).toHaveTextContent('2022')
	})
})

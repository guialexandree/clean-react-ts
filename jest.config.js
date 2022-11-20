module.exports = {
	roots: ['<rootDir>/src'],
  collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx}',
		'!<rootDir>/src/main/**'
	],
  coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
	moduleNameMapper: {
		'@/tests/(.*)': '<rootDir>/tests/$1',
		'@/(.*)': '<rootDir>/src/$1'
	}
}

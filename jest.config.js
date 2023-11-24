/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require( 'next/jest' );

const createJestConfig = nextJest( {
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testPathIgnorePatterns: ['/__fixtures__/', '/__utils__/'],
  transformIgnorePatterns: ['wavesurfer.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/state/(.*)$': '<rootDir>/src/state/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/fonts/(.*)$': '<rootDir>/src/fonts/$1',
    '^@/theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^wavesurfer.js/dist/plugins/(.*)$':
      '<rootDir>/node_modules/wavesurfer.js/dist/plugins/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

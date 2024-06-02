export default {
    preset: '@open-wc/testing',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  
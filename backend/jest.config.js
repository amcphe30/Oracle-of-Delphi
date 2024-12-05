// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',  // Transform .mjs files with Babel (or adjust if using other transformer)
  },
  extensionsToTreatAsEsm: ['.ts'], // Add .mjs here
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json', 'node'],
};

import type {Config} from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testMatch: [
    '<rootDir>/**/*.test.ts',
  ],
  transform: {
    '^.+\.(ts|tsx|js)$': 'ts-jest',
  },
}
export default config
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

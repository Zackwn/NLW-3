module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    bail: true,
    clearMocks: true,
    collectCoverageFrom: ["src/**", "!src/database/migrations/**"],
    coverageDirectory: '__tests__/coverage',
}
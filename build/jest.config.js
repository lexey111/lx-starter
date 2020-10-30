module.exports = {
	rootDir: '../',
	verbose: true,
	bail: false,
	roots: ['<rootDir>/src/app/'],
	setupFiles: [
		'<rootDir>/build/test-setup.ts',
		'<rootDir>/build/test-shim.ts',
		'<rootDir>/build/mocks-global.ts',
	],
	modulePathIgnorePatterns: [
		'build',
		'dist',
		'node_modules'
	],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.(css|less)$': './build/mock-styles.ts',
	},
	transformIgnorePatterns: [
		'node_modules', 'dist'
	],
	testRegex: '(/__tests__/.*|(\-|/)(test))\\.(t|j)sx?$',
	snapshotSerializers: ['enzyme-to-json'],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node',
	],
	coverageProvider: 'v8',
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/dist/',
		'mock.ts',
	],
	coverageReporters: [/*'cobertura',*/ 'text'],
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/build/test-setup.ts'],
	globals: {
		'ts-jest': {
			'tsconfig': './tsconfig.json',
		},
		diagnostics: {
			pathRegex: '(/__tests__/.*|(\-|/)(test))\\.(t|j)sx?$',
		},
	},
};

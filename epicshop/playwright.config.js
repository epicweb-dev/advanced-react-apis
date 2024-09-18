import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.PORT || '5639'

export default defineConfig({
	reporter: 'html',
	use: {
		baseURL: `http://localhost:${PORT}/`,
		trace: 'retain-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	webServer: {
		command: 'cd .. && npm start',
		port: Number(PORT),
		reuseExistingServer: !process.env.CI,
		stdout: 'pipe',
		stderr: 'pipe',
		env: { PORT },
	},
})

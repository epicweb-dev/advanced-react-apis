import { expect, test } from '@playwright/test'

test('scanner POSTs to unknown catch-all routes return a normal 404', async ({
	request,
}) => {
	const response = await request.post('/_middleware', {
		data: '',
	})

	expect(response.status()).toBe(404)
})

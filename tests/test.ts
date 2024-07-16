import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Bienvenue' })).toBeVisible();
});

test('expect to have the copyrigth text', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Copyright Teams Handi 2024 -')).toBeVisible();
});

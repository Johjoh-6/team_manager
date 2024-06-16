import { describe, it, expect } from 'vitest';
import dateFormatFr from './dateFormatFr';

describe('dateFormatFr', () => {
	it('should format the date string in French format', () => {
		const dateString = '2022-12-31';
		const formattedDate = dateFormatFr(dateString);
		expect(formattedDate).toBe('31/12/2022');
	});

	it('should handle invalid date strings', () => {
		const dateString = '2022-13-31';
		const formattedDate = dateFormatFr(dateString);
		expect(formattedDate).toBe('Invalid Date');
	});

	it('should handle empty date strings', () => {
		const dateString = '';
		const formattedDate = dateFormatFr(dateString);
		expect(formattedDate).toBe('Invalid Date');
	});
	it('should format the date string with time in French format', () => {
		const dateString = '2024-06-29 12:00:00.000Z';
		const formattedDate = dateFormatFr(dateString);
		expect(formattedDate).toBe('29/06/2024');
	});
	it('should handle invalid date strings with time', () => {
		const dateString = '2022-13-27 12:00:00.000Z';
		const formattedDate = dateFormatFr(dateString);
		expect(formattedDate).toBe('Invalid Date');
	});
});

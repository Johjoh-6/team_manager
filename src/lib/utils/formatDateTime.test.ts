import { describe, it, expect } from 'vitest';
import formatDateTime from './formatDateTime';

describe('formatDateTime', () => {
    it('should format a date and time string correctly', () => {
        const date = "2022-01-01T12:34:56";
        const formattedDateTime = formatDateTime(date);
        expect(formattedDateTime).toBe('2022-01-01T11:34');
    });

    it('should format a date and time string correctly', () => {
        const date = "2022-01-01T00:00:00";
        const formattedDateTime = formatDateTime(date);
        expect(formattedDateTime).toBe('2021-12-31T23:00');
    });
});
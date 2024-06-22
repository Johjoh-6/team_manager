import { describe, it, expect } from 'vitest';
import stripString from './stripString';

describe('stripString', () => {
    it('should return an empty string when the input string is empty', () => {
        const result = stripString('', 5);
        expect(result).toBe('');
    });

    it('should return the input string when the length is greater than or equal to the string length', () => {
        const result = stripString('Hello', 10);
        expect(result).toBe('Hello');
    });

    it('should return a striped string when the length is less than the string length', () => {
        const result = stripString('Hello World', 5);
        expect(result).toBe('Hello...');
    });

    it('should return a striped string with the specified length', () => {
        const result = stripString('Hello World', 8);
        expect(result).toBe('Hello Wo...');
    });

    it('should return a striped string with the specified length and custom stripe character', () => {
        const result = stripString('Hello World', 8, '*');
        expect(result).toBe('Hello Wo*');
    });

    it('should return a striped string with the specified length and custom stripe character', () => {
        const result = stripString('Hello World', 8, '...');
        expect(result).toBe('Hello W...');
    });
});
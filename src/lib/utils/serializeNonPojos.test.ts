import { describe, it, expect } from 'vitest';
import { serializeNonPOJOs } from './serializeNonPojos';

describe('serializeNonPOJOs', () => {
	it('should return a serialized object', () => {
		const obj = { name: 'John', age: 30 };
		const serializedObj = serializeNonPOJOs(obj);
		expect(serializedObj).toEqual(obj);
	});

	it('should return a serialized array', () => {
		const arr = [1, 2, 3, 4, 5];
		const serializedArr = serializeNonPOJOs(arr);
		expect(serializedArr).toEqual(arr);
	});

	it('should return a serialized nested object', () => {
		const obj = { name: 'John', age: 30, address: { city: 'New York', country: 'USA' } };
		const serializedObj = serializeNonPOJOs(obj);
		expect(serializedObj).toEqual(obj);
	});

	it('should return a serialized null value', () => {
		const value = null;
		const serializedValue = serializeNonPOJOs(value);
		expect(serializedValue).toEqual(value);
	});

	it('should return a serialized undefined value', () => {
		const value = undefined;
		const serializedValue = serializeNonPOJOs(value);
		expect(serializedValue).toEqual(value);
	});
});

import { describe, it, expect } from 'vitest';
import isRole from '$lib/utils/isRole';

describe('isRole', () => {
	const roles = [
		{ id: 1, name: 'admin' },
		{ id: 2, name: 'user' },
		{ id: 3, name: 'guest' }
	];

	it('should return true if the role exists in the list', () => {
		const roleTarget = 'admin';
		const result = isRole(roleTarget, roles);
		expect(result).toBe(true);
	});

	it('should return false if the role does not exist in the list', () => {
		const roleTarget = 'manager';
		const result = isRole(roleTarget, roles);
		expect(result).toBe(false);
	});

	it('should return false if the list of roles is empty', () => {
		const roleTarget = 'admin';
		const result = isRole(roleTarget, []);
		expect(result).toBe(false);
	});
});

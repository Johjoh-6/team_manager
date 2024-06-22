import { describe, it, expect } from 'vitest';
import { getImageURL } from './getImageUrl';
import { env } from '$env/dynamic/public';

describe('getImageURL', () => {
	it('should return the correct image URL', () => {
		const collectionId = 'collection123';
		const recordId = 'record456';
		const fileName = 'image.jpg';
		const size = '200x200';

		const expectedURL = `${env.PUBLIC_API_URL}api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;

		const result = getImageURL(collectionId, recordId, fileName, size);

		expect(result).toBe(expectedURL);
	});

	it('should return the default image URL when size is not provided', () => {
		const collectionId = 'collection123';
		const recordId = 'record456';
		const fileName = 'image.jpg';

		const expectedURL = `${env.PUBLIC_API_URL}api/files/${collectionId}/${recordId}/${fileName}?thumb=0x0`;

		const result = getImageURL(collectionId, recordId, fileName);

		expect(result).toBe(expectedURL);
	});
});

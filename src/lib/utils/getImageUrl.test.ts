import { describe, it, expect } from 'vitest';
import { getImageURL } from './getImageUrl';

describe('getImageURL', () => {
	it('should return the correct image URL', () => {
		const collectionId = 'collection123';
		const recordId = 'record456';
		const fileName = 'image.jpg';
		const size = '200x200';

		const expectedURL = `${process.env.PUBLIC_IMAGE_URL}/${collectionId}/${recordId}/${fileName}?size=${size}`;

		const result = getImageURL(collectionId, recordId, fileName, size);

		expect(result).toBe(expectedURL);
	});

	it('should return the default image URL when size is not provided', () => {
		const collectionId = 'collection123';
		const recordId = 'record456';
		const fileName = 'image.jpg';

		const expectedURL = `${process.env.PUBLIC_IMAGE_URL}/${collectionId}/${recordId}/${fileName}?size=0x0`;

		const result = getImageURL(collectionId, recordId, fileName);

		expect(result).toBe(expectedURL);
	});
});

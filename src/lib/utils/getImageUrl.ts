import { env } from '$env/dynamic/public';

export const getImageURL = (
	collectionId: string,
	recordId: string,
	fileName: string,
	size = '0x0'
) => {
	const baseUrl = env.PUBLIC_API_URL;
	return `${baseUrl}api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

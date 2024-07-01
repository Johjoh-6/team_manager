const stripString = (str: string, length: number, endStr = '...') => {
	return str.length > length ? `${str.substring(0, length)}${endStr}` : str;
};

export default stripString;

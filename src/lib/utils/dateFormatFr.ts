const dateFormatFr = (dateString: string): string => {
	const date = new Date(dateString);

	if (Number.isNaN(date.getDate())) {
		return 'Invalid Date';
	}
	if (Number.isNaN(date.getMonth())) {
		return 'Invalid Month';
	}
	if (Number.isNaN(date.getFullYear())) {
		return 'Invalid Year';
	}
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString();

	return `${day}/${month}/${year}`;
};

export default dateFormatFr;

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

export default formatDateTime;
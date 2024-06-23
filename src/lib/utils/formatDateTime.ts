const formatDateTime = (dateString: string, withTime = true) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getDate())) {
      return "Invalid Date";
    }
    // for date only
    if(!withTime) {
      return date.toISOString().slice(0, 10);
    }
    return date.toISOString().slice(0, 16);
  };

export default formatDateTime;
const numberWithCommas = (x) => {
  if (!x) return null;
  const amount = parseFloat(x).toFixed(2);
  return "₦" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).setHours(0, 0, 0, 0);
};

export { numberWithCommas, formatDate };

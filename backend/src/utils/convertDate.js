const convertDateToString = () => {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const day = new Date().getDate().toString();
  return new Date(year, month, day);
};

module.exports = convertDateToString;
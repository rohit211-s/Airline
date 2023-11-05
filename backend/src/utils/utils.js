const filterResponse = (data, pageNum, pageLimit) => {
  return data.filter((row, idx) => {
    return idx >= pageNum * pageLimit && idx < (pageNum + 1) * pageLimit;
  });
};
module.exports = { filterResponse };

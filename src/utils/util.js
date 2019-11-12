const formatWan = function (n) {
  var wan = n + 0;
  if (wan < 10000) {
    return wan;
  } else {
    return ((wan / 10000).toFixed(1)) + "万";
  }
};


module.exports = {
  formatWan: formatWan
};

// Global helpers go here
helpers = {
  coinFlip: () => {
    return (Math.floor(Math.random() * 2) == 0);
  },
  uniqueArray: (array) => {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  millisecondsToHMSMS: (ms) => {
    return moment.utc(ms).format("HH:mm:ss.SSS");
  },
  json: (jsonObject) => {
    return JSON.stringify(jsonObject);
  },
  formatNumber: (number) => {
    return number.toLocaleString('en');
  },
  sortNumber: (a, b) => {
    return a - b;
  },
}

export default helpers;

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
  toggleInArray(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }

    return array;
  }
}

export default helpers;

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
}

export default helpers;

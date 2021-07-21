class Chronometer {
  constructor(timeLimit) {
    this.currentTime = timeLimit;
    this.intervalId = null;
  }

  start(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime--;
      if (callback) {
        callback();
      }
    }, 1000);
  }

  getSeconds() {
    return this.currentTime % 60;
  }

  computeTwoDigitNumber(value) {
    let valueString = value.toString();

    if (valueString.length === 1) {
      return "0" + valueString;
    } else {
      return valueString;
    }
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.currentTime = 0;
  }

  split() {
    return `${this.computeTwoDigitNumber(this.getSeconds())}`;
  }
}

export default Chronometer;

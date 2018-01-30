var Timer = (function () {
  /**
   * @constructor
   * 
   * @param {HTMLElement} timerElement 
   * @param {HTMLElement} recordParentElement 
   */
  function Timer(timerElement, recordParentElement) {
    if (!timerElement instanceof HTMLElement) throw 'timerElement is not a dom object';
    if (!recordParentElement instanceof HTMLElement) throw 'recordParentElement is not a dom object';
    this._timerElement = timerElement;
    this._recordElement = recordParentElement;
  }

  /**
   * @returns {void}
   */
  Timer.prototype.start = function () {
    var self = this;
    this.time = Number.parseFloat(this._timerElement.innerText) || 0.00;
    this._timerId = setInterval(function () {
      self.time += 0.01;
      self._timerElement.innerText = self.time.toFixed(2);
    }, 10)
  }

  /**
   * @returns {boolean}
   */
  Timer.prototype.hasStarted = function () {
    return this._timerId !== undefined && this._timerId !== null;
  }

  /**
   * @returns {void}
   */
  Timer.prototype.stop = function () {
    if (this.hasStarted()) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  /**
   * @returns {void}
   */
  Timer.prototype.reset = function () {
    this.time = 0.00;
    this._timerElement.innerText = 0.00;
  }

  Timer.prototype.record = function () {
    var item = document.createElement('li');
    item.innerText = this.time.toFixed(2);

    this._recordElement.appendChild(item)
  }

  return Timer;
})();

(function () {
  var timerElement = document.getElementById('timer');
  var recordListElement = document.getElementById('record');

  var buttonStartStop = document.getElementById('start-stop');
  var buttonReset = document.getElementById('reset-button');
  var buttonRecord = document.getElementById('record-button');

  var timer = new Timer(timerElement, recordListElement);

  buttonStartStop.addEventListener('click', function () {
    if (timer.hasStarted()) {
      timer.stop();
    } else {
      timer.start();
    }
  });

  buttonReset.addEventListener('click', function () {
    timer.reset();
  });

  buttonRecord.addEventListener('click', function () {
    timer.record();
  });

})();
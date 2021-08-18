/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const EventEmitter = require('events').EventEmitter;
const HuaweiDecoder = require('./huaweidecoder.js');
const UdpListener = require('./udplistener.js');
const TestListener = require('./testlistener.js');


/**
 * BarnowlHuawei Class
 * Converts Huawei AP radio decodings into standard raddec events.
 * @param {Object} options The options as a JSON object.
 */
class BarnowlHuawei extends EventEmitter {

  /**
   * BarnowlHuawei constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    super();
    options = options || {};
    options.barnowl = this;

    this.listeners = [];
    this.huaweiDecoder = new HuaweiDecoder({ barnowl: this });
  }

  /**
   * Add a listener to the given hardware interface.
   * @param {Class} ListenerClass The (uninstantiated) listener class.
   * @param {Object} options The options as a JSON object.
   */
  addListener(ListenerClass, options) {
    options = options || {};
    options.decoder = this.huaweiDecoder;

    let listener = new ListenerClass(options);
    this.listeners.push(listener);
  }

  /**
   * Handle and emit the given raddec.
   * @param {Raddec} raddec The given Raddec instance.
   */
  handleRaddec(raddec) {
    // TODO: observe options to normalise raddec
    this.emit("raddec", raddec);
  }

  /**
   * Handle and emit the given infrastructure message.
   * @param {Object} message The given infrastructure message.
   */
  handleInfrastructureMessage(message) {
    this.emit("infrastructureMessage", message);
  }
}


module.exports = BarnowlHuawei;
module.exports.UdpListener = UdpListener;
module.exports.TestListener = TestListener;

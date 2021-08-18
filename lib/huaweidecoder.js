/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const binaryPacketDecoder = require('./binarypacketdecoder');


/**
 * HuaweiDecoder Class
 * Decodes data streams from one or more Huawei access points and forwards the
 * packets to the given BarnowlHuawei instance.
 */
class HuaweiDecoder {

  /**
   * HuaweiDecoder constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.barnowl = options.barnowl;
  }

  /**
   * Handle data from a given device, specified by the origin
   * @param {Buffer} data The data as a buffer.
   * @param {String} origin The unique origin identifier of the device.
   * @param {Number} time The time of the data capture.
   * @param {Object} decodingOptions The packet decoding options.
   */
  handleData(data, origin, time, decodingOptions) {
    let self = this;

    let raddecs = binaryPacketDecoder.decode(data, origin, time,
                                             decodingOptions);
    raddecs.forEach(function(raddec) {
      self.barnowl.handleRaddec(raddec);
    });
  }
}


module.exports = HuaweiDecoder;

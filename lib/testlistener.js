/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const DEFAULT_RADIO_DECODINGS_PERIOD_MILLISECONDS = 1000;
const DEFAULT_RSSI = 0xb8;
const MIN_RSSI = 0xaa;
const MAX_RSSI = 0xdf;
const RSSI_RANDOM_DELTA = 5;
const TEST_ORIGIN = 'test';


/**
 * TestListener Class
 * Provides a consistent stream of artificially generated packets.
 */
class TestListener {

  /**
   * TestListener constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.decoder = options.decoder;
    this.radioDecodingPeriod = options.radioDecodingPeriod ||
                               DEFAULT_RADIO_DECODINGS_PERIOD_MILLISECONDS;
    this.rssi = [ DEFAULT_RSSI ];
    this.decodingOptions = options.decodingOptions || {};

    setInterval(emitRadioDecodings, this.radioDecodingPeriod, this);
  }

}


/**
 * Emit simulated radio decoding packets
 * @param {TestListener} instance The given instance.
 */
function emitRadioDecodings(instance) {
  let time = new Date().getTime();
  let huaweiTime = Math.round(time / 1000).toString(16);
  let simulatedBinaryData = Buffer.from('48570124a52cffffff000001' +
                                        'fee150bada55' + huaweiTime +
                                        instance.rssi[0].toString(16) + 'ff00' +
                                        '0702011a03ff7d02', 'hex');

  updateSimulatedRssi(instance);
  instance.decoder.handleData(simulatedBinaryData, TEST_ORIGIN, time,
                              instance.decodingOptions);
}


/**
 * Update the simulated RSSI values
 * @param {TestListener} instance The given instance.
 */
function updateSimulatedRssi(instance) {
  for(let index = 0; index < instance.rssi.length; index++) {
    instance.rssi[index] += Math.floor((Math.random() * RSSI_RANDOM_DELTA) -
                                       (RSSI_RANDOM_DELTA / 2));
    if(instance.rssi[index] > MAX_RSSI) {
      instance.rssi[index] = MAX_RSSI;
    }
    else if(instance.rssi[index] < MIN_RSSI) {
      instance.rssi[index] = MIN_RSSI;
    }
  }
}


module.exports = TestListener;

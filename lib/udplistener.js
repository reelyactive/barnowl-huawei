/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const dgram = require('dgram');


const DEFAULT_TIMESTAMP_ON_ARRIVAL = true;


/**
 * UdpListener Class
 * Listens for reel data on a UDP port.
 */
class UdpListener {

  /**
   * UdpListener constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.decoder = options.decoder;
    let host = options.path.split(':')[0];
    let port = options.path.split(':')[1];
    this.decodingOptions = options.decodingOptions ||
                           { timestampOnArrival: DEFAULT_TIMESTAMP_ON_ARRIVAL };

    this.server = dgram.createSocket('udp4');
    handleServerEvents(this);
    this.server.bind(port, host);
  }
}


/**
 * Handle events from the UDP server.
 * @param {UdpListener} instance The UdpListener instance.
 */
function handleServerEvents(instance) {
  instance.server.on('listening', function() {
    let address = instance.server.address();
    console.log('barnowl-huawei: UDP listening on ' + address.address + ':' +
                address.port);
  });

  instance.server.on('message', function(data, remote) {
    let origin = remote.address + ':' + remote.port;
    let time = new Date().getTime();
    instance.decoder.handleData(data, origin, time, instance.decodingOptions);
  });

  instance.server.on('error', function(err) {
    instance.server.close();
    console.log('barnowl-huawei: UDP error', err);
  });
}


module.exports = UdpListener;

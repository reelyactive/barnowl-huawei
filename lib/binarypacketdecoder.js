/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const advlib = require('advlib-identifier');
const Raddec = require('raddec');


const MINIMUM_FRAME_LENGTH = 26;
const HUAWEI_VENDOR_ID = 0x4857;


/**
 * Determine if the given data begins with the Huawei vendor ID.
 * @param {Buffer} data The binary packet as a buffer.
 */
function isValidHuawei(data) {
  let isHuaweiVendorId = (data.readUInt16BE(0) === HUAWEI_VENDOR_ID);

  return isHuaweiVendorId;
}


/**
 * Decode a single transmitter frame from the given buffer and offset.
 * @param {Buffer} data The binary packet as a buffer.
 * @param {Number} index The byte index of the start of the transmitter frame.
 * @param {Array} raddecs The array of raddecs.
 * @param {String} receiverId The identifier of the receiver.
 */
function decodeTransmitterFrame(data, index, raddecs, receiverId) {
  let transmitterId = ('00000000000' +
                       data.readUIntBE(index, 6).toString(16)).substr(-12);
  let transmitterIdLittleEndian = data.readUIntLE(index, 6).toString(16);
  let timestamp = data.readUInt32BE(index + 6) * 1000;
  let rssi = data.readInt8(index + 10);
  let packetLength = data.readUInt8(index + 13);
  let packetFrameIndex = index + 14 + packetLength;
  let raddec = new Raddec({
      transmitterId: transmitterId,
      transmitterIdType: Raddec.identifiers.TYPE_EUI48, // TODO: unknown
      timestamp: timestamp
  });

  raddec.addDecoding({ receiverId: receiverId,
                       receiverIdType: Raddec.identifiers.TYPE_EUI48,
                       rssi: rssi });

  if(packetLength > 0) {
    let packet = ('000' + packetLength.toString(16)).substr(-4);
    packet += transmitterIdLittleEndian;
    packet += data.toString('hex', index + 14, packetFrameIndex);
    raddec.addPacket(packet);
  }

  raddecs.push(raddec);

  return packetFrameIndex;
}


/**
 * Decode all the serial packets from the hex string.
 * @param {Buffer} data The binary packet as a buffer.
 * @param {String} origin Origin of the data stream.
 * @param {Number} time The time of the data capture.
 * @param {Object} options The packet decoding options.
 */
function decode(data, origin, time, options) {
  let raddecs = [];
  let isTooShort = (data.length < MINIMUM_FRAME_LENGTH);

  if(isTooShort || !isValidHuawei(data)) {
    return raddecs;
  }

  let receiverId = data.readUIntBE(3,6).toString(16);
  let numberOfTransmitters = data.readUInt8(11);
  let transmitterFrameIndex = 12;

  for(let cTransmitter = 0; cTransmitter < numberOfTransmitters;
      cTransmitter++) {
    transmitterFrameIndex = decodeTransmitterFrame(data, transmitterFrameIndex,
                                                   raddecs, receiverId);
  }

  return raddecs;
}


module.exports.decode = decode;

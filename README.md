barnowl-huawei
==============

__barnowl-huawei__ converts Bluetooth Low Energy decodings from Huawei access points into software-developer-friendly JSON: a real-time stream of [raddec](https://github.com/reelyactive/raddec/) objects which facilitate any and all of the following applications:
- RFID: _what_ is present, based on the device identifier?
- RTLS: _where_ is it relative to the receiving devices?
- M2M: _how_ is its status, based on any payload included in the packet?

__barnowl-huawei__ is a lightweight [Node.js package](https://www.npmjs.com/package/barnowl-huawei) that can run on resource-constrained edge devices as well as on powerful cloud servers and anything in between.  It is typically run behind a [barnowl](https://github.com/reelyactive/barnowl) instance which is included in the [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source middleware suite.


Installation
------------

    npm install barnowl-huawei


Quick Start
-----------

Clone this repository, install package dependencies with `npm install`, and then from the root folder run at any time:

    npm start

__barnowl-huawei__ will listen for UDP packets from Huawei APs on localhost:50010 and print any processed [raddec](https://github.com/reelyactive/raddec) data to the console.


Hello barnowl-huawei!
---------------------

The following code will listen to _simulated_ hardware and output packets to the console:

```javascript
const BarnowlHuawei = require('barnowl-huawei');

let barnowl = new BarnowlHuawei();

barnowl.addListener(BarnowlHuawei.TestListener, {});

barnowl.on('raddec', function(raddec) {
  console.log(raddec);
});
```

As output you should see a stream of [raddec](https://github.com/reelyactive/raddec/) objects similar to the following:

```javascript
{
  transmitterId: "fee150bada55",
  transmitterIdType: 2,
  rssiSignature: [
    {
      receiverId: "24a52cffffff",
      receiverIdType: 2,
      rssi: -72,
      numberOfDecodings: 1
    }
  ],
  packets: [ '000755daba50e1fe02011a03ff7d02' ],
  timestamp: 1547693457133
}
```

Regardless of the underlying RF protocol and hardware, the [raddec](https://github.com/reelyactive/raddec/) specifies _what_ (transmitterId) is _where_ (receiverId & rssi), as well as _how_ (packets) and _when_ (timestamp).


Is that owl you can do?
-----------------------

While __barnowl-huawei__ may suffice standalone for simple real-time applications, its functionality can be greatly extended with the following software packages:
- [advlib](https://github.com/reelyactive/advlib) to decode the individual packets from hexadecimal strings into JSON
- [barnowl](https://github.com/reelyactive/barnowl) to combine parallel streams of RF decoding data in a technology-and-vendor-agnostic way

These packages and more are bundled together as the [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere) open source middleware suite, which includes several __barnowl-x__ listeners.


Supported Listener Interfaces
-----------------------------

The following listener interfaces are supported.

### UDP

```javascript
barnowl.addListener(BarnowlHuawei.UdpListener, { path: "0.0.0.0:50010" });
```

### Test

Provides a steady stream of simulated Huawei packets for testing purposes.

```javascript
barnowl.addListener(BarnowlHuawei.TestListener, {});
```


Huawei Bluetooth Service Profile Parameters
-------------------------------------------

Use the following Bluetooth Scanning parameters for the Huawei AP/AC:

| Property                           | Value                    | 
|:-----------------------------------|:-------------------------|
| Monitoring surrounding BLE devices | ON                       |
| Monitoring mode                    | Transparent transmission |
| Data reporting                     | ON                       |
| Data reporting time                | Real-time                |

For the IPv4 address/port parameter, specify the IP address of the server running __barnowl-huawei__ and port 50010.


Supported Decoding Options
--------------------------

Each listener interface supports _decodingOptions_ with the following properties:

| Property           | Default | Description                         | 
|:-------------------|:--------|:------------------------------------|
| timestampOnArrival | true    | Override any timestamp included in the inbound packet with the time at which it is received by barnowl-huawei |


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

[![Known Vulnerabilities](https://snyk.io/test/github/reelyactive/barnowl-huawei/badge.svg)](https://snyk.io/test/github/reelyactive/barnowl-huawei)


License
-------

MIT License

Copyright (c) 2021-2022 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.

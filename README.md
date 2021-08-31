barnowl-huawei
==============

Interface Huawei access points with [barnowl](https://github.com/reelyactive/barnowl) open source software.  We believe in an open Internet of Things.


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


License
-------

MIT License

Copyright (c) 2021 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
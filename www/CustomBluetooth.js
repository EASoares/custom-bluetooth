cordova.define("cordova-plugin-custom-bluetooth.CustomBluetooth", function(require, exports, module) {

var
	exec = require('cordova/exec'),
	channel = require('cordova/channel'),
	Event = require('cordova-plugin-custom-bluetooth.event')
;

exports.getAdapterState = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'getAdapterState', []);
};

exports.requestEnable = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'requestEnable', []);
};

exports.enable = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'enable', []);
};

exports.disable = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'disable', []);
};

exports.getDevice = function (deviceAddress, success, error) {
	exec(success, error, 'CustomBluetooth', 'getDevice', [deviceAddress]);
};

exports.getDevices = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'getDevices', []);
};

exports.pairDevice = function (address, success, error) {
	exec(success, error, 'CustomBluetooth', 'pairDevice', [address]);
};

exports.unpairDevice = function (address, success, error) {
	exec(success, error, 'CustomBluetooth', 'unpairDevice', [address]);
};

exports.callA2dp = function (address, success, error) {
	exec(success, error, 'CustomBluetooth', 'callA2dp', [address]);
};

exports.startDiscovery = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'startDiscovery', []);
};

exports.stopDiscovery = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'stopDiscovery', []);
};

exports.requestDiscoverable = function (success, error) {
	exec(success, error, 'CustomBluetooth', 'requestDiscoverable', []);
};

exports.connect = function (address, uuid, success, error) {
	exec(success, error, 'CustomBluetooth', 'connect', [address, uuid]);
};

exports.close = function (socketId, success, error) {
	exec(success, error, 'CustomBluetooth', 'close', [socketId]);
};

exports.send = function (socketId, data, success, error) {
	exec(success, error, 'CustomBluetooth', 'send', [socketId, data]);
};

exports.listenUsingRfcomm = function (uuid, success, error) {
	exec(success, error, 'CustomBluetooth', 'listenUsingRfcomm', [uuid]);
};

// Events
exports.onAdapterStateChanged = Object.create(Event);
exports.onAdapterStateChanged.init();

exports.onDeviceAdded = Object.create(Event);
exports.onDeviceAdded.init();

exports.onReceive = Object.create(Event);
exports.onReceive.init();

exports.onReceiveError = Object.create(Event);
exports.onReceiveError.init();

exports.onAccept = Object.create(Event);
exports.onAccept.init();

exports.onAcceptError = Object.create(Event);
exports.onAcceptError.init();

channel.onCordovaReady.subscribe(function() {
	exec(function (adapterState) {
		exports.onAdapterStateChanged.fire(adapterState);
	}, null, 'CustomBluetooth', 'registerAdapterStateChanged', []);

	exec(function (deviceInfo) {
		exports.onDeviceAdded.fire(deviceInfo);
	}, null, 'CustomBluetooth', 'registerDeviceAdded', []);

	exec(function (socketId, data) {
		exports.onReceive.fire({
			socketId: socketId,
			data: data
		});
	}, null, 'CustomBluetooth', 'registerReceive', []);

	exec(function (info) {
		exports.onReceiveError.fire(info);
	}, null, 'CustomBluetooth', 'registerReceiveError', []);

	exec(function (serverSocketId, clientSocketId) {
		exports.onAccept.fire({
			socketId: serverSocketId,
			clientSocketId: clientSocketId
		});
	}, null, 'CustomBluetooth', 'registerAccept', []);

	exec(function (info) {
		exports.onAcceptError.fire(info);
	}, null, 'CustomBluetooth', 'registerAcceptError', []);
});


});

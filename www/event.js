var Event = {
	init: function () {
		this.listeners = [];
	},

	addListener: function (callback) {
		if (!this.hasListener(callback)) {
			this.listeners.push(callback);
		}
	},

	removeListener: function (callback) {
		var	i = this.listeners.indexOf(callback);
		;
		if (i >= 0) {
			this.listeners.splice(i, 1);
		}
	},

	hasListener: function (callback) {
		return (this.listeners.indexOf(callback) >= 0);
	},

	hasListeners: function () {
		return Boolean(this.listeners.length);
	},

	fire: function () {
		var	i, len_listeners = this.listeners.length;
		for (i = 0; i < len_listeners; i += 1) {
			this.listeners[i].apply(this, arguments);
		}
	}
};

module.exports = Event;


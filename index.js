class Hash {

	constructor(initializer) {
		this.state = {}
		this.initialize_value = get_value_initializer(initializer)
	}


	get(key) {
		if (!(key in this.state)) {
			this.initialize_value(this.state, key)
		}
		return this.state[key]
	}


	set(key, value) {
		this.state[key] = value
	}


	keys() {
		return Object.keys(this.state)
	}


	values() {
		return Object.values(this.state)
	}


	valueOf() {
		return this.state
	}


	toJSON() {
		return this.state
	}

}





function get_value_initializer(fn_or_value) {
	switch (typeof fn_or_value) {
		case 'function':
		return fn_or_value

		case 'undefined':
		return noop

		default:
		return function (hash, key) {
			hash[key] = fn_or_value
		}
	}
}


function noop(){}




module.exports = Hash

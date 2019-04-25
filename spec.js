const Hash = require('./index')
const assert = require('assert')


describe ("Hash", function () {

	it ("provides a ruby-like interface for an object", function () {
		let hash = new Hash()

		assert.equal( hash.get('an index'), undefined )

		hash.set('an index', 'a value')

		assert.equal( hash.get('an index'), 'a value' )
	})


	it ("serializes into JSON correctly", function () {
		let hash = new Hash()

		hash.set('foo', 'bar')
		hash.set('baz', 'buz')

		assert.deepEqual( JSON.stringify(hash), JSON.stringify({ foo: 'bar', baz: 'buz' }) )
	})


	describe ("keys()", function () {

		it ("returns a list of keys created", function () {
			let hash = new Hash()

			assert.equal( hash.get('foo'), undefined )

			assert.deepEqual( hash.keys(), [] )

			hash.set('foo')
			assert.deepEqual( hash.keys(), ['foo'] )
		})
	})

	describe("values()", function () {

		it("returns a list of values created", function () {
			let hash = new Hash()

			assert.deepEqual( hash.values(), [] )

			hash.set('one', 'a')
			hash.set('one', 'a')
			assert.deepEqual( hash.values(), ['a'] )

			hash.set('two', 'b')
			assert.deepEqual( hash.values(), ['a', 'b'] )
		})
	})


	describe ("valueOf() support", function () {

		it ("returns its state object", function () {
			let hash = new Hash()

			assert.deepEqual( hash.valueOf(), {} )

			hash.set('foo', 'bar')

			assert.deepEqual( hash.valueOf(), {foo: 'bar'} )
		})
	})




	context ("with an initializer function", function () {

		it ("builds a value when a missing index is accessed for the first time", function () {
			let hash = new Hash((hash, key) => {
				hash[key] = `DEFAULT ${key}`
			})

			assert.equal( hash.get('missing'), 'DEFAULT missing' )
		})


		it ("only runs the initializer once", function () {
			let hash = new Hash((hash, key) => {
				hash[key] =  {name: 'an object'}
			})

			assert.equal( hash.get('missing').name, 'an object' )
			assert.equal( hash.get('missing'), hash.get('missing') )
		})
	})



	context("with an initializer value", function () {

		it("builds a value when a missing index is accessed for the first time", function () {
			let hash = new Hash('DEFAULT')

			assert.equal( hash.get('missing'), 'DEFAULT' )
		})


		it("only runs the initializer once", function () {
			let default_value = {name: 'default'}
			let hash = new Hash(default_value)

			assert.equal( hash.get('missing'), default_value )
			assert.equal( hash.get('another missing'), default_value )
			assert.equal( hash.get('missing'), hash.get('missing') )
			assert.equal( hash.get('missing'), hash.get('another missing') )
		})
	})




	it ("EXAMPLE: is an easy way to initialize dictionaries", function () {
		let hash = new Hash((hash, key) => hash[key] = { name: key, items: [] })

		hash.get('example').items.push('a')

		assert.deepEqual( hash.get('example'), { name: 'example', items: ['a'] } )
	})


	it("EXAMPLE: can make powerful use of the missing key", function () {
		let times_two = new Hash((hash, key) => hash[key] = key * 2 )

		assert.equal( times_two.get(2), 4 )
	})


})

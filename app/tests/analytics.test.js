var assert = require('assert'),
	analyticsController = require('')

//Boilerplate
describe('String#split', function() {
	it('should return an array', function() {
		assert(Array.isArray('a,b,c'.split(',')));
	});
});
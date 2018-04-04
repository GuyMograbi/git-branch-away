const test = require('ava');
const gitBranches = require('../index');
test('arrays are equal', t => {
	gitBranches.init();
	t.deepEqual([1, 2], [1, 3]);
});

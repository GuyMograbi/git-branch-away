const test = require('ava');
const gitBranches = require('../index');
test('arrays are equal', t => {
	gitBranches.init();
	t.truthy(gitBranches.current());
	t.true(gitBranches.other().length > 1);
});

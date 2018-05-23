const test = require('ava');
const path = require('path');
const gitBranches = require('../index');
test('arrays are equal', t => {
	gitBranches.init();
	t.truthy(gitBranches.current(), 'should have current branch');
	t.true(gitBranches.other().length > 1, 'should have branches');
	t.true(gitBranches.root().includes(path.join(__dirname,'..')), 'root should include dirname');
});

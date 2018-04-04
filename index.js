var shell = require('shelljs');

let allLocalBranches;

console.log(shell.exec('echo hello').toString());

exports.init = (cwd) => allLocalBranches = (shell.exec(`git branch`, {silent: true, cwd}) || '').toString().split('\n');

exports.isClean = () => shell.exec(`git status`, {silent: true}).toString().includes('nothing to commit');

exports.current = () => allLocalBranches.find((b) => b[0] === '*').slice(1).trim();

exports.other = () => allLocalBranches.filter((l) => l[0] !== '*').map((n) => n.trim());

exports.all = () => allLocalBranches.map((b) => {
  if (b[0] === '*') {
    return b.slice(1).trim();
  } else {
    return b.trim();
  }
});

exports.list = (cwd) => {
  exports.init(cwd);
  return {
    current: exports.current(),
    other: exports.other(),
    all: exports.all()
  }
}

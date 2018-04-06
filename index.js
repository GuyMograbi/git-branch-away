var shell = require('shelljs');

let allLocalBranches;

exports.init = (cwd = process.cwd()) => {
  allLocalBranches = (shell.exec(`git branch`, {silent: true, cwd}) || '').toString().split('\n').filter(f=>f!='');
}

exports.isClean = () => {
  return shell.exec(`git status`, {silent: true}).toString().includes('nothing to commit');
}

exports.current = () => {
  return allLocalBranches.find(b => b[0] === '*').split('*')[1].trim();
}

exports.other = () => allLocalBranches.filter(l => l[0] !== '*').map((n) => n.trim());

exports.all = () => allLocalBranches.map(b => {
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

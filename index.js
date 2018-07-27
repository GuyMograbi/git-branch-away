var shell = require('shelljs');

let allBranches;
let remoteBranches;
let rootDir;

let uniq = a => [...new Set(a)];

// true if cwd is in git repository tree
exports.isRepository = (cwd = process.cwd()) => {
  // https://stackoverflow.com/a/16925062/1068746
  return shell.exec(`git rev-parse --is-inside-work-tree`, {silent: true, cwd}).toString().trim() === 'true';
}

exports.init = (cwd = process.cwd()) => {
  allBranches = (shell.exec(`git branch`, {silent: true, cwd}) || '').toString().split('\n').filter(f=>f!='').map(b=>b.trim());
  remoteBranches = (shell.exec(`git branch -r`, {silent: true, cwd}) || '').toString().split('\n').filter(f=>f!='').map(f=>f.trim().split(' ')[0]);
  allBranches = allBranches.concat(remoteBranches.map(b=>b.split('/').slice(1).join('/').trim())); // remove 'origin/' prefix

  allBranches = uniq(allBranches);
  rootDir = shell.exec(`git rev-parse --show-toplevel`, {silent: true, cwd}).toString();
}

exports.root = () => rootDir;

exports.isClean = () => {
  return shell.exec(`git status`, {silent: true}).toString().includes('nothing to commit');
}

// gets which remote is being tracked by this branch. empty string means there's no remote branch being tracked
// might not support windows. need to figure out how to avoid shelljs printing error messages from git. silent does not help
exports.getUpstream = (branch) => {
  return shell.exec(`git rev-parse --abbrev-ref ${branch}@{upstream} 2>/dev/null`, {silent: true}).toString();
}

// list all branches that were merged to branch X
exports.getMergedBranches = (targetBranch) => {
  return exports.all(shell.exec(`git branch --merged ${targetBranch}`, {silent: true}).toString().split('\n').filter(f=>f!=''));
}


exports.current = () => {
  return allBranches.find(b => b[0] === '*').split('*')[1].trim();
}

// split to different function because might be
exports.remote = () => {
  return remoteBranches;
}

exports.getCommitsDiff = (branch = exports.current(), target = `origin/${exports.current()}`) => {
  const [ahead,behind] = shell.exec(`git rev-list --left-right --count ${branch}...${target}`, {silent: true}).toString().split(/\s|\t/).filter(s=>s.length>0);
  console.log(ahead,behind);
  return {ahead, behind};
}

exports.other = () => allBranches.filter(l => l[0] !== '*').map((n) => n.trim());

exports.all = (branches=allBranches) => branches.map(b => {
  if (b[0] === '*') {
    return b.slice(1).trim();
  } else {
    return b.trim();
  }
});

exports.list = (cwd = process.cwd()) => {
  exports.init(cwd);
  return {
    current: exports.current(),
    other: exports.other(),
    all: exports.all(),
    remotes: remoteBranches,
    root: rootDir
  }
}

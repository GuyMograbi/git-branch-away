# Git Branch Away

> Quickly get branch information for your repository

# Usage

```javascript
const gitBranches = require('git-branch-away');
gitBranches.list(/* optional cwd */); // return {current:, other: all:} object.

```

More function you can use for more specific info

```javascript
gitBranches.init(); // will go through the information. you need to call this on every checkout etc..
gitBranches.current(); // current branch
gitBranches.isClean();
gitBranches.other();
gitBranches.all();
gitBranches.root(); // gets the root of git repository

```

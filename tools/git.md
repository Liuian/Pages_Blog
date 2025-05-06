---
layout: default
title: Git
---
## Local Repo Connect to a Remote Repository
- `git init`
- `git remote add origin <liink.git>`
- `git remote -v`

## .gitignore
- (wins) `New-Item -Path . -Name ".gitignore" -ItemType "File" -Force`
- (linux) `nano .gitignore`

``` bash
# .gitignore
*.tsv
*.geojson
```

## add, commit, push
- `git add .`
- `git commit -m '<message>'`
- first push. Check current branch name: `git branch`
- first push: `git push -u origin [branch name]`
- `git push`

## branch
- check current branch name: `git branch`
- rename current branch locally: `git branch -M pu_building`
- delete old branch: `git push origin --delete master`
- verify everthing: `git branch -a`

## Force pull from a Git remote repository & discard all local changes

To **force pull from a Git remote repository** and **discard all local changes**, follow these steps carefully. This will overwrite your local files and history with the latest from the remote, **so make sure you're okay with losing any uncommitted local work**.

---

### 🚨 WARNING:

This process will **delete all local changes**, including uncommitted and committed but not pushed changes.

---

## ✅ Steps to Force Pull and Recover Remote Repository:

### **1. Discard uncommitted changes (optional but recommended if you're unsure):**

```bash
git reset --hard
git clean -fd
```

* `reset --hard`: resets tracked files to the last commit
* `clean -fd`: removes untracked files and directories

---

### **2. Fetch latest remote data:**

```bash
git fetch --all
```

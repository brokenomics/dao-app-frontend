# New Order DAO App

This is the frontend for the New Order DAO's Dapp that can found here: [https://dao.neworder.network/](https://dao.neworder.network/).

All documentation about the DAO can be found on our gitbook page here: [https://docs.neworder.network/new-order/](https://docs.neworder.network/new-order/)

## Contributing to the Project

New Order welcomes contributors to our open source DAO app.

Join New Order DAO's discord server to get more help from other contributors on our `Engineering Workstream` channels. Join our discord server by clicking the invite link here: [https://discord.gg/3gduHhHs](https://discord.gg/3gduHhHs)

### Issues

Feel free to submit issues and enhancement requests [here](https://github.com/new-order-network/dao-app-frontend/issues).

## Contributing

**Before Contributing**

1. You'll need Git, Node, and Yarn installed before starting. 
2. Please refer to the project's style and contribution guidelines for submitting patches and additions.
3. In general, we follow the "fork-and-pull" Git workflow.

**Setup and Compiling**

Steps 1-6 only need to be done once to get set up.

1. Fork the repo on GitHub
2. Clone the project onto your machine
3. Create a .env.local file and ping a current dev for the contents (WIP--may just add this to the repo for simplicity)
4. `git remote add upstream https://github.com/new-order-network/dao-app-frontend.git`
  a. This adds a link to your parent repo so you can easily pull from it
5. `$ nvm use` 
  a. This sets your Node to the right version
6. `$ yarn install` 
  a. This tells yarn to install the necessary packages
7. `$ yarn start` 
  a. This builds the project and watches for changes
  b. Now, at localhost:3000, you should see the site
  c. Any changes you make to the code should cause an auto-update as the files are being watched

**Committing Changes**

1. `$ git checkout -b <branch_name>`
  a. This makes and checks out a local branch for you to develop on
  b. For naming, we prefer to format it this way: `[ISSUE-TAG]/[ISSUE-NUMBER]-[A-MEANINGFUL-TITLE]`
    i. So for example, we have an issue called "Update README" with a tag of "enhancement" and issue number of 1, the ideal branch name could be: `enhancement/1-update-readme`
  b. Name it descriptively in the format described above, e.g. "bug/fix-logo"
2. `$ git push origin <branch_name>`
  a. This creates a matching branch in your remote repository
3. Make changes to the code as needed and `$ git add <blah>` any files you've modified
4. `$ git commit --no-verify -m "<descriptive_comment>"`
  a. This commits your changes to your local branch
  b. The --no-verify flag will stop linter from blocking your commit due to warnings
5. `$ git fetch upstream; git checkout master; git merge upstream/master; git checkout <branch_name; git merge master`
  a. This series of commands will pull the latest changes from the parent repo, merge them into your forked repo's master branch, then rebase your new branch on top of those changes
6. Repeat step 2 to push your changes to your remote branch
7. Now, go to GitHub's UI and submit a pull request to merge your changes with the parent repo's master branch
# EC2

The application is deployed on a virtual machine on AWS EC2.

## Deploying

In order to deploy a new version of the service, you will need to have access to the virtual machine and have an account with access to the AWS EC2 instance.

These are the steps in order to make a deploy:

1. SSH into the EC2 instance
2. Enter the git directory (should be called the same as this repo)
3. Make sure you are on the branch `main`, then `git pull`
4. (In case the pulled changes include changes in a custom plugin, cd into that plugin and do a `npm run build`)
5. (In case the pulled changes include the addition of a new npm package, run `npm i` in the project root)
6. Run `npm run build` in the project's root
7. Go back to `~`
8. Kill all PM2 processes by using `pm2 kill`
9. Start the new instance by using `pm2 start ecosystem.config.js` (the file name should exist in `~` and contain all environment variables).

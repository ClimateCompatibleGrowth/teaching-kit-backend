# EC2

The application is deployed on a virtual machine on AWS EC2.

## Deploying

In order to deploy a new version of the service, you will need to have access to the virtual machine and have an account with access to the AWS EC2 instance.

These are the steps in order to make a deploy:

1. SSH into the EC2 instance (If you do not have ssh access to the ec2 instance, see guide below)
2. Enter the git directory (should be called the same as this repo)
3. Make sure you are on the branch `main`, then `git pull`
4. (In case the pulled changes include changes in a custom plugin, cd into that plugin and do a `npm run build`)
5. (In case the pulled changes include the addition of a new npm package, run `npm i` in the project root)
6. Run `npm run build` in the project's root
7. Go back to `~`
8. Kill all PM2 processes by using `pm2 kill`
9. Start the new instance by using `pm2 start ecosystem.config.js` (the file name should exist in `~` and contain all environment variables).

## SSH access

1. Log in to AWS as root user (or as a user with full EC2 access)
2. In the AWS EC2 dashboard, in the left-hand navigation pane, under “Elastic Block Store”, select “Volumes”.
3. Find the volume attached to your instance, select it, and choose “Create Snapshot”.
4. Create a new EC2 instance, but with a key pair (pem file) you have access to.
5. Stop the new instance, detach its root volume.
6. Create a new volume from the snapshot you created earlier.
7. Attach the new volume to the temporary instance.
8. Start the new instance
9. Connect to the new instance by SSH.
10. Tweak the `~/.ssh/authorized_keys` so that it contains the keys you want to have access to the instance.
11. Stop the new instance, detach the volume, and attach it as a root volume to the original instance.
12. Restart the old instance, and proceed with the rest of the instructions to redeploy and restart the application. The SSH fingerprint of the old instance will likely have changed, so you may have to remove it from your local `known_hosts` file to connect.

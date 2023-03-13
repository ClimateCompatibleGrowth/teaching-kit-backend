# Postgres Database

## Setting up postgres locally on OSX

1. `brew install postgresql`
2. `brew services start postgresql` (or `brew services run postgresql` to have it not restart at boot time)
3. `psql postgres` -> `CREATE DATABASE <database-name>;` (same as specified in your .env) -> `quit;`

### Basic postgres navigation

```
\list # or \l list all databases
\c <db name> # connect to a certain database
\dt # list all tables in the current database using your search_path
\dt *. # list all tables in the current database regardless your search_path
```

### Recommended Postgres UI

```
brew install --cask pgadmin4
```

## Take a database dump of the production database

The way the production environment is setup at the moment, the only machine that has access to the RDS instance is our EC2 instance which runs the Strapi service. In order to download a database dump to your local environment, you'll have to download the dump to EC2, and then `scp` it from there to your local machine.

1. SSH into the EC2 instance
2. Create a dump of the production data by using the following command: `pg_dump -h <database-endpoint> -U postgres -f dump.sql <database-name>`. The database endpoint can be found in RDS under "Connectivity & security", and the database name in RDS under "Configuration". This will create a database dump in a file at `~dump.sql`.
3. In the command line _on your local machine_, use `scp -i <path-to-your-ec2-cert-file> <ec2-machine-user>@<ec2-ip>:<dump-location> Downloads` in order to download the dump to `~/Downloads` on your local machine.

## Replace your local postgres database with the content of a database dump

!NOTE! Triple-check that you are on your local environment when doing this, and not ssh:d into RDS.

1. Enter `whoami`. This is only to make sure you are on your local machine. The output should be your user on your local machine (the username on the EC2 instance is more generic)
2. Enter your local postgres database by running `psql <database-name>`
3. NOTE: the following will remove everything in your database. Make sure you won't miss anything in it. If you're sure; run `DROP SCHEMA public CASCADE;` followed by `CREATE SCHEMA public;`
4. Exit out after creating a schema by running `\q`
5. Run `psql <database-name> < <path-to-your-database-dump>`. This will populate the database according to your dump

Note 1: You might get an sql error that "rdsadmin does not exist" in case you're running on a production dump. That's a role the aws rds creates for itself, but it shouldn't affect your local environment.

Note 2: Your local logins will be reset with this as well, so you'll have to login with the credentials used for the production environment. If you login using the admin user (the only user which is currently used in the deployed environment), it would be good to immediately create a new user for you to use in your local environment. This is in order to not fool around too much with production credentials while developing locally.

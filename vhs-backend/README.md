### VHS

To start the app, you should clone this repo to your local machine and do the following in your terminal:

- position yourself to project directory
- run "yarn" to install project dependencies
- run "docker compose up -d" to start the PostgreSQL VHS database
- run "yarn start:dev:seed" to start the app in development mode and also seed the database on startup (run "yarn start:dev" to start in development mode, but without database seeding)

You can control database seeding by setting the environment variable DB_SEED to 1 if you want to seed and 0 otherwise. So technically you don't necessarily need the yarn start:dev:seed script, it's there for convenience.

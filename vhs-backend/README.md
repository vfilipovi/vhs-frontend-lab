### VHS

During implementation of the VHS Rental system, I assumed the following rules:

- there can be more than one VHS cassette for a particular movie available (so VHS model has a quantity field, which is a number), this means that the same VHS CAN be rented on the same date more than once, as long
  as the quantity is greater than 0 (this is validated on rent request)
- when the rental is created, its returned_at field is NULL at first, but upon returning a VHS, the user triggers an update PATCH method to that rental which sets the returned_at date and at the same time updates the late_fee if neccessary
- authentication has been implemented using JWT, so there is no logout route, just login and register
- if you are late with returning the VHS, the late fee is equal to number of days you are late times some constant number
- not every VHS has the same initial rental price, because some movies are more popular than others and more in demand
- final price you pay for the VHS rental is = initialRentalPrice + lateFee

To start the app, you should clone this repo to your local machine and do the following in your terminal:

- position yourself to project directory
- run "yarn install" to install project dependencies
- run "docker compose up" to start a PostgreSQL database
- run "yarn start:dev:seed" to start the app in development mode and also seed the database on startup (run "yarn start:dev" to start in development mode, but without database seeding)

You can control database seeding by setting the envitronment variable DB_SEED to 1 if you want to seed and 0 otherwise. So technically you don't necessarily need the yarn start:dev:seed script, it's there for convenience.

In case you want to run e2e tests, you should first run the docker-compose.test.yml file because it will start a database that's just for testing:

- docker compose -f docker-compose.test.yml up
- yarn test:e2e

There are some extra features that weren't necessary but I included them:

- the Postman collection has requests for all controller methods, not just the ones listed in the task (the collection is in JSON format in the repository)
- rentals can be filtered by user id, and VHS tapes can be filtered by genre and availability, I thought this could come in handy for system users
- docker compose files

### Docker commands

Build Nexus server:

- docker build -t my-nexus-build -f Dockerfile.nexus .

Start Nexus server:

- docker run -d -p 18081:8081 -p 18082:8082 --name nexus --restart always -v nexus-data:/opt/nexus/sonatype-work my-nexus-build

Build VHS app:

- docker build -t vhs-app .

Run VHS app:

- docker run -d -p 3000:3000 --name vhs-app vhs-app

### Push VHS app to Nexus registry once it's started:

- docker login 127.0.0.1:18082
- docker tag vhs-rental 127.0.0.1:18082/vhs-rental:latest
- docker push 127.0.0.1:18082/vhs-rental:latest

It was neccessary to define an extra open port on Nexus server that will be used by the Docker registry which needs to be manually opened once Nexus starts up. I tested all of these commands and they work well
on my machine, hopefully they will on yours too. :)

Thing I could still improve but would take extra time:

- I could make a script for database seeding that can be run separately from application, so that it wasn't neccessary to run both at the same time like now
- instead of java-devel package I used java-headless, because I had problems with the former... however, if you look in official nexus Dockerfile, they also use java-headless and not devel
- I think I could have handled deletion of VHS and rentals better... but I will say this task is quite extensive and I decided to call this a finished solution since I did implement all the requirements asked of me in the task :)
- the yarn start:dev:seed script would not work on Windows because of SEED_DB=1 part in the script.. to fix that, I could use cross-env package, but I guess not everything has to be perfect, and who uses Windows anyway?? :P
- if I was deploying this to production somewhere, I wouldn't push my .env file like this, but I'm just including it so it's easier for you to test stuff
- it's likely that you will find some unformatted and not very bussiness oriented error messages because I don't think I covered all of them

Furthemore on this last point... When I delete a rental, I first take its VHS property to increase VHS quantity by one, after which the rental can be deleted safely. But if VHS is successfully updated and the rental is NOT deleted, then
there is an incorrect state in the database. So, this should probably be made an atomic operation.

When deleting a VHS, I just delete it by id and am not handling the case of what happens to rentals that have that VHS id in them. When you think about it this doesn't make a lot of sense from bussiness perspective since an admin would not choose to delete a VHS entity if someone has rented it and not returned it. And since old rentals are being kept in the database, deleting a VHS just doesn't seem like a good idea (because what should happen to those rentals then?). But, for the sake of a more robust system, the DELETE endpoint for VHS should be handled better I guess. :D

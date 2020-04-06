# To Build
## Prerequisites: 
* Node v 12.16.1
* npm 6.13.4 (You should have it when you install node, no need to install separately).

## External dependencies
* It points to cloud Mongodb by default and no need to install Mongo (ubless you need to point to your local).

## Steps to run on local
* Create a file called .env (at the same level as package.json) and copy the contents of .envexample in this file. Remember, this .env file is git ignored (alreaded added in the .gitignore file).

### Non Docker version
* Run `npm install`
* Run `node app.js`
* Open `http://localhost:7777/documentation` for swagger.
* Run the authentication endpoint by passing any username and password (doesn't matter).
* Copy the api token and pass it to every other api calls.

### Docker version
* Run `npm run docker-build`
* Run `docker run -p 7777:7777 saiprasadkrishnamurthy/data-transformation-service`
* Open `http://localhost:7777/documentation` for swagger.
* Run the authentication endpoint by passing any username and password (doesn't matter).
* Copy the api token and pass it to every other api calls.

## Steps to run the eslint
ES lint is a code conventions/standards checking tool (like checkstyle/pmd) in the java world.
* Run `npm run lint`

## Steps to generate the kubernetes descriptor files.
* Run `npm run docker-build`
* This will run lint, containerize the application and generate the kubernetes deployment descriptor files under '__k8s' directory.
* There will be a 'config-map' and a 'service' deployment file per environment.
* The environments are derived from the '.*env' files in the directory.
For example: If you have .testenv file, the kubernetes descriptor files would be generated for test environment based on the properties defined in the .testenv file.
* There's also a zip file under the __k8s directory containing all the kubernetes descriptor files generated.







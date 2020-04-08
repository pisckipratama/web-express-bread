## Dockerize NodeJS App

First you must to install [Docker](https://docs.docker.com/get-docker/)

Run this command 
`docker build -t dockerize-mynodejs .`

And then, run
`docker run -dp 8080:8080 dockerize-nodejs --name dockerize-nodejs`

References
https://itnext.io/dockerize-a-node-js-app-with-vs-code-bd471710dc22
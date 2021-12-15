# install dependencies
$ npm install 

# put your docker file in the docker folder

# run docker container to create database
$ docker-compose up

# init sequelize
$ npx sequelize-cli init

# execute migrate
$ npx sequelize-cli db:migrate

# run with debug vs

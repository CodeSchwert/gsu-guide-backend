FROM node:14

WORKDIR /gsu-backend

COPY . /gsu-backend

EXPOSE 5000

RUN ["yarn", "install"]

RUN ["yarn", "test"]

ENTRYPOINT ["yarn", "start"]

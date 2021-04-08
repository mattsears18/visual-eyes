# Dockerfile
FROM node:8.15.1

USER root

ENV METEOR_VERSION=1.9.3
ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

RUN curl "https://install.meteor.com/?release=${METEOR_VERSION}" | /bin/sh

COPY . /usr/app
WORKDIR /usr/app

RUN chmod -R 700 /usr/app/.meteor/local
RUN chown -Rh root /usr/app/.meteor/local
RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]
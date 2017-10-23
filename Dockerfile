FROM node:8.7.0-alpine

WORKDIR /code/project

ENTRYPOINT ["yarn"]

CMD ["dev"]

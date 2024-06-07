FROM node:20.12.2

RUN mkdir -p /server
WORKDIR /server

COPY . /server
RUN npm i
RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 3001

FROM node:14.16

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
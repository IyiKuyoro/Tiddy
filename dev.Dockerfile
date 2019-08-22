FROM node:10.16.3

LABEL author="Opeoluwa Iyi-Kuyoro"

ENV NODE_ENV=dev

COPY . /app
WORKDIR /app

RUN npm run setup

EXPOSE 4000

ENTRYPOINT ["npm", "run", "dev"]

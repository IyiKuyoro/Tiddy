FROM node:10.16.3

LABEL author="Tomi Adebanjo"

ENV NODE_ENV=production

COPY . /app
WORKDIR /app

RUN npm install -g typescript

CMD ["npm", "run", "deploy"]

FROM node:18-slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "dev"]

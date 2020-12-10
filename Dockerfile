FROM node:14.15.1-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=builder /usr/src/app/dist/survey-frontend /usr/share/nginx/html

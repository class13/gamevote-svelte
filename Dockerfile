FROM node:latest
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD node \ 
    -e API_HOST=$API_HOST \
    -e JWT_SECRET=$JWT_SECRET \
    -e BASE_URL=$BASE_URL \
    build 
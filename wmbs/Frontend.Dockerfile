# Step 1: Build the React app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

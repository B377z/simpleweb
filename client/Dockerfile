# Use a Node image to build the frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Use a lightweight web server to serve the frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

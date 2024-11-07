# Use the official NGINX image
FROM nginx:alpine

# Copy custom NGINX configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy application files from the Laravel PHP container
WORKDIR /var/www/html

# Copy files
COPY . .

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

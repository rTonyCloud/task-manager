# Dockerfile
FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies and extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    nodejs \
    npm \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo_mysql gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Install PHP dependencies
RUN composer install

# Install Node.js dependencies and build React assets
RUN npm install

# Run both client and SSR builds with Vite
RUN npm run build:ssr && npm run build

# Expose port 9000 for PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]

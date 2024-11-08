# Use the official PHP image with PHP-FPM
FROM php:8.2-fpm

# Set the working directory
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo_mysql gd

# Copy Composer from the Composer image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copy all application files, including artisan and composer files
COPY . .

# Install PHP dependencies for Laravel
RUN composer install --no-interaction --optimize-autoloader --prefer-dist

# Set appropriate permissions for Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/public \
    && chmod -R 775 /var/www/html/storage /var/www/html/public

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]

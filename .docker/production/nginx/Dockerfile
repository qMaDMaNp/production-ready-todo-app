FROM nginx:alpine

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx_ssl.conf /etc/nginx/nginx_ssl.conf

# Copy SSL certificates
COPY ssl /etc/letsencrypt
COPY ssl-dhparams.pem /etc/ssl/certs/dhparam.pem
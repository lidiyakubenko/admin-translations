FROM nginx:1.18.0

COPY ./dist /var/www

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
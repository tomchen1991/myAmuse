FROM nginx

LABEL maintainer=fzt_tom

ARG PROJECT_DIR="amuse"

COPY --chown=nginx:nginx dist/ /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

FROM musixise/tengine
VOLUME ["/var/log/nginx"]
VOLUME ["/var/cache/nginx"]
ADD dist/ /etc/nginx/html/

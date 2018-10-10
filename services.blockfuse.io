upstream addresses_upstream {
    server 127.0.0.1:3005;
    keepalive 64;
}

server {
        root /var/www/services.blockfuse.io/html;
        index index.html index.htm index.nginx-debian.html;

        server_name services.blockfuse.io www.services.blockfuse.io;

      location /api/ {
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    	proxy_set_header Host $http_host;
    	proxy_set_header X-NginX-Proxy true;
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";
    	proxy_max_temp_file_size 0;
    	proxy_pass http://addresses_upstream/;
    	proxy_redirect off;
    	proxy_read_timeout 240s;
      }
        location /litecoin-address-lookup {
                try_files $uri $uri/ =404;
      }
        location / {
                try_files $uri $uri/ =404;
      }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/services.blockfuse.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/services.blockfuse.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.services.blockfuse.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = services.blockfuse.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name services.blockfuse.io www.services.blockfuse.io;
    return 404; # managed by Certbot




}

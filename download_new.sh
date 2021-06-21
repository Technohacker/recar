#!/bin/sh
mkdir -p client_tmp

# Download website
(cd client_tmp && wget -r --no-parent --compression=auto --no-cookies https://chrome.com/racer/index.html)
mv client_tmp/chrome.com/racer client
rm -rf client_tmp

# Copy any polyfills
cp polyfills/* client/assets/js/lib/

# Apply patches to fix the client
patch -p0 < patches/002-client-new-fix.patch

# Set server ip and server port
echo
echo 'Enter the server details where you will expose Racer:'
read -p 'Server ip: ' server_ip
read -p 'Server port: ' server_port

sed -i "s/{SERVER_IP}/$server_ip/g" client/assets/js/racer/config/Config.js
sed -i "s/{SERVER_PORT}/$server_port/g" client/assets/js/racer/config/Config.js

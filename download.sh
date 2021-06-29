#!/bin/sh
mkdir -p client

# Download website
(
    cd client &&
    # nH removes the hostname, cut-dirs removes the racer subdirectory
    wget -r --no-parent --compression=auto --no-cookies -nH --cut-dirs=1 https://chrome.com/racer/index.html &&
    wget -r --no-parent --compression=auto --no-cookies -nH --cut-dirs=1 --base=https://chrome.com/racer/ --input-file=../extra_resources.txt
)

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

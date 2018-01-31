#!/bin/bash

IP="138.68.178.137"
# yarn build && 
tar czf build.tar.gz ./build && ssh root@$IP "mkdir -p /data/www/silkaudio/static " &&
scp build.tar.gz root@$IP:/data/www/silkaudio &&
ssh root@$IP "cd /data/www/silkaudio && rm -rf static/js/* static/css/* && tar -xzf build.tar.gz  --strip-components=2 -C . && rm -f build.tar.gz" 



#!/bin/bash

yarn build && 
ssh root@159.89.139.211 "sudo rm -rf /data/www/build/staic/css/* /data/www/build/staic/js/*" && 
cd /Users/lugeke/Desktop/react/silkaudio/build/ &&
scp -r static/css static/js root@159.89.139.211:/data/www/build/static
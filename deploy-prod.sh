#!/bin/bash

server=

s=$(readlink -f $0)
cd ${s%/*}

echo "build app" && \
	npm run build-prod && \
	echo "clear deployment folder on server" && \
	ssh davidl@88.99.118.38 << EOF
		mkdir -p ~/website/citrus
		rm -rf ~/website/citrus/client-deploy
EOF
[ $? -eq 0 ] && \
	echo "copy deployment to server" && \
	scp -r dist davidl@88.99.118.38:~/website/citrus/client-deploy && \
	echo "activate deployment on the server" && \
	ssh davidl@88.99.118.38 << EOF
		[ -e ~/website/citrus/dist/client ] && mv ~/website/citrus/dist/client ~/website/citrus/client-backup
		mkdir -p ~/website/citrus/dist
		mv ~/website/citrus/client-deploy ~/website/citrus/dist/client
EOF
[ $? -eq 0 ] && \
	echo "deployment to server done"



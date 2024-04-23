## Getting started

To get yourself setup:

1. Install packages. Built using npm.
2. Run `docker-compose up -d` in this directory. Some things to note though:
   a. If you don't have Docker installed, get it. This is needed for your db functions.
   b. The docker image was built for arm64 CPUs. If you're on amd64 machine, use flqw/docker-mongo-local-replicaset, the original version of this image.
3. Run `npm run dev`

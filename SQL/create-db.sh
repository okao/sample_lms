#!/bin/bash
docker image rm -f library-management-db-image
docker build -t library-management-db-image --no-cache .
docker run -d --name library-managment-db-container -p 5430:5432 library-management-db-image
docker logs --follow library-managment-db-container
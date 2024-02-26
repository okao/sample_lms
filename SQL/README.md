HOW TO GET A POSTGRES CONTAINER RUNNING TO WORK WITH THIS DATA?


> CREATING A DOCKER POSTGRES CONTAINER WITH ALL TABLES READY

1. INSTALL DOCKER DESKTOP

2. CD HERE and run 
docker build -t library-management-postgres-image .  

1. ensure image is there (should see that image name)
docker image ls -a

1. create a container out of that image 
docker run -d --name library-management-postgres-container -p 5430:5432 library-management-postgres-image

1. Use some form of data management software to view your data (I am using Azure Data Studio)

Feel free to reach out to Srilokh Karuturi for any trouble connecting

{IF YOU JUST WANT AN EMPTY POSTGRES CONTAINER }


> SIMPLY CREATING A POSTGRES CONTAINER AND THEN COPYING AND USING THE .SQL SCRIPTS
1. INSTALL DOCKER DESKTOP

2. RUN THIS COMMAND TO MAKE AN EMPTY POSTGRES CONTAINER
docker run -d --name library-management-system-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5430:5432 postgres




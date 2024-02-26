FROM postgres
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_DB=postgres
ENV POSTGRES_PASSWORD=postgres
COPY create_tables.sql /docker-entrypoint-initdb.d/create_tables.sql

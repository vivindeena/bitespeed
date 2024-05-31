FROM postgres:alpine

# Copy the initialization script into the container
COPY init-db.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
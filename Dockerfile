FROM node:lts-alpine

WORKDIR ./app

COPY . .

RUN rm -rf node_modules

RUN apk update && apk add postgresql postgresql-contrib && npm install

RUN npm uninstall bcrypt && npm install bcrypt

RUN npm install --build-from-source bcrypt

RUN mkdir -p /var/lib/postgresql/data

RUN chown -R postgres:postgres /var/lib/postgresql/data

RUN mkdir -p /run/postgresql && chown -R postgres:postgres /run/postgresql

RUN su - postgres -c "initdb -D /var/lib/postgresql/data"

EXPOSE 3000

EXPOSE 27017

CMD su - postgres -c "pg_ctl start -D /var/lib/postgresql/data -l /var/lib/postgresql/data/logfile" && \
    sleep 5 && \
    psql -U postgres -c 'CREATE DATABASE employeedb;' && \
    psql -U postgres -d employeedb -f /app/Database/project.sql && \
    npm start
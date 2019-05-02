#!/bin/bash

echo "Configuring anokotestdb"

dropdb anokotestdb
createdb -U postgres anokotestdb

psql -U postgres anokotestdb < ./bin/sql/users.sql
psql -U postgres anokotestdb < ./bin/sql/userActivity.sql

echo "anokotestdb was configured"
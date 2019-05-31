#!/bin/bash

echo "Configuring anokocrmdb"

# dropdb anokotestdb
# createdb -U postgres anokotestdb

# psql -U postgres anokotestdb < ./bin/sql/zohoSession.sql
# psql -U postgres anokotestdb < ./bin/sql/crmUser.sql
# psql -U postgres anokotestdb < ./bin/sql/userActivity.sql

# dropdb anokoadmin
# createdb postgres

# psql postgres < ./bin/sql/zohoSession.sql
# psql postgres < ./bin/sql/crmUser.sql
# psql postgres < ./bin/sql/userActivity.sql




echo "anokocrmdb was configured"
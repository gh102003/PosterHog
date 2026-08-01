docker exec -i posterhog-db-1 \
  psql -U postgres -d postgres < $(dirname "$0")/001_create_campaigns.sql

docker exec -i posterhog-db-1 \
  psql -U postgres -d postgres < $(dirname "$0")/002_create_posters.sql
  
docker exec -i posterhog-db-1 \
  psql -U postgres -d postgres < $(dirname "$0")/003_create_scans.sql
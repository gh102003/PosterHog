docker exec -i posterhog-db-1 \
  psql -U postgres -d postgres < ./001_create_campaigns.sql

docker exec -i posterhog-db-1 \
  psql -U postgres -d postgres < ./002_create_posters.sql
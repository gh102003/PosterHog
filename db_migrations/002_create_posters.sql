DROP TABLE IF EXISTS posters;

CREATE TABLE IF NOT EXISTS posters (
    poster_id bigint unique GENERATED ALWAYS AS IDENTITY,
    link_uuid uuid unique not null,
    campaign_id bigint references campaigns(campaign_id) not null,
    location_lat real,
    location_long real,
    location_photo bytea not null
);
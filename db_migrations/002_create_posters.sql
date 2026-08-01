DROP TABLE IF EXISTS posters CASCADE;

CREATE TYPE distribution_state AS ENUM ('generated', 'distributed', 'removed');

CREATE TABLE IF NOT EXISTS posters (
    poster_id integer unique GENERATED ALWAYS AS IDENTITY,
    link_uuid uuid unique not null,
    campaign_id integer references campaigns(campaign_id) not null,
    location_lat real,
    location_long real,
    location_photo bytea,
    location_description varchar,
    poster_state distribution_state not null DEFAULT 'generated'
);
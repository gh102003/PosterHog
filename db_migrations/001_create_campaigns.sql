DROP TABLE IF EXISTS campaigns CASCADE;

CREATE TABLE IF NOT EXISTS campaigns (
    campaign_id integer unique GENERATED ALWAYS AS IDENTITY,
    campaign_name character varying not null,
    poster_pdf bytea,
    destination character varying not null
);
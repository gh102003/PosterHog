DROP TABLE IF EXISTS scans CASCADE;

-- Represents one scan of a poster
CREATE TABLE IF NOT EXISTS scans (
    scan_id integer unique GENERATED ALWAYS AS IDENTITY,
    poster_id integer references posters(poster_id) not null,
    time_scanned timestamp not null
);
create table members
(
  anoko_id varchar primary key,
  first_name varchar,
  last_name varchar,
  email varchar,
  phone int(7),
  headshot_link varchar,
  member_tier int,
  date_added timestamp
)

create table member_tier
(
  id serial primary key,
  anoko_partner boolean,
  hustle varchar,
  social varchar,
  digital varchar
)
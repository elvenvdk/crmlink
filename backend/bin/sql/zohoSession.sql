create table zoho_session (
  id serial primary key,
  session_id varchar,
  date_time timestamp not null default current_timestamp
);
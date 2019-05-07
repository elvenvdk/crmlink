create table crm_user
(
  id serial primary key,
  username_hash char(64),
  password_hash char(64),
  session_id char(36),
  email varchar
);
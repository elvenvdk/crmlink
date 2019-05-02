create table user_activity
(
  id serial primary key,
  users_id int references users(id),
  activity varchar,
  activity_time timestamp
);
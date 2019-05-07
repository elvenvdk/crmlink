create table crm_user_activity
(
  id serial primary key,
  user_id int references crm_user(id),
  activity varchar,
  activity_time timestamp
);
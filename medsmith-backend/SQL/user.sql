--create database metabidb;
-- switch to db metabidb
-- \c metabidb (for terminal)

--Drop schema users if it exists
DO $$
begin
    if exists(
      select schema_name
      from information_schema.schemata
      where schema_name = 'users'
    ) then execute 'drop schema users cascade';
    end if;
end
$$;

create schema users

--Administrator definition
create table users.administrator
(
  id serial not null primary key,
  first_name    varchar(50) not null,
  last_name     varchar(50),
  password      varchar(64) not null,
  phone_number  varchar(20) not null unique,
  email_address varchar(355) not null unique,
  verified      boolean not null DEFAULT false,
  emp_id        integer not null unique,
  role          varchar(355) not null
);

--Doctor definition
create table users.doctor
(
  id serial not null primary key,
  first_name    varchar(50) not null,
  last_name     varchar(50),
  password      varchar(64) not null,
  registration_number  varchar(50) not null unique,
  email_address varchar(355) not null unique,
  gender        varchar(10) not null,
  region        varchar(60) not null,
  verified      boolean not null DEFAULT false,
  subscription_till timestamp
);

--Patient definition
create table users.patient
(
  id serial not null primary key,
  first_name    varchar(50) not null,
  last_name     varchar(50),
  password      varchar(64) not null,
  email_address varchar(355) not null unique,
  gender        varchar(10) not null,
  dob           date not null,
  region        varchar(60) not null,
  surgical_history varchar(500),
  med_allergies varchar(500),
  family_history varchar(500),
  habits        varchar(500),
  allow_rd      boolean not null default false,
  verified      boolean not null DEFAULT false
);

--Hospital definition
create table users.hospital
(
  id serial not null primary key,
  name    varchar(50) not null,
  address     varchar(355) not null,
  password      varchar(64) not null,
  email_address varchar(355) not null unique,
  region        varchar(60) not null,
  manager_name  varchar(50) not null,
  manager_phone varchar(50) not null,
  verified      boolean not null DEFAULT false,
  subscription_till timestamp
);

create table users.patient_past_ailments
(
  patient_id  integer,
  name        varchar(50),
  year_month  integer
);
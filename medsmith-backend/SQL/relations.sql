create schema relations;

create table relations.patient_doctor
(
  id         serial  not null primary key,
  patient_id integer not null,
  doctor_id  integer not null
);

create table relations.patient_hospital
(
  id          serial  not null primary key,
  patient_id  integer not null,
  hospital_id integer not null
);
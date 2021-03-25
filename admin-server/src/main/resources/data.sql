insert into role("role_name")
values ('ADMIN'),
       ('RECEPTION'),
       ('USER'),
       ('CLIENT'),
       ('TEACHER'),
       ('SUPER_ADMIN');
insert into weekday("weekday_name")
values ('MONDAY'),
       ('TUESDAY'),
       ('WEDNESDAY'),
       ('THURSDAY'),
       ('FRIDAY'),
       ('SATURDAY'),
       ('SUNDAY');


INSERT INTO room(active, name)
VALUES ('true', 'Java room'),
       ('true', 'Python room'),
       ('true', 'JavaScript room'),
       ('true', 'C#');

INSERT INTO pay_type(active, name)
VALUES ('true', 'Click'),
       ('true', 'PayMe'),
       ('true', 'Naqd');

INSERT INTO region(active, description, name)
VALUES ('true', 'Farg`ona viloyati', 'Farg`ona'),
       ('true', 'Andijon viloyati', 'Andijon'),
       ('true', 'Namangan viloyati', 'Namangan'),
       ('true', 'Toshkent viloyati', 'Toshkent'),
       ('true', 'Samarqand viloyati', 'Samarqand');

INSERT INTO course_category(active, description, name)
VALUES ('true', 'Chet tili filologiya', 'Ingliz tili'),
       ('true', 'Chet tili filologiya', 'Rus tili'),
       ('true', 'Chet tili filologiya', 'Arab tili'),
       ('true', 'Aniq fan', 'Matematika'),
       ('true', 'Aniq fan', 'Tarix'),
       ('true', 'Aniq fan', 'Fizika');

INSERT INTO course(active, description, name, price, course_category_id)
VALUES ('true', 'Ingliz tili boshlang`ich daraja', 'Beginner', 200000, 1),
       ('true', 'Ingliz tili o`rta daraja', 'Intermediate', 200000, 1),
       ('true', 'Ingliz tili yuqori daraja', 'Pre-Intermediate', 250000, 1),
       ('true', 'Ingliz tili IELTS TEST', 'IELTS +6', 250000, 1);

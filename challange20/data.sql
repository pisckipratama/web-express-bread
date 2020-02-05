create table data
(
    id integer primary key auto increment,
    string varchar(20),
    integer numeric,
    float real,
    date text,
    boolean integer
);

insert into data (string, integer, float, date, boolean) values ("mastering database", 18, 79.6, "2020-02-07", 1);
update data set string = "mastering database", integer = 22, float = 78.9, date = "2020-02-06", boolean = 0 where (id = 3);
delete from data where id='6';
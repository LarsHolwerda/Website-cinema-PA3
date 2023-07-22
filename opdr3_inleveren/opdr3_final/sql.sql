    -- MAAK DE TABEL
-- CREATE TABLE MOVIES (movieTitle TEXT NOT NULL, director TEXT, 
-- writer TEXT, actors TEXT, year INT, plot TEXT);

    -- GOOI DINGEN IN TABEL
-- INSERT INTO MOVIES (movieTitle, director, writer, actors, year, plot)
-- VALUES ("Evil Dead Rise",
--  "Lee Cronin", 
--  "Lee Cronin", 
--  "Alyssa Sutherland, Lily Sullivan, Morgan Davies", 
--  2023, 
--  "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.");

    -- VERWIJDER DEZE FILM  
-- DELETE FROM MOVIES WHERE movieTitle='Evil Dead Rise';

    -- TEL DATABASE
-- SELECT COUNT(movieTitle)
-- FROM MOVIES;

    -- LAAT ALLES ZIEN
-- SELECT * FROM MOVIES;




-- MAAK DE TABEL
 --CREATE TABLE profiles (user_ID INTERGER PRIMARY KEY, first_name TEXT, 
 --last_name TEXT, email TEXT NOT NULL, hash TEXT NOT NULL, adress TEXT, creditcard TEXT, currentOrder TEXT, orderHistory TEXT);


    -- GOOI DINGEN IN TABEL
 --INSERT INTO profiles (user_ID, first_name, last_name, email, hash, adress, creditcard, currentOrder, orderHistory)
-- VALUES (1,
 -- "Lee", 
 -- "Cronin", 
 -- "Lee@hotmail.com", 
 -- "**", 
 -- "adress",
--  "1312312321",
--  "",
--  "");


    -- TEL DATABASE
-- SELECT COUNT(movieTitle)
-- FROM MOVIES;

    -- LAAT ALLES ZIEN




--CREATE TABLE TIMESLOTS (timeslotid INTEGER, date DATE, starttime TEXT, endtime TEXT);
--INSERT INTO TIMESLOTS (timeslotid, date, starttime, endtime)
--VALUES (1, '2023-04-30', '11:00', '13:00');
--VALUES (2, '2023-05-06', '18:00', '20:00');
--VALUES (3, '2023-05-01', '14:00', '16:00');
--VALUES (4, '2023-04-26', '15:00', '17:00');
--ALTER TABLE MOVIES
--DROP COLUMN timslot;

--UPDATE profiles
--SET currentOrder = ""
--WHERE user_ID = 1;

-- MAAK DE TABEL
 --CREATE TABLE profiles (user_ID INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, 
 --last_name TEXT, email TEXT NOT NULL, hash TEXT NOT NULL, adress TEXT, creditcard TEXT, currentOrder TEXT, orderHistory TEXT);
--DROP TABLE profiles;
SELECT * FROM MOVIES;
SELECT * FROM TIMESLOTS;
SELECT * FROM profiles;




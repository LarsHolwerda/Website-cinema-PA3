Group id: 65

Names:
Lars Holwerda - 7990537
Lloyd van Boxtel - 7232020
Jochem Fieten - 5361060

Full URL: http://webtech.science.uu.nl/group65/

Brief explaination of the website:
The navigation bar redirects to the homepage, profile, shopping basket and the register and login pages.
The website has a homepage which displays the movies. When a movie is clicked on the the description is showed with a link to a page specifically to the movie. 
On the movie page the movie can be added to the shopping basket with a selected timeslot. 
On the shopping basket page the current order is displayed and can be ordered.
On the profile page the user can see the profile.
When the user is not logged in, the user is redirected to the login page when nessecary.

Structure:
The server is created in testje.js and the routing is also done there using express.
HTML and css is used to display the website. For each page an HTML file is made.
In the javascript files the logic is done let the HTML display the right things and to check for sessions etc. For each page an javascript file is made.
The database is db.db and can be shown and edited by running the sql.sql page.
The database consist of Three tables: 
MOVIES: which contains all movies with their name, actors, directors, description and the timeslot in which they are shown.
TIMESLOTS: this contains the timeslotid with the date and times that the timeslot is shown in the cinema
PROFILES: this contains the userid and names of all registers user and their other important information. THe password and creditcard are hashed to protect from broken access faults.

Logins of registered users with email and password:
vangaal@vangaal.nl - 123
fieten@gmail.nl - paard123

SQL definition of the database:
MOVIES:
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

TIMESLOTS:
--CREATE TABLE TIMESLOTS (timeslotid INTEGER, date DATE, starttime TEXT, endtime TEXT);
--INSERT INTO TIMESLOTS (timeslotid, date, starttime, endtime)
--VALUES (1, '2023-04-30', '11:00', '13:00');

PROFILES
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
--  ", Triangle of Sadness 2023-05-06 18:00 Triangle of Sadness 2023-05-06 18:00, Interstellar 2023-04-30 11:00, Interstellar 2023-04-30 13:00",
--  ", Triangle of Sadness 2023-05-06 18:00 Triangle of Sadness 2023-05-06 18:00, Interstellar 2023-04-30 11:00, Interstellar 2023-04-30 13:00");
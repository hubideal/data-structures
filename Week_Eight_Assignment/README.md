# Weekly Assignment 8

### Data Model

For my data model, I will be collecting five data inputs.  Two of them are Booleans (true/false), 1.) indicating whether the tilt is up or down and 2.) indicating if the magnet is present or not.  In addition, I will collect text that indicates whether the tilt is "up" or "down" and if the magnet is present "pos" or not present "neg".  Finally, I will collect date and time when the data is collected with a Default time stamp.   

### Code

Listed below is the SQL code I used to create pugTable (my database) and insert a row of values into the table.

CREATE TABLE pugTable (tilt boolean, tiltStatus varchar(10), hall Boolean, hallStatus varchar(10), timeHallTilt timestamp DEFAULT current_timestamp);


INSERT INTO pugTable VALUES (TRUE, 'up', TRUE, 'pos', DEFAULT);




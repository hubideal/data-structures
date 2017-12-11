# Final Assignments for Data Structures

In this README file I explain my final two assignments for the Data Structures course in the Data Visualization MS program.  The first project maps data from Alcoholics Anonymous in Manhattan, and the second proejct tracks when we kenneled our pug, Doralee, during the day using a tilt and magnetic sensor.  

### AA Data Map
In this project, I took data from 10 zones from Alcoholics Anonymous and parsed information from each zone indicating meeting locations, addresses, zones, type, special interest, and other important information.  The project first started with parsing the information from 10 zones.  See parseFinal.js in the aaMap folder.  Then I took addresses from this information and used Google maps to identify the latitudes and longitudes for each site (see final_latlong.js).  I noticed that some of the titles had duplicated titles, so I created Clean.js to remove duplicate meeting titles in the "meeting title" variable (see Clean.js).  Finally I added the data data to MongoDB using the toFinalCluster.js.  This allowed me to finally map the data using the app.js which can be found in the Sensor folder.  The file app.js allowed me to combine two text files (index1.txt & index3.txt) that created an html file to communicate with the Goolge Map API and map data points.    

### Sensor
A magnetic and tilt sensor were attached to our pug’s kennel door.  I was able to keep track of when our pug, Doralee, was kept in and out of her kennel using the sensors.  To keep track of the data, I first created a website that indicated when the sensor changed and data was stored to a Postgresql database (see weekNineAssignment.js in the Sensor file).  This then allowed me to create a website (http://ec2-34-203-216-133.compute-1.amazonaws.com:4000) that allowed me to keep a summary of the times when Doralee was in her kennel.  It also allowed me to create the following visualization which is explained below.
![/Sensor/DataStructuresVisualsmall.png](https://github.com/hubideal/data-structures/finalAssignments/Sensor/DataStructuresVisualsmall.png?raw=true) Fromat ![png]
The visualization above shows the amount a time (in red) that our pug was kept in the kennel during the day.  Of course the majority of time, she was out of her kennel.  The grey color represents error, because the magnetic sensor had several days that had error because of the placement of the sensor.  So, the grey represents human as well as design error.  The red portion of the visualization represents when both of the sensors indicated that Doralee was in her kennel.   

Finally, I created app.js, index1.txt, and index3.txt (in the Sensor file) to keep track of the kennel and AA data.  


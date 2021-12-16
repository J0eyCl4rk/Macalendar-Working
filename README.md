# Macalendar-Working

![Macalendar Logo](https://user-images.githubusercontent.com/60119831/146397915-3d1d420d-f41a-4644-a691-f9e35469f0ce.png)


# I. What is Macalendar?
Macalendar is a community based calendar for the Macalester Community. It allows students to post events they are planning to do on the calendar to spread the word. Students can come together and create freindships within a sub-community of likeminded people.

# II. Technology
**HTML** - Home Page and Calendar Page layout
<br/> <br/> **CSS** - Home Page and Calendar Page Design
<br/> <br/> **JavaScript** - Calendar calculations, drawing the calendar through creating html elements, loading events from firebase, saving events to firebase, populating events on the calendar
<br/> <br/> **Firebase** - back end database and webapp hosting

# III. Getting Started
To start testing: create a local host session or load firebase hosting

<br/> **Local Host:** ```php -S localhost:8000``` in command line
<br/><br/> **Firebase Hosting:** **JONNY FILL IN**

# IV. Code Intro

**Home Page** - all the code for the home page can be found in the index.html file. This code is setting up the layout for the home page. The corresponding css code to style the html elements can be found in style.css <br/>
<img width="1434" alt="Screen Shot 2021-12-16 at 9 18 07 AM" src="https://user-images.githubusercontent.com/60119831/146400243-677f8826-1349-46e6-84db-af43c908ad11.png">

<br/><br/> **Calendar Page** The skeleton for the html formatting can be found in the calendar.html file. This file creates the conatiners for the html elements created in the calendar.js file. The corresponding css code can be found in the style.css file. The calendar.html file also contains two functions that correspond to the html add event form. <br/>

The bulk of the heavy lifting for the calendar itself is done in the calendar.js file. The calendar is put together using javascript. This file contains the calculations for drawing and labeling the correct days on the calendar. It is also responsible for loading events from firebase and onto the calendar. The code in the file is commented to describe the purpose of each function in a more detailed way. The sweetalert2 files are an html module that allow for a popup window when pressing on a day with an event already populated.
<br/>
<img width="1432" alt="Screen Shot 2021-12-16 at 9 18 20 AM" src="https://user-images.githubusercontent.com/60119831/146401311-c4d48061-0002-4501-bc43-c871cbee6bfa.png">

<br/><br/> **We obtained source code for the calendar from https://code-boxx.com/simple-pure-javascript-calendar-events/ and modified to fit our project goals**

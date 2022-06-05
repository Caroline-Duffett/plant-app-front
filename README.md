# This is an online plant app for a class project by Caroline Duffett and Tim Minker

# Explanation of the technologies used:
This is a full stack MERN app with full CRUD capabilities. For the development of this app, we used Mongoose, Express, React, Node.js, Axios, Express-session, Bcrypt, Cors, and JSX with HTML. This app has a frontend and a backend, each with their own GitHub repositories. Both ends are also deployed on their own Heroku apps. The data for this app is being stored on MongoDB.

# Approach taken:
We used our previous assignments and notes to help us build this app. The purpose of this app is for users to be able to have access to a database of plants… Users must create an account and login…Can create, delete, and edit their plants. There is also a related notes model for each user’s plant. They can create and delete notes…

# User Stories:
- Users can create an account with username and password, and on subsequent logins can view the stored data they have created.
- Users are able to make notes on their created plant objects, and can delete notes as well. No other users can see these notes or edit them.
- Users can create plants that will be added with information such as name, scientific name, a linked photo, and watering and sunlight requirements.
- Users can edit any plant objects they have created (which will show in the global db), and can delete them as well should they choose.

# Links to live sites:
# Frontend:
https://obscure-ravine-92463.herokuapp.com/

# Backend:
https://shrouded-wave-73322.herokuapp.com/

# Links to Git repositories:
# Frontend:
https://github.com/StudentCD/frontend3

# Backend:
https://github.com/timeminker/project3-backend

# Installation Instructions:
To access the app, the user should only need to create an account and login.

# Unsolved problems/things to fix or upgrade:
 - As it sits now, users can only create new plants for their own personal plants libraries. We would like to build functionality so that users could pull plants from global db and add to their own.
 - Displaying of logged in users plants is done on the front end through a turnery, we would like to make this possible through the get-route on the backend, but were unable to capture logged-in user's username to sort.
 - Search function currently only works for plant name, would like to add function to search all displayed fields.
 - Some small issues with styling when viewing app on an actual mobile phone.

# Sources:
These class markdowns helped us:
https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Belcher/tree/master/projects/project_3/unit-3-auth-multiple-components
https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Belcher/tree/master/projects/project_3/unit-3-auth-single-component
https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Belcher/tree/master/projects/project_2/Session_and_Auth
Classmates helped us as well.

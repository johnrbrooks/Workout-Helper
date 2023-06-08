# Workout-Helper
A full-stack workout calendar app

![Gym Image](https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png)

## WireFrame
[WireFrame]()

## ERD
[ERD](https://lucid.app/lucidchart/91d1a77a-28ff-4be4-bccf-d679a9657d71/edit?beaconFlowId=574B8B2BAE54D9DD&invitationId=inv_c8d49fb4-bb18-405e-b3f5-3e6c0d89f830&page=0_0#)

## Application Goal
Create a full-stack web application that allows a user to build a calendar and populate it with chosen workouts to do on a given day based on a database of workouts.

# Primary Functionality

## Data Entities
1. Calendar
2. Days
3. Exercises
4. User (Stretch)

## Calendar
1. Monday through Friday Calendar Cards
2. Each Card allows you to populate it with workouts you'd like to do on that day
3. Every individual workout card allows you to open it and see a description of the workout and an image/gif of how to do it
4. This will require full front-end CRUD implementation as you will need to be able to add workouts, read workouts, update workout choices, and delete workouts from the page

## Workout Database
1. Each workout object should have a title/name, an image/gif of how to do the workout, a description, a suggested reps count based on beginner-advanced, and equipment necessary.
2. A user should be able to add new workouts to the database with these parameters 
3. A user should be able to update new workouts to the database with these parameters
4. A user should be able to delete new workouts from the database with these parameters

## Search
1. Find workouts within the database based on particular criteria
2. Add/remove those workouts to specific days on the calendar

# Stretch Functionality

## User Login
1. A user should be able to login to the application to pull their specific data/calendar
2. This should require password creation (OAuth through Google would be optimal and is my goal)
3. Log Out functionality to switch users

## User Database
1. A user should able able to login either through Google OAuth or a username/password
2. Each User should have a saved calendar that they can continue to fully CRUD that is saved from previous entries







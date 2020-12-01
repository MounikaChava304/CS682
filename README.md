# CS682 -- Real Time Real Estate Analysis.

This is the backend part of the entire project.

To install node modules for this project, run the command --- npm install (after the node and npm is installed in the pc) in the Reantal-main folder.

Config folder -- contains keys and passport required for validation and authorization of user login and register.
Modal folder -- contains database schema files for the collections we user --- users table and properties table.

Routes/api folder -- 
config.json -- This file has the rapid api host and rapid api key -- These are useful to trigger the external realtor api to fetch the property details from the realtor api.
calculator.js -- This file has all the calculations from the referenced excel sheet (All excel formulae)
mortgageCalculator.js -- This file has the function that returns details such as principle,interest paid for every month and the ending balance for each month.
property.json -- This file is the reference json document to store the calculated values with respect to schema in database. Instead of creating json data to insert in the database, we update this file and insert the document in the database.
rentals.js -- This file has all the api routes to dashboard,rentalCalculator,fetching the propertydetails -- basically all api routes related to the property table.
users.js -- This file deals with the api routes to login and register -- api routes involving users table.

Validation folder -- contains validation rules for registering and logging in user.

connection.js -- This files has the method to connect to the database.

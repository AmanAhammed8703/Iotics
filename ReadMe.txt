
First run the server  then run the client

SERVER
-------------------

add .env file with :JWT_SECRET="secret-key"

In the project directory, you can install dependenceies:

### `npm install`


In the project directory, you can run project by:

### `npm start`
	



PUBLIC API DOCUMENTATION
---------------------------------


1) http://localhost:9000/public/searchTickets

   body{
	date:'2022-05-26'
   }

Note:Only fetches the published tickets.

2) http://localhost:9000/public/getTicketDetails

   body{

	id:'628c9e3fc550507293712df1'
	}



CLIENT
----------------------------------

In the project directory, you can install dependenceies:

### `npm install`


In the project directory, you can run project by:

### `npm start`
	
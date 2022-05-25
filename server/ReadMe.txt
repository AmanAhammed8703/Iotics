add .env file with :JWT_SECRET="secret-key"

In project dierectory ,we can install dependencies by:
	
	npm install

In project dierectory ,we can run project by:

	npm start



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
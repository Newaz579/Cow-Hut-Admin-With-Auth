# digital-cow-hunt
vercel url: https://digital-cow-hunt-5fejugk5d-newaz579.vercel.app/
Application Routes:
User
api/v1/users/create-user (POST)
api/v1/users (GET)
api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

Cows
api/v1/cow (POST)
api/v1/cow (GET)
api/v1/cow/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
api/v1/cow/6177a5b87d32123f08d2f5d4 (PATCH)
api/v1/cow/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?searchTerm=Cha

Orders

api/v1/orders (POST)
api/v1/orders (GET)

# CapstoneBookStore

Book Management Routes

Book Creation & Deletion

GET /books - Lists all books from the database.
GET /books/:id - Shows the details of the book matching the specified ID.
POST /books - Creates a new book and adds it to the database.
PUT /books/:id - Updates the information of a book based on the specified ID.
DELETE /books/:id - Deletes a book based on its ID.

Book Modification

POST /books/:id/genres - Adds genres to a book matching the specified ID.
PUT /books/:id/genres - Updates the genres of a book matching the specified ID.

User Management Routes

GET /hello - Requires a user to be logged in, then returns a "hello" message including the user's name.
GET /register - Accepts user information and password, storing this information (excluding the password) along with the password hash in the database.
POST /login - Accepts a user's email, name, and password, checking the password against the hash in the database stored during registration. If the password is correct, it returns a token; otherwise, it returns an error.

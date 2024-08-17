
# Phone Book API

The Phone Book API is a simple CRUD API built using Node.js and Express.js. It allows users to manage their contacts with features including adding, viewing, editing, and deleting contact information.

# API Endpoints
- Authentication:

    - POST `/api/auth/signup` - Register a new user.
    - POST `/api/auth/signin` - Log in and receive a JWT token.
- Contacts:

    - GET `/api/contacts` - Retrieve all contacts for the authenticated user.
    - GET `/api/contacts/:id` - Retrieve a specific contact by ID.
    - POST `/api/contacts` - Create a new contact.
    - PUT `/api/contacts/:id` - Update an existing contact.
    - DELETE `/api/contacts/:id` - Delete a specific contact.
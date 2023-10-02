# tweeter-RB11

### Authentication Endpoints

The Authentication flow for the application is:

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup              | `userName`, `email`, `password`, `address`, `birthDate` , `phone`, `zipCode`  | { token: `token` }
POST   | /auth/login      | -     | user | User Login               | `email`, `password`                             | { token: `token` }

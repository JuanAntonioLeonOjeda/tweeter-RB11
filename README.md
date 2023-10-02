# tweeter-RB11

### Authentication Endpoints

The Authentication flow for the application is:

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup              | `userName`, `email`, `password`, `address`, `birthDate` , `phone`, `zipCode`  | { token: `token` }
POST   | /auth/login      | -     | user | User Login               | `email`, `password`                             | { token: `token` }

### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /user            | YES   | user | Get All Users            |  `query params`                            | [{user}]
GET    | /user/profile    | YES   | user | Get Own Profile          |                                                |  {user}
GET    | /user/:id        | YES   | user | Get One User             |                                             |  {user}
POST   | /user            | YES   | admin | Create one user         | `userName`, `email`, `password`, `address`, `birthDate` , `phone`, `zipCode` | {user}
PUT    | /user/profile    | YES   | user | Update own profile       | `userName`, `email`, `address`, `birthDate` , `phone`, `zipCode` | {message: 'Profile updated'}
PUT    | /user/password   | YES   | user  | Reset password          | `newPassword` `repeatPassword`                                    | { message: 'Password updated }
PUT    | /user/:id        | YES   | admin | Update one user         |  `userName`, `email`, `address`, `birthDate` , `phone`, `zipCode` | {message: 'User updated'
DELETE | /user/:id        | YES   | admin | Delete one user         |                                                   | {message: 'User deleted'}
DELETE | /user/profile    | YES   | user | Delete own profile       |                                                    | { message: 'Profile deleted' }

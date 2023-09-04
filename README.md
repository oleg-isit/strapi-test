# Strapi test task
## Requirements
- Node.js v16.14.0 (tested on v18 as well)
- npm v8.19.2
## Installation & Setup
### Backend
```bash 
cd server 
``` 
```bash 
npm install
``` 
```bash
npm run develop 
```
### Frontend
```bash 
cd client 
``` 
```bash 
npm install 
``` 
```bash 
npm run start 
``` 
## Admin Access
- **Email**: `admin@test.com`
- **Password**: `Admin123`

> Note: The same credentials are used for the application profile login as well.


### Project Insights

The task was simple. My main goal was to evaluate the possibilities and limitations of Strapi. In addition to the requirements of the task,
I implemented authentication and authorization using JSON Web Tokens (JWT).
For some reason, Strapi doesn't support refresh tokens out of the box, so I added this feature myself to extend Users and Permissions.


### Token Lifetimes (for testing)

- **Access Token**: *1 minute*. In case of a 401 Unauthorized response from the server, the application will automatically refresh the tokens and make the request again for better security and user experience.

- **Refresh Token**: *2 minute*

### Data
```
- Single Type
    - Header - public
```
```
- Collections
    - Products - authorizated
```

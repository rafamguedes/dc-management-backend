<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
  <h1 align="center">User Service API</h1>
  
  <div style="display:flex;flex-direction:row;gap:1rem;">

  ![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

  ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

  ![Postgre](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  
  ![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
  
  ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)

  </div>

  <div style="display:flex;flex-direction:row;gap:1rem;">

  ![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
  
  ![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
  
  ![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)

  ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
  
  </div>

  <div style="display:flex;flex-direction:row;gap:1rem;">

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)
  
  ![Testing Library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red)
  
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  
  ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
  
  </div>
  <br />
  <img width="800" src="app/frontend/src/assets/images/screenshots/dashboard.png">
  <br />
  <br />

</div>

<p>
  The User Service API provides features such as user authentication, profile management, role-based access control, and user analytics. The application is built with a focus on security and performance, ensuring that user data is protected while delivering a smooth user experience.
</p>

<br />

# ➡️ Technologys

- Backend
  - Node, Express, TypeScript, JWT, Mocha, Sinon, Chai, PostgresSQL, Docker

- Frontend
  - React, TypeScript, Vite, Vitest, Styled Components, Hooks

- Deploy
  - Vercel and Railway

<br />

# ➡️ Usage

1. clone the project

2. Inside of root project, <strong>run npm install:apps</strong>

3. Run docker containers backend and database: <strong>npm run compose:up</strong>

4. Run frontend: <strong>npm run dev</strong>

<br />

# ➡️ API Endpoints

### ▶️ Login
```
- POST /login - User login app

- GET /login/role - Get user role
```
### ▶️ User
```
- POST /user - Create a new user.

- GET /user - Read a list of all users.

- PUT /user/:id - Update a user.

- DELETE /user/:id - Delete a user
```
<br />

# ➡️ ScreenShots

## ▶️ Login 

![Dashboard](app/frontend/src/assets/images/screenshots/login.png)

<br />

## ▶️ Dashboard
![Dashboard](app/frontend/src/assets/images/screenshots/dashboard.png)

<br />

## ▶️ Create User
![Dashboard](app/frontend/src/assets/images/screenshots/registerUser.png)

<br />

## ▶️ Update User
![Dashboard](app/frontend/src/assets/images/screenshots/updateUser.png)

<br />

## ▶️ Delete User
![Dashboard](app/frontend/src/assets/images/screenshots/deleteUser.png)

<br />

## ▶️ Tests Backend Coverage (Unit and Integration tests)
![Dashboard](app/frontend/src/assets/images/screenshots/testsBackend.png)
# Bookit

Bookit is a full-stack application for booking apartments online.

Backend: Asp.Net 7 / Postgresql / Docker
* Clean Architecture
* Domain Driven Design
* Rich Domain Model
* CQRS - Implement Application use cases and solve cross cutting concerns
* Authentication - Key Cloak
* Dapper
* EntityFramework Core
* Outbox Pattern
* Custom Middleware
* Rich domain model
* FluentValidation

Frontend: Next.JS 13.5
* React Server Components
* Client components
* Typescript
* TailwindCSS with DaisyUI and React Headless UI
* Jotai state managment
* Axios
* Api routes 

# Instructions:

Make sure Docker is installed and running on your system.

Backend: 
CD to Backend/src/
RUN command: docker-compose up --build

This will orchestrate 3 docker containers: api / PG database / auth client

Frontend:
CD to /Frontend

Install Dependencies for frontend project 'npm install' then 'npm run dev'
Frontend url: http://localhost:3000/

Test workflow: Create a new user providing an email and password then login to start testing the application






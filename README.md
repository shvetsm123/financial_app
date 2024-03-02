# Financial App (Backend)

Simple app with next features you can do:

- Sign up / Sign in

- Obtaining a current balance

- Create new payments

- Edit existing payments

- Delete existing payments

- Create payment categories

- Receive existing categories

- Delete payment category

- Look API documentation (Swagger)

---

Stack: Nest.js, PostgreSQL, Prisma, Docker.

# How to run project

Clone directory

```bash
  git clone https://github.com/shvetsm123/financial_app
```

Open it

```bash
  cd financial_app
```

Install all packages

```bash
  cd server
  npm install
```

OR

Run Docker file 

```bash
    docker compose --file ./docker-compose-dev.yml up --build
```

Connect your Postgres (.env)

```bash
  cd server/.env
```

Run it locally on 3000 port

```bash
  http://localhost:3000/
```

---

# Functionality test via Postman/Insomnia

1. Registration

```bash
  POST http://localhost:3000/auth/signup
```

required:
{
"email": "test@test.com",
"password": "test123",
}

2. Login

```bash
  POST http://localhost:3000/auth/signin
```

required:
{
"email": "test@test.com",
"password": "test123",
}

3. Make a payment (income | expense) 

```bash
  POST http://localhost:3000/payments
```

required:
{
"paymentType": "income",
"amount": 100,
"description": "payment description",
"categoryId": number | null,
"userId": number | null
}

4. Check balance (only for authorized)

```bash
  POST http://localhost:3000/users/:id/balance
```

5. Create a category

```bash
  POST http://localhost:3000/category
```

{
"name": "Salary"
}

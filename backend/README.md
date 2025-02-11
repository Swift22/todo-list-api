# Todo List API

A RESTful API for managing todo lists with user authentication.

## Features

- User authentication (register/login)
- CRUD operations for todo items
- Pagination and filtering
- Rate limiting
- Error handling
- TypeScript support
- PostgreSQL database
- Jest testing

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-list-api.git
cd todo-list-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Run migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

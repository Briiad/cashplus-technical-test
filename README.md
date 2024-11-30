# Blüute - [Web App](https://bluute.vercel.app)
A simple, e-commerce web app built with Next.js, Tailwind, Prisma, and PostgreSQL.

> Check the deployed web app [here](https://bluute.vercel.app)

## Features
- [x] User authentication
- [x] Product listing
- [x] Product details
- [x] Shopping cart
- [ ] Checkout ( WIP )

## Getting Started
1. Clone the repository
```bash
git clone https://github.com/Briiad/cashplus-technical-test.git
```
2. Install dependencies
```bash
yarn
```
3. Create a `.env` file in the root directory and add the following environment variables
```bash
cp .env.example .env
```
You can create [new supabase project](https://supabase.com) and get the required environment variables from the project settings.

For now, we won't use any Xendit API, so you can leave the `XENDIT_SECRET_KEY` empty or with random words.
```bash
DATABASE_URL="postgresql://username:password@localhost:6543/database"
DIRECT_URL="postgresql://username:password@localhost:5432/database"
JWT_SECRET="your-secret"
XENDIT_SECRET_KEY="your-xendit-secret-key"
NEXT_API_URL="http://localhost:3000/api/v1"
```

4. Initialize Prisma and migrate the database
```bash
npx prisma init
```
```bash
npx prisma migrate dev --name init
```
```bash
npx prisma db push
```
```bash
npx prisma generate
```

5. Seed the database
```bash
npx prisma db seed
```

6. Run the development server
```bash
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
   
> If you have any questions or need help, feel free to open an issue.
>
> If you want to access the deployed version, click [here](https://bluute.vercel.app)
```
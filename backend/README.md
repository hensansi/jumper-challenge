# 🚀 Jumper challenge backend

## 🛠️ Getting Started

### Step 1: 🚀 Initial Setup

- Install dependencies: `npm install`

### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

# Service Documentation

## First time run

Run a migration to create your database tables with Prisma Migrate
`npx prisma migrate dev --name init`

## Schema Update

Run prisma generate to generate the Prisma Client. You can then start querying your database.
`prisma generate`

## Debugging

Use `npm run sqlite` to inspect the database schema. This development tool is intended for local development purposes only.
